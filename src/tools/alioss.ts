import OSS from 'ali-oss'
import { getStsToken, Credentials } from '@/api/alioss'
import Storage from './storage'

const bucket = import.meta.env.VITE_OSS_BUCKET_NAME
const region = import.meta.env.VITE_OSS_REGION
export const host = `https://${bucket}.oss-${region}.aliyuncs.com/`
let lock: Promise<ResponseData<Credentials>> | null = null

/**
 * Retrieves the credentials required for accessing AliOSS.
 * If the credentials are not available in the storage, it fetches them from the server.
 * @returns A promise that resolves to the credentials.
 */
const getCredentials = async (): Promise<Credentials> => {
  let data: Credentials = Storage.get('stsToken')
  if (!data) {
    if (lock) {
      data = (await lock).data!
    } else {
      lock = getStsToken().finally(() => {
        lock = null
      })
      const res = await lock
      data = res.data!
      Storage.set('stsToken', res.data, 59 * 60 * 1000)
    }
  }
  return data
}

/**
 * Returns an instance of OSS client for interacting with Aliyun OSS.
 * @returns A Promise that resolves to an instance of OSS.
 */
const getClient = async (): Promise<OSS> => {
  const credentials = await getCredentials()
  return new OSS({
    bucket,
    region: `oss-${region}`,
    accessKeyId: credentials.accessKeyId!,
    accessKeySecret: credentials.accessKeySecret!,
    stsToken: credentials.securityToken,
  })
}

/**
 * Uploads a file to AliOSS.
 * @param file - The file to be uploaded.
 * @param fileName - The name of the file.
 * @param contentType - The content type of the file.
 * @returns A Promise that resolves to the result of the upload operation.
 */
export const upload = async (
  file: File,
  fileName: string,
  contentType?: string,
): Promise<OSS.PutObjectResult> => {
  const client = await getClient()
  return client.put(fileName, file, {
    headers: {
      'Content-Type': contentType || file.type,
    },
  })
}

/**
 * Uploads a file to AliOSS using multipart upload.
 *
 * @param file - The file to be uploaded.
 * @param fileName - The name of the file in AliOSS.
 * @param contentType - The content type of the file. If not provided, it will be inferred from the file.
 * @param progress - A callback function to track the upload progress. the value is a number between 0 and 1. maybe, you need to * 100 to get the value of the percentage.
 * @returns A promise that resolves to the result of the multipart upload.
 */
export const multipartUpload = async (
  file: File,
  fileName: string,
  contentType?: string,
  progress?: (...args: any) => void,
) => {
  const client = await getClient()
  return client.multipartUpload(fileName, file, {
    progress,
    headers: {
      'Content-Type': contentType || file.type,
    },
  })
}

/**
 * Lists files in the OSS bucket with the specified prefix and maximum number of keys.
 * @param prefix - The prefix to filter the files by.
 * @param maxKeys - The maximum number of keys to return.
 * @returns A promise that resolves to the list of files.
 */
export const listFile = async (prefix: string, maxKeys: number): Promise<OSS.ListObjectResult> => {
  const client = await getClient()
  return client.list({ prefix, 'max-keys': maxKeys }, {})
}

/**
 * Deletes a file from AliOSS.
 * @param fileName - The name of the file to be deleted.
 * @returns A promise that resolves when the file is successfully deleted.
 */
export const deleteFile = async (fileName: string) => {
  const client = await getClient()
  return client.delete(fileName)
}
