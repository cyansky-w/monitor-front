<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card text-black bg-light">
                    <nav class="navbar navbar-expand-lg">
                            <div class="container-fluid px-0">
                                <div class="collapse navbar-collapse" id="navbarNav">
                                    <ul class="navbar-nav">
                                        <li class="nav-item">
                                            <router-link class="nav-link " :class="{'active':route.name==='error_overview'}"  :to="{name: 'error_overview'}" @click="getRoute" >概览</router-link>
                                        </li>
                                        <li class="nav-item">
                                            <router-link class="nav-link" :class="{'active':route.name==='error_list'}"  :to="{name: 'error_list'}" @click="getRoute">错误列表</router-link>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <div class="date-box p-2">
                                        <el-date-picker
                                            v-model="date"
                                            type="date"
                                            placeholder="Pick a day"
                                            :size="size"
                                        />
                                </div>
                            </div>
                        </nav>
                    <div class="card-body">
                         <router-view></router-view>
                    </div>
                   
                </div>
            </div>
        </div>
        <!-- <div class="row">
            <router-view></router-view>
        </div> -->
    </div>
</template>


<script setup>
import { reactive, ref } from 'vue';
import {useRoute} from 'vue-router';
let route=useRoute();
let date=reactive(new Date())
</script>


<style scoped>
.navbar{
    border-bottom:1px solid grey ;
    padding: 0;
}
.nav-link{
    color: black;
    position: relative;
    padding: 1em 1em !important;
}
.nav-link.active{
    color: #21d48f;
}
.nav-link.active::after{
    content: '';
    width: 100%;
    border-bottom:3px solid #21d48f ;
    position: absolute;
    bottom: 0;
    left: 0;

}

.date-box{

}

</style>