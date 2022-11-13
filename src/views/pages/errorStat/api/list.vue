<template>
    <div class="col-md-12">
        <div class="card text-black bg-light h-100">
            <div class="card-body">
                <p>全部错误</p>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="error" label="错误">
                    </el-table-column>
                    <el-table-column prop="count" label="发生次数" width="180">
                    </el-table-column>
                    <el-table-column prop="people" label="影响人数" width="180">
                    </el-table-column>
                </el-table>
                <Pagination
                v-show="total>0"
                :total="total"
                :page="queryParams.pageNum"
                :limit="queryParams.pageSize"
                @pagination="getList"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { reactive } from "@vue/reactivity";
let tableData=reactive([
                {
                    error: 'Network error',
                    count: '130',
                    people: '2203'
                },
                {
                    error: 'Network error',
                    count: '130',
                    people: '2203'
                },
                {
                    error: 'Network error',
                    count: '130',
                    people: '2203'
                },
            ])
</script>


<style scoped>
</style>