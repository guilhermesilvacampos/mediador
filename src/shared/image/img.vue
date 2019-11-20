<template>
    <img :height="height" :width="width" :border-radius="borderRadius"  :src="this.url"/>
</template>
<script>
export default {
    props:['url', 'height', 'width' , 'borderRadius'],
}
</script>
<style scoped>

</style> 