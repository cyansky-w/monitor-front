<template>
    <div class="container-fluid">
        <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
            <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker1"/>
            <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
                <div class="input-group-text"><i class="fa fa-calendar" aria-hidden="true"></i></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card text-black bg-light">
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid px-0">
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <router-link class="nav-link "
                                            :class="{ 'active': route.name === 'error_overview' }"
                                            :to="{name: 'error_overview'}" @click="getRoute">概览</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" :class="{ 'active': route.name === 'error_list' }"
                                            :to="{ name: 'error_list' }" @click="getRoute">错误列表</router-link>
                                    </li>
                                </ul>
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { TempusDominus, loadLocale, locale } from '@eonasdan/tempus-dominus';

import { localization, name } from "@eonasdan/tempus-dominus/dist/locales/ru";
let route = useRoute();


// console.log({localization, name});
// //load the locale
// loadLocale({localization, name});


// //set globally
// locale(name);

// var datetimepicker1 = new TempusDominus(document.getElementById('datetimepicker1'));

// //or set per picker
// datetimepicker1.locale(name);
    

</script>


<style scoped>
.navbar {
    border-bottom: 1px solid grey;
    padding: 0;
}

.nav-link {
    color: black;
    position: relative;
    padding: 1em 1em !important;
}

.nav-link.active {
    color: #21d48f;
}

.nav-link.active::after {
    content: '';
    width: 100%;
    border-bottom: 3px solid #21d48f;
    position: absolute;
    bottom: 0;
    left: 0;

}
</style>