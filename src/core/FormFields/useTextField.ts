import { h } from 'vue'
import { ElInput } from 'element-plus'

export default (props?: { placeholder?: string; type?: string; class?: string }) => {
  return h(ElInput, { clearable: true, class: 'w-[160px]', ...props })
}
