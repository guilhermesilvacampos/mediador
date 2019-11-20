<template>
  <div class="cadastrarEditarGremio">
    <box />

    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarEditarGremio from "@/gremio/components/box/BoxCadastrarEditarGremio.vue";

export default {
  components: {
    "side-bar": SideBar,
    box: BoxCadastrarEditarGremio
  }
};
</script>
<style scoped>
</style>