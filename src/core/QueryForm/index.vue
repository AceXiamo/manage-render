<template>
  <div :class="[`flex`, className]">
    <el-form
      ref="form"
      :inline="true"
      :label-width="labelWidth"
      :model="$props.modelValue.value"
      :rules="rules"
      :disabled="disabled"
    >
      <template v-for="(item, index) in formItems" :key="index">
        <el-form-item :label="item.label">
          <template v-if="item.key">
            <component :is="item.type" v-model="$props.modelValue.value[item.key!]" />
          </template>
          <template v-else>
            <component :is="item.type" />
          </template>
        </el-form-item>
      </template>
      <el-form-item>
        <template v-for="(item, index) in actions" :key="index">
          <el-button :type="item.type" @click="item.handler">
            <template v-if="item.icon">
              <font-awesome-icon :icon="item.icon" class="mr-[5px] text-[12px]" />
            </template>
            <span>{{ item.text }}</span>
          </el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup name="QueryForm">
import { FormDefine } from '@/core/QueryForm'

withDefaults(defineProps<FormDefine<any>>(), {
  modelValue: {},
  rules: {},
  disabled: false,
  formItems: () => [],
  className: '',
  actions: () => [],
})
</script>
