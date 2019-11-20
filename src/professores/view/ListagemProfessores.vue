<template>
  <div class="listagemProfessores">
    <alert-success v-if="idAlert == 'deletarSuccess'" :msg="deletarSuccess" />
    <alert-error v-if="idAlert == 'deletarError'" :msg="deletarError" />

    <alert-success v-if="idAlert == 'cadastrarSuccess'" :msg="cadastrarSuccess" />
    <alert-error v-if="idAlert == 'cadastrarError'" :msg="cadastrarError" />
    <box />
    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxListagemProfessores from "@/professores/components/box/BoxListagemProfessores.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
    'box': BoxListagemProfessores,
    "alert-success": AlertSuccess,
    "alert-error": AlertError
  },
  data: () => ({
    idAlert: "",
    deletarError: "Professor não pode ser deletado!",
    deletarSuccess: "Professor Deletado com Sucesso!",
    cadastrarSuccess: "Professor Salvo com Sucesso!",
    cadastrarError: "Não foi possível Salvar o Professor"
  }),

  created() {
    this.idAlert = this.$route.query.idAlert;
  }
};
</script>
<style scoped>
</style>