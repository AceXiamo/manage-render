import { host } from '@/core/tools/alioss'

export const parseValueForFileChooseField = (value: any, valueType: 'str' | 'arrStr' | 'arr') => {
  let arr: string[] = []
  if (valueType === 'arr') {
    arr = value || []
  } else if (valueType === 'arrStr') {
    arr = value ? JSON.parse(value) : []
  } else if (valueType === 'str') {
    arr = value ? value.split(',') : []
  }

  return arr.map(item => host + item) || []
}

export const formatValueForFileChooseField = (
  value: string[],
  valueType: 'str' | 'arrStr' | 'arr',
) => {
  const arr = value.map(item => item.replace(host, ''))
  if (valueType === 'arr') {
    return arr
  } else if (valueType === 'arrStr') {
    return JSON.stringify(arr)
  } else if (valueType === 'str') {
    return arr.join(',')
  }
}
