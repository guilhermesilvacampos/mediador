<template>
 <v-alert dismissible :color="type" icon="check_circle" value="true" v-if="type">
        {{msg}}
      </v-alert>
</template>
<script>
export default {
    props:['msg'],
    data: () => ({
        type: 'success',
    })
}
</script>