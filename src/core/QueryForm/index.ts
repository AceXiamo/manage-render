import { h, VNode } from 'vue'
import QueuryForm from '@/core/QueryForm/index.vue'
import useTextField from '@/core/FormFields/useTextField'

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
  type?: VNode
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

/**
 * Creates a new QueryForm component with the specified form defines.
 * @param formDefines The form defines to be used for the QueryForm component.
 * @returns The QueryForm component.
 */
export default <T>(formDefines: FormDefine<T>) => {
  formDefines.formItems?.forEach(formItem => {
    if (formItem.type === undefined) {
      formItem.type = useTextField()
    }
  })
  return h(QueuryForm, formDefines)
}
