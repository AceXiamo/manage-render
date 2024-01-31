import { ElDatePicker } from 'element-plus'
import { h } from 'vue'

type IDatePickerType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'

type IDefineProps = {
  type: IDatePickerType
  valueFormat?: string
  [key: string]: any
}

export default (define: IDefineProps = { type: 'date' }) => {
  return h(ElDatePicker, { clearable: true, class: '!w-[160px]', ...define })
}
