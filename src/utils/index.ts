import { dayjs } from 'element-plus'

/**
 * Determines the file type based on the suffix.
 * @param suffix - The file suffix.
 * @returns The file type: 'video', 'image', or 'other'.
 */
export const getFileTypeBySuffix = (suffix: string): 'video' | 'image' | 'other' => {
  const videoSuffix = ['mp4', 'avi', 'mov', 'wmv', 'flv']
  const imageSuffix = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
  if (videoSuffix.includes(suffix)) {
    return 'video'
  }
  if (imageSuffix.includes(suffix)) {
    return 'image'
  }
  return 'other'
}

/**
 * Generates a file name with a timestamp.
 * @param suffix - The suffix to be appended to the file name.
 * @returns The generated file name with a timestamp.
 */
export const getUploadPath = ({
  module,
  type,
  originalName,
  rename = false
}: {
  module: string
  type: string
  originalName: string
  rename?: boolean
}) => {
  let fileName = originalName
  if (rename) fileName = generateFileName(fileName.split('.').pop() || '')
  return `${module}/${dayjs().format('YYYY-MM-DD')}/${type}/${fileName}`
}

/**
 * Generates a file name with a timestamp.
 * @param suffix - The suffix to be appended to the file name.
 * @returns The generated file name with a timestamp.
 */
export const generateFileName = (suffix: string): string => {
  const time = dayjs().format('YYYYMMDDHHmmss')
  const randomNum = Math.floor(Math.random() * 100)
  return `${time}${randomNum}.${suffix}`
}
