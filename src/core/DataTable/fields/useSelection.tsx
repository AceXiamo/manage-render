import { ref, defineComponent, PropType, watch, Ref } from 'vue'
import { ColumnItem } from '@/core/DataTable'

const SelectionItem = defineComponent({
  props: {
    field: {
      type: String,
      default: '',
    },
    hearder: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
    selection: {
      type: Object as PropType<Ref<string[]>>,
      default: () => ({}),
    },
    items: {
      type: Object as PropType<Ref<any[]>>,
      default: () => ({}),
    },
    single: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],
  setup(props, ctx) {
    const checked = ref(false)

    watch(props.selection, () => {
      if (!props.hearder) {
        checked.value = !!props.selection.value?.includes(props.item[props.field]!)
      } else {
        checked.value = props.selection.value?.length === props.items.value.length
      }
    })

    const toggle = () => {
      let selection = []
      if (props.hearder) {
        selection = checked.value ? props.items.value.map(v => v[props.field]!) : []
      } else {
        if (props.single) {
          selection = checked.value ? [props.item[props.field]!] : []
        } else {
          selection = checked.value
            ? [...(props.selection.value || []), props.item[props.field]!]
            : props.selection.value?.filter(v => v !== props.item[props.field])
        }
      }
      ctx.emit('change', selection)
    }

    return {
      checked,
      toggle,
    }
  },
  render() {
    return (
      <div>
        <el-checkbox v-model={this.checked} onChange={this.toggle} size="large" />
      </div>
    )
  },
})

type IProps<T> = {
  selection: Ref<string[]>
  tableData: Ref<T[]>
  field: Extract<keyof T, string>
  single?: boolean
}

export default function <T>({ selection, tableData, field, single = false }: IProps<T>) {
  return {
    render: item => (
      <SelectionItem
        field={field}
        selection={selection}
        item={item}
        items={tableData}
        onChange={v => (selection.value = v)}
        single={single}
      />
    ),
    ...(!single && {
      header: () => (
        <SelectionItem
          field={field}
          selection={selection}
          hearder={true}
          items={tableData}
          onChange={v => (selection.value = v)}
        />
      ),
    }),
  } as Partial<ColumnItem<T>>
}
