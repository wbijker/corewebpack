<template lang="pug">
div
    span {{ counter }}
    div
        button(@click="counter++") Inc
        button(@click="counter--") Dec
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
<style lang="scss">
$color: #000;

button {
    outline: none;
    border: 2px solid $color;
    margin: 5px;
    padding: 3px;
}
</style>