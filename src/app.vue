<template>
<div>
    <span>{{ counter }}</span>
    <button @click="counter++">Inc</button>
    <button @click="counter--">Dec</button>
</div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            counter: 0 
        }
    }
}
</script>
<style>
button {
    border: 2px solid orange;
    margin: 0px;
    padding: 3px;
}
</style>