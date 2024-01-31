<template>
  <div :class="[$props.class]">
    <el-form
      ref="formRef"
      :inline="true"
      :label-width="labelWidth"
      :model="$props.modelValue.value"
      :rules="rules"
    >
      <template v-for="(row, i) in items" :key="i">
        <el-row :gutter="$props.rowGap">
          <template v-for="(col, j) in row" :key="j">
            <el-col v-if="col.show ? col.show($props.modelValue.value) : true" :span="col?.col">
              <el-form-item class="w-full" :label="col?.label" :prop="(col as any).key">
                <template v-if="col?.key">
                  <component
                    :is="col?.type"
                    v-model="$props.modelValue.value[col?.key!]"
                    :readonly="$props.readonly || col.readonly"
                    class="!w-full"
                  />
                </template>
                <template v-else>
                  <component
                    :is="col?.type"
                    class="!w-full"
                    :readonly="$props.readonly || col.readonly"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </template>
    </el-form>
    <div class="flex justify-end">
      <template v-for="(item, index) in $props.actions" :key="index">
        <el-button
          v-if="item.show ? item.show($props.modelValue.value) : true"
          :type="item.type"
          @click="
            () => {
              if (item.verify) {
                formRef.validate((valid: boolean) => {
                  valid && item.handler()
                })
              } else {
                item.handler()
              }
            }
          "
        >
          <template v-if="item.icon">
            <font-awesome-icon :icon="item.icon" class="mr-[5px] text-[12px]" />
          </template>
          <span>{{ item.text }}</span>
        </el-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormDefine, FormItem } from '@/core/DataForm'
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<FormDefine<any>>(), {
  modelValue: {},
  disabled: false,
  labelWidth: 100,
  formItems: () => [],
  actions: () => [],
})

type FormRow = FormItem<any>[]
const items = ref<FormRow[]>([])
const rules = ref<any>({})
const formRef = ref<any>(null)

onMounted(() => {
  let index = 0,
    row: FormRow = [],
    remaining = 24

  const finishRow = () => {
    if (row.length > 0) {
      items.value.push(row)
      row = []
      remaining = 24
    }
  }

  while (props.formItems && index < props.formItems?.length) {
    rules.value[props.formItems[index].key!] = props.formItems[index].rules

    const field = props.formItems[index]
    if (!field?.col) {
      field.col = 24
    }
    row.push(field)
    remaining -= field.col
    if (remaining <= 0 || props.formItems[index].rowEnd) {
      finishRow()
    }
    index++
  }

  finishRow()
})
</script>

<style scoped>
/* for el-date-picker */
:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
