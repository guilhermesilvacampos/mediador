<template>
  <div class="cadastrarEditarSobreEscola">
    <box />

    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarEditarSobreEscola from "@/sobreEscola/components/box/BoxCadastrarEditarSobreEscola.vue";

export default {
  components: {
    "side-bar": SideBar,
    box: BoxCadastrarEditarSobreEscola
  }
};
</script>
<style scoped>
</style>