import { VNode, h, Ref } from 'vue'
import DataTable from '@/core/DataTable/index.vue'

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

/**
 * Creates a DataTable component with the given table definition.
 * @template T The type of data in the table.
 * @param {TableDefine<T>} define The table definition.
 * @returns {VNode} The DataTable component.
 */
export default <T>(define?: TableDefine<T>) => {
  return h(DataTable, define)
}
