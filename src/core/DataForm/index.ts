import { VNode, h } from 'vue'
import Component from './index.vue'
import useTextField from '../FormFields/useTextField'

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

/**
 * Creates a form component based on the provided form definition.
 * @template T - The type of the form model.
 * @param formDefines - The form definition.
 * @returns The created form component.
 */
export default <T>(formDefines: FormDefine<T>) => {
  formDefines.formItems?.forEach(formItem => {
    if (formItem.type === undefined) {
      formItem.type = useTextField()
    }
  })
  return h(Component, formDefines)
}
