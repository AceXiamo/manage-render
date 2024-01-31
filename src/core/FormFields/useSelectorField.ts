import { h, VNode } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

type SelectDefine = {
  options: any
  label?: string
  value?: string
}

export default (define: SelectDefine) => {
  const options = (): VNode[] => {
    return define.options.map((item: any) => {
      return h(ElOption, { label: item[define.label || 'label'], value: item[define.value || 'value'] })
    })
  }

  return h(ElSelect, { clearable: true, class: 'w-[160px]' }, options)
}
