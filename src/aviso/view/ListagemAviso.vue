<template>
  <div class="listagemAviso">
    <alert-success v-if="idAlert == 'deletarSuccess'" :msg="avisoDeletarSuccess" />
    <alert-error v-if="idAlert == 'deletarError'" :msg="avisoDeletarError" />
    <alert-success v-if="idAlert == 'cadastrarSuccess'" :msg="avisoCadastrarSuccess" />
    <alert-error v-if="idAlert == 'cadastrarError'" :msg="avisoCadastrarError" />
    <box />
    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxListagemAviso from "@/aviso/components/box/BoxListagemAviso.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
    'box': BoxListagemAviso,
    "alert-success": AlertSuccess,
    "alert-error": AlertError
  },
  data: () => ({
    idAlert: "",
    avisoDeletarError: "Aviso não pode ser Deletado",
    avisoDeletarSuccess: "Aviso Deletado com Sucesso!",
    avisoCadastrarSuccess: "Aviso Salvo com Sucesso!",
    avisoCadastrarError: "Aviso Não pode Ser Salvo"
  }),

  created() {
    this.idAlert = this.$route.query.idAlert;
  }
};
</script>
<style scoped>
</style>