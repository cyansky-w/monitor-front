<template>
  <!-- <div class="container clearfix">
    <Nav></Nav>
    <div class="layout">
      <CustomSlider></CustomSlider>
    </div>
  </div> -->
  <NavBar></NavBar>
  <router-view></router-view>
</template>

<script lang = 'ts'>
// import { defineComponent, defineAsyncComponent} from "vue";
import { useRoute, useRouter } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/css/public.css';
import '@/assets/css/shake.css';

import 'bootstrap/dist/js/bootstrap';
import NavBar from './components/NavBar/NavBar.vue';

export default {
    setup () {
      const route = useRoute
      const router = useRouter()
    },
    name: "App",
    components:{
      NavBar
  }
}
// export default defineComponent({
//   name: "App",
//   components: {
//     Nav: defineAsyncComponent(() => import("./components/Nav.vue")),
//     CustomSlider: defineAsyncComponent(
//       () => import("./components/CustomSlider.vue")
//     )
//   }
// })
</script>


<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}



.fs-s {
  font-size: .8rem;
}

.fs-m {
  font-size: .9rem;
}

.row-title {
  display: flex;
  width: 100%;
  height: 40px;
  margin: 0;
  margin-bottom: 10px;
  justify-content: space-between;
}
</style>
