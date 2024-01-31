import { computed, defineComponent, h, Ref } from 'vue'

type PropsType = {
  typeId?: string
  typeName?: string
}

const Component = defineComponent({
  name: 'TypeField',
  props: {
    data: {
      type: Object as () => Ref<PropsType>,
      required: true,
    },
  },
  setup(props) {
    const queryForm = computed(() => props.data.value)

    return {
      queryForm,
    }
  },
  render() {
    return (
      <>
        <div class="flex rounded-[3px] overflow-hidden">
          <div class="px-[7px] h-[22px] leading-[22px] bg-blue-500 text-white">
            {this.queryForm.typeId || '-'}
          </div>
          <div class="px-[7px] h-[22px] leading-[22px] bg-blue-500/10 text-blue-500">
            {this.queryForm.typeName || '-'}
          </div>
        </div>
      </>
    )
  },
})

export default function useTypeField(data: Ref<PropsType>) {
  return h(Component, { data: data })
}
