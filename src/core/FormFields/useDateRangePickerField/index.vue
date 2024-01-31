<template>
  <el-date-picker v-model="pickerValue" type="daterange" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue'
import { dayjs } from 'element-plus';

type IProps = {
  queryForm: Ref<any>
  beginKey: string
  endKey: string
}

const props = defineProps<IProps>()
const pickerValue = ref()

const handleChange = (val: [Date, Date]) => {
  let begin, end
  if (val) {
    begin = dayjs(val[0]).format('YYYY-MM-DD')
    end = dayjs(val[1]).format('YYYY-MM-DD')
  } else {
    begin = null
    end = null
  }
  const queryForm = props.queryForm.value
  queryForm[props.beginKey] = begin
  queryForm[props.endKey] = end
}

onMounted(() => {
  const begin = props.queryForm.value[props.beginKey]
  const end = props.queryForm.value[props.endKey]
  if (begin && end) {
    pickerValue.value = [dayjs(begin).toDate(), dayjs(end).toDate()]
  } else {
    pickerValue.value = null
  }
})
</script>
