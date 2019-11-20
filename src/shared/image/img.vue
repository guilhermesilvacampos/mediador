<template>
    <img :height="height" :width="width" :border-radius="borderRadius"  :src="this.url" alt="imagem"/>
</template>
<script>
export default {
    props:['url', 'height', 'width' , 'borderRadius'],
}
</script>
<style scoped>

</style> 