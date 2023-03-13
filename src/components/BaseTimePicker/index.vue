<template>
  <el-date-picker
          v-model="timestamp"
          type="date"
          placeholder="今天"
          :shortcuts="shortcuts"
          @change="resloveTimeChange"
        />
</template>

<script setup>
import { useProjectStore } from '@/store/project';
import { formatDate } from '@/utils/tools/formatTime';
import { ref } from 'vue-demi';
const projectStore = useProjectStore();
const emits = defineEmits('change')
let timestamp = ref(projectStore.getTimestamp || new Date());
function resloveTimeChange(e){
    projectStore.setTimestamp(new Date(formatDate(e, "YYYY-mm-dd") + ' 23:59:59'));
    emits('change',e)
}
</script>

<style>

</style>