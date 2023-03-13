<template>
    <button class="cyan-btn" :disabled="props.disabled" :class="{'disabled':props.disabled}" @click="$emit('click')">
        <slot>

        </slot>
    </button>
</template>

<script setup>
let props=defineProps({
    disabled:{
        type:Boolean,
        default:false
    }
})
</script>

<style scoped lang="scss">
    .cyan-btn {
        display: inline-block;
        background-color: #004dda;
        color: white;
        padding: 3px 19px;
        box-sizing: content-box;
        border-radius: 5px;
        font-weight: bolder;
        transition: all 0.3s;
        cursor: pointer;
    }
    
    .cyan-btn:hover {
        background-color: #FFC107;
        color: black;
    }
    .disabled{
        background: #223a68 !important;
    }
</style>