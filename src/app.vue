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
$color: red;

button {
    border: 2px solid $color;
    margin: 0px;
    padding: 3px;
}
</style>