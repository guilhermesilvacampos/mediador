<template>
  <div class="listagemNoticia">
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
import BoxListagemNoticia from "@/noticia/components/box/BoxListagemNoticia.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
    'box': BoxListagemNoticia,
    "alert-success": AlertSuccess,
    "alert-error": AlertError
  },
  data: () => ({
    idAlert: "",
    deletarError: "Noticia não pode ser Deletada",
    deletarSuccess: "Noticia Deletada com Sucesso!",
    cadastrarSuccess: "Notícia Salva com Sucesso!",
    cadastrarError: "Não foi possível salvar a Notícia"
  }),

  created() {
    this.idAlert = this.$route.query.idAlert;
  }
};
</script>
<style scoped>
</style>