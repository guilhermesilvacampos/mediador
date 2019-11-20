<template>
  <div class="cadastrarEditarBullying">
    <box />

    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarEditarBullying from "@/bullying/components/box/BoxCadastrarEditarBullying.vue";

export default {
  components: {
    "side-bar": SideBar,
    box: BoxCadastrarEditarBullying
  }
};
</script>
<style scoped>
</style>