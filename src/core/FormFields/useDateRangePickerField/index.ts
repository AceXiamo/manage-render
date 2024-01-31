import { Ref, h } from 'vue'
import Component from './index.vue'

export default <T extends object, K extends keyof T>(
  queryForm: Ref<T>,
  beginKey: Extract<K, string>,
  endKey: Extract<K, string>,
) => {
  return h(Component, { queryForm, beginKey, endKey })
}
