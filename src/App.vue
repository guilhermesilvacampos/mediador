<template>
  <v-app id="app" class="app">
    
    <v-content>
      <router-view/>
    </v-content>
   
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data () {
    return {
      //
    }
  },

  mounted(){
    if(!this.$session.get("token")){
this.$router.push({
                name: "login"
              });
    }
  }
}
</script>
<style scoped>
 
</style>

