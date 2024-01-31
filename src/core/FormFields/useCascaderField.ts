import { h } from 'vue'
import { ElCascader } from 'element-plus'

type IProps = {
  options: any[],
}

export default (props: IProps) => {
  return h(ElCascader, {
    ...props
  })
}
