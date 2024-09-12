<template>
  <div class="flex flex-col gap-[20px]">
    <el-table
      v-loading="props.loading.value"
      :data="props.items?.value"
      border
      size="small"
      :row-key="props.rowKey"
      style="width: 100%"
      :height="props.height"
      @rowClick="
        (row: any) => {
          props.rowClick && props.rowClick(row)
        }
      "
      :default-expand-all="props.expandAll"
    >
      <el-table-column
        v-for="(item, index) in props.columns"
        :key="index"
        :prop="String(item.key)"
        :label="item.label"
        :width="item.width"
      >
        <template v-if="item.header" #header>
          <component :is="item.header(h)" />
        </template>
        <template v-if="item.render" #default="scope">
          <component :is="item.render(scope.row, h)" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="props.action && props.action.items!.length > 0"
        :label="props.action.label || '操作'"
        :width="props.action.width"
      >
        <template #default="{ row }">
          <div class="flex gap-[10px]">
            <template v-for="(item, index) in props.action.items" :key="index">
              <template v-if="item.show ? item.show(row) : true">
                <template v-if="item.render">
                  <component :is="item.render(row, h)" />
                </template>
                <template v-else>
                  <el-button link :type="item.type" size="small" @click="item.onClick?.(row)">
                    <div class="flex gap-[5px] items-center">
                      <font-awesome-icon v-if="item.icon" :icon="item.icon" />
                      <template v-if="typeof item.text === 'function'">
                        {{ item.text(row) }}
                      </template>
                      <template v-else>
                        {{ item.text }}
                      </template>
                    </div>
                  </el-button>
                </template>
              </template>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="$props.pagination?.show ?? true"
      background
      layout="sizes, prev, pager, next"
      :page-sizes="$props.pagination?.pageSizes || [10, 20, 30]"
      :page-size="$props.pagination?.pageSize?.()"
      :total="$props.total?.value"
      @sizeChange="
        (val: number) => {
          $props.dataFetch?.(1, val)
        }
      "
      :current-page="$props.pagination?.pageNum?.()"
      @currentChange="
        (val: number) => {
          $props.dataFetch?.(val, $props.pagination?.pageSize?.() || 10)
        }
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { TableDefine } from '@/core/DataTable'
import { h, ref } from 'vue'

const props = withDefaults(defineProps<TableDefine<any>>(), {
  loading: () => ref(false),
  total: () => ref(0),
  columns: () => [],
  pagination: () => ({
    show: true
  }),
  dataFetch: (page: number, pageSize: number) => {
    // TODO
  }
})
</script>

<style scoped>
:deep(.el-button + .el-button) {
  margin-left: unset;
}
</style>
