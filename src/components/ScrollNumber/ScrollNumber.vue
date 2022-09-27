<template>
    <div class="numbers-container">
        <div class="numbers-box" v-for="(item,index) in scrollNumArr" :key="`scroll_${index}`">
            <div :class="[item==='.'?'numbers-scroll-point':`numbers-scroll-${item}`]" >
                <div>.</div>
                <div>0</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
            </div>
        </div>

    </div>
</template>

<script setup >
import { onMounted, reactive } from "@vue/runtime-core"

    const props=defineProps({
        scrollNum:{
            type:String,
            required:true
        }
    })

    let scrollNumArr=reactive([])
    onMounted(()=>{
        scrollNumArr.push(...props.scrollNum.split(''))
    })
</script>

<style scoped>
.numbers-container {
    width: 100%;
    line-height: 1em;
    display: flex;
    justify-content: center;
}

.numbers-container .numbers-box {
    height: 1em;
    overflow: hidden;
    /* float: left; */
}

.numbers-container .numbers-box .numbers-scroll-point {
    margin-top: -1em;
}

.numbers-container .numbers-box .numbers-scroll-0 {
    margin-top: -1em;
    animation: scrollNumber0 1.2s linear 1 normal;
    -webkit-animation: scrollNumber0 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-1 {
    margin-top: -2em;
    animation: scrollNumber1 1.2s linear 1 normal;
    -webkit-animation: scrollNumber1 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-2 {
    margin-top: -3em;
    animation: scrollNumber2 1.2s linear 1 normal;
    -webkit-animation: scrollNumber2 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-3 {
    margin-top: -4em;
    animation: scrollNumber3 1.2s linear 1 normal;
    -webkit-animation: scrollNumber3 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-4 {
    margin-top: -5em;
    animation: scrollNumber4 1.2s linear 1 normal;
    -webkit-animation: scrollNumber4 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-5 {
    margin-top: -6em;
    animation: scrollNumber5 1.2s linear 1 normal;
    -webkit-animation: scrollNumber5 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-6 {
    margin-top: -7em;
    animation: scrollNumber6 1.2s linear 1 normal;
    -webkit-animation: scrollNumber6 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-7 {
    margin-top: -8em;
    animation: scrollNumber7 1.2s linear 1 normal;
    -webkit-animation: scrollNumber7 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-8 {
    margin-top: -9em;
    animation: scrollNumber8 1.2s linear 1 normal;
    -webkit-animation: scrollNumber8 1.2s linear 1 normal;
}

.numbers-container .numbers-box .numbers-scroll-9 {
    margin-top: -10em;
    animation: scrollNumber9 1.2s linear 1 normal;
    -webkit-animation: scrollNumber9 1.2s linear 1 normal;
}

@keyframes scrollNumber0 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -1em;
    }
}

@keyframes scrollNumber1 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -2em;
    }
}

@keyframes scrollNumber2 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -3em;
    }
}

@keyframes scrollNumber3 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -4em;
    }
}

@keyframes scrollNumber4 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -5em;
    }
}

@keyframes scrollNumber5 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -6em;
    }
}

@keyframes scrollNumber6 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -7em;
    }
}

@keyframes scrollNumber7 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -8em;
    }
}

@keyframes scrollNumber8 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -9em;
    }
}

@keyframes scrollNumber9 {
    0% {
        margin-top: -1em;
    }

    100% {
        margin-top: -10em;
    }
}
</style>