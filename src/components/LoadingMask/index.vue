<template>
  <div class="loading-mask" v-show="props.show">
      <div class="loading-wrapper ">
        <div class="loading-view neon">
          loading...
        </div>
      </div>
    </div>
</template>

<script setup>

const props = defineProps({
    show:Boolean
})

</script>

<style>

</style>