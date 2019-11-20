<template>
  <div class="cadastrarEditarCalendario">
    <box />

    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarEditarCalendario from "@/calendario/components/box/BoxCadastrarEditarCalendario.vue";

export default {
  components: {
    "side-bar": SideBar,
    box: BoxCadastrarEditarCalendario
  }
};
</script>
<style scoped>
</style>