# manage-render

[![npm](https://img.shields.io/npm/v/@axm-pack/manage-render)](https://www.npmjs.com/package/@axm-pack/manage-render)
[![GitHub](https://img.shields.io/github/license/AceXiamo/manage-render)](https://github.com/AceXiamo/manage-render)
[![GitHub](https://img.shields.io/github/issues/AceXiamo/manage-render)](https://github.com/AceXiamo/manage-render/issues)
[![GitHub](https://img.shields.io/github/stars/AceXiamo/manage-render)](https://github.com/AceXiamo/manage-render)

[English](./README.md) | 简体中文

基于 ElementPlus 的 `CRUD` 构造器。

## Demo

[🔗 点击查看](https://stackblitz.com/~/github.com/AceXiamo/manage-render-view)

![](./assets/screenshot/5951723473367_.pic_hd.jpg)

> 使用 JSX 的前提是需要安装 `@vitejs/plugin-vue-jsx` 插件。

## 安装

```bash
pnpm i @axm-pack/manage-render
```

> 在 main.ts 中引入

```ts
...

import { Context } from '@axm-pack/manage-render'
import '@axm-pack/manage-render/dist/style.css'

const app = createApp(App)
app.use(Context)

...
```

## 使用

### Dialog

一个十分方便的 Dialog 组件

- 函数式调用
- 顺序关闭 & Esc 关闭
- 自定义内容
- 支持 `h()` & `JSX`

```jsx
import { defineComponent } from 'vue'
import { Dialog } from '@axm-pack/manage-render'

const DialogContent = defineComponent({
  render() {
    return  (
      <div>
        <p>Dialog Content.</p>
      </div>
    )
  }
})

// JSX
const show = () => {
  const instance = Dialog.init({
    title: '🎄 Title'
    width: 500,
    content: () => <DialogContent />,
  })
}

// h()
const show = () => {
  const instance = Dialog.init({
    title: '🎄 Title'
    width: 500,
    content: (h) => h(DialogContent),
  })
}
```

对于 Vue 的单文件组件，可以这样写

```jsx
import { Dialog } from '@axm-pack/manage-render'
import DialogContent from './DialogContent.vue'

// JSX
const show = () => {
  const instance = Dialog.init({
    title: '🎄 Title'
    width: 500,
    content: () => <DialogContent />,
  })
}

// h()
const show = () => {
  const instance = Dialog.init({
    title: '🎄 Title'
    width: 500,
    content: (h) => h(DialogContent),
  })
}
```

这里的 `instance` 是一个 `Dialog` 实例，可以通过 `instance.close()` 来关闭 Dialog。

### QueryForm

如其名，用于构建查询表单

- 支持自定义渲染， `JSX` & `h()`
- 包含内置实现，如 `Input`、`Select`、`DatePicker` 等
- TS 类型支持

```jsx
import { QueryForm } from '@axm-pack/manage-render'
import { ref } from 'vue'

type QueryFormType = {
  name: string
  age: number
}

const queryForm = ref<QueryFormType>({})
const QueryFormNode = QueryForm<QueryFormType>({
  modelValue: queryForm,
  formItems: [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Age',
      key: 'age',
      type: () => <Component />,
    },
  ],
  actions: [
     {
      text: '查询',
      type: 'primary',
      handler: () => {
        // TODO
      },
    },
  ]
})
```

```html
<template>
  <div>
    <QueryFormNode />
  </div>
</template>
```

`type` 默认为文本框，支持自定义，已实现的类型:

- `useTextField` 文本框
- `useSelectorField` 下拉框
- `useDatePickerField` 日期选择器
- `useDateRangePickerField` 日期范围选择器
- `useCascaderField` 级联选择器

均为 ElementPlus 的组件，具体的 `Props`, `Events` 可以参考 ElementPlus 的文档。

🔗 [Source Code](https://github.com/AceXiamo/manage-render/tree/main/src/core/FormFields)

#### 类型参照

```ts
/**
 * Defines the properties of a form.
 */
export type FormDefine<T> = {
  /** The initial value of the form. */
  modelValue?: any
  /** The validation rules for the form. */
  rules?: any
  /** Whether the form is disabled or not. */
  disabled?: boolean
  /** The width of the form label. */
  labelWidth?: number | string
  /** The form items to be displayed. */
  formItems?: FormItem<T>[]
  /** The class name of the form. */
  className?: string
  /** The actions to be displayed in the form. */
  actions?: Actions[]
}

/**
 * Defines the properties of a form item.
 */
export type FormItem<T, K = keyof T> = {
  /** The type of the form item. */
  type?: VNode | (() => VNode)
  /** The key of the form item. */
  key?: K
  /** The label of the form item. */
  label?: string
}

/**
 * Defines the properties of an action.
 */
export type Actions = {
  /** The type of the action. */
  type: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
  /** The text to be displayed for the action. */
  text: string
  /** The icon of the form item. */
  icon?: string
  /** The function to be called when the action is triggered. */
  handler: () => void
}
```

### DataTable

用于构建数据表格，基于 ElementPlus 的 `Table` 组件

- 支持自定义渲染， `JSX` & `h()`
- TS 类型支持

```jsx
import { DataTable } from '@axm-pack/manage-render'
import { ref } from 'vue'

type TableDataType = {
  name: string
  age: number
}

type PageDataType = {
  pageNum: number
  pageSize: number
}

const queryForm = ref<PageDataType>({
  pageNum: 1,
  pageSize: 10,
})
const tableData = ref<TableDataType[]>([])
const loading = ref<boolean>(false)
const total = ref<number>(0)

const DataTableNode = DataTable<TableDataType, PageDataType>({
  modelValue: tableData,
  loading,
  total,
  pagination: {
    pageSize: () => queryForm.value.pageSize,
    pageNum: () => queryForm.value.pageNum,
  },
  dataFetch: (pageNum, pageSize) => {
    // TODO
  },
  columns: [
    {
      label: 'Name',
      prop: 'name',
    },
    {
      label: 'Age',
      prop: 'age',
      render: item => {
        return <span>{item.age}</span>
      },
    },
  ],
  action: {
    width: 200,
    items: [
      {
        text: 'View',
        type: 'primary',
        onClick: item => {
          // TODO
        },
      },
    ],
  },
})
```

```html
<template>
  <div>
    <DataTableNode />
  </div>
</template>
```

#### ✅ 关于勾选行

```jsx
import { useSelection } from '@/core/DataTable/fields'
import { DataTable } from '@axm-pack/manage-render'

const selection = ref<string[]>([])
const DataTableNode = DataTable<TableDataType, PageDataType>({
  ...
  columns: [
    {
      label: '',
      width: 50,
      ...useSelection({
        selection,
        tableData,
        field: 'id',
        single: true,
      }),
    },
  ],
  ...
})
```

`selection` 的值为选中行的 `id` 数组

`selection` 类型参照

```ts
type IProps<T> = {
  selection: Ref<string[]>
  tableData: Ref<T[]>
  field: Extract<keyof T, string>
  single?: boolean // 是否单选
}
```

#### 类型参照

```ts
/**
 * Defines the structure of a table in the DataTable component.
 * @template T The type of data displayed in the table.
 */
export type TableDefine<T> = {
  /** Whether the table is currently loading data. */
  loading?: Ref<boolean>
  /** The total number of items in the data set. */
  total?: Ref<number>
  /** The data items to display in the table. */
  items?: Ref<T[]>
  /** The height of the table. */
  height?: string | number
  /** The columns to display in the table. */
  columns?: ColumnItem<T>[]
  /** A function to handle the click event for a row in the table. */
  rowClick?: (row: T) => void
  /** The action to display for each row in the table. */
  action?: {
    /** The label to display for the action. */
    label?: string
    /** The width of the action. */
    width?: string | number
    /** The actions to display for the action. */
    items?: {
      /** The text to display for the action. */
      text?: string | ((item: T) => string)
      /** The type of button to display for the action. */
      type?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
      /** The icon to display for the action. */
      icon?: string
      /** Whether the action is disabled. */
      show?: (item: T) => boolean
      /** A function to handle the click event for the action. */
      onClick?: (item: T) => void
      /** A function to render custom content for the action. */
      render?: (item: T, h: any) => VNode
    }[]
  }
  /** The pagination settings for the table. */
  pagination?: {
    /** Whether to display the pagination controls. */
    show?: boolean
    /** The current page number. */
    pageNum?: () => number
    /** The number of items to display per page. */
    pageSize?: () => number
    /** The available page sizes to choose from. */
    pageSizes?: number[]
  }
  /** A function to fetch data for the table. */
  dataFetch?: (pageNum: number, pageSize: number) => void
}

/**
 * Represents a column item in a data table.
 * @template T The type of the data item.
 * @template K The type of the key of the data item property.
 */
export type ColumnItem<T, K = keyof T> = {
  /** The label to display for the column. */
  label?: string
  /** The key of the data item property to display in the column. */
  key?: K
  /** The width of the column. */
  width?: string | number
  /** A function to render custom content in the column. */
  render?: (item: T, h: any) => VNode
  /** A function to render custom content in the column header. */
  header?: (h: any) => VNode
}
```

### DataForm

用于构建数据表单，基于 ElementPlus 的 `Form` 组件

- 支持自定义渲染， `JSX` & `h()`
- TS 类型支持

本质上和 `QueryForm` 差不多，和 `QueryForm` 共用已实现的组件，但是增加了一些参数，更加适用于构建数据表单

```jsx
import { DataForm, useTextField } from '@axm-pack/manage-render'
import { ref } from 'vue'

type FormDataType = {
  name: string
  age: number
}

const formData = ref<FormDataType>({})
const DataFormNode = DataForm<FormDataType>({
  modelValue: formData,
  labelWidth: 100,
  formItems: [
    {
      label: 'Name',
      key: 'name',
      type: useTextField(),
    },
    {
      label: 'Age',
      key: 'age',
      type: () => <Component />,
    },
  ],
  actions: [
     {
      text: '提交',
      type: 'primary',
      handler: () => {
        // TODO
      },
    },
  ]
})
```

```html
<template>
  <div>
    <DataFormNode />
  </div>
</template>
```

#### 类型参照

```ts
/**
 * Represents the form definition for creating a form component.
 * @template T - The type of the form model.
 */
export type FormDefine<T> = {
  class?: string
  modelValue?: any
  readonly?: boolean
  disabled?: boolean
  labelWidth?: string | number
  rowGap?: number
  formItems?: FormItem<T>[]
  actions?: ActionItem<T>[]
}

/**
 * Represents a form item in the form definition.
 * @template T - The type of the form model.
 * @template K - The key of the form item.
 */
export type FormItem<T, K = keyof T> = {
  label?: string
  key?: K
  type?: VNode | (() => VNode)
  readonly?: boolean
  rules?: any
  col?: number
  rowEnd?: boolean
  remark?: string
  show?: (item: T) => boolean
}

/**
 * Represents an action item in the form definition.
 * @template T - The type of the form model.
 */
type ActionItem<T> = {
  type: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
  text: string
  icon?: string
  verify?: boolean
  show?: (item: T) => boolean
  handler: () => void
}
```

#### 配合 Dialog 使用

```jsx
import { defineComponent, ref, PropType } from 'vue'
import { Dialog, DataForm } from '@axm-pack/manage-render'

type FormDataType = {
  name: string
  age: number
}

const DialogContent = defineComponent({
  props: {
    item: {
      type: Object as PropType<TableDataType>,
      default: () => ({}),
      required: false,
    },
    close: {
      type: Function as PropType<() => void>,
      required: false,
    }
  }
  setup(props) {
    const formData = ref<FormDataType>(props.item)
    const DataFormNode = DataForm<FormDataType>({
      modelValue: formData,
      labelWidth: 100,
      formItems: [
        {
          label: 'Name',
          key: 'name',
          type: useTextField(),
        },
        {
          label: 'Age',
          key: 'age',
          type: useTextField(),
        },
      ],
      actions: [
        {
          text: '提交',
          type: 'primary',
          handler: () => {
            // TODO
          },
        },
      ]
    })

    return {
      DataFormNode,
    }
  },
  render() {
    return  (
      <div>
        {this.DataFormNode}
      </div>
    )
  }
})

const show = ({item} : {item: FormDataType}) => {
  const instance = Dialog.init({
    title: '🎄 Title'
    width: 500,
    content: () => <DialogContent item={item} close={instance?.close} />,
  })
}

export { show }
```

这种组件我一般会命名为 `EditDialog`, 使用的话则直接调用 `EditDialog.show({ item })` 即可。
eg.

```html
...
<button @click="EditDialog.show({ item })">Edit</button>
...

<script setup>
  import EditDialog from './EditDialog.tsx'
</script>
```
