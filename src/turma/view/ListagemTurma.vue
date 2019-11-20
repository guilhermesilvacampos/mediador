<template>
  <div class="listagemTurma">
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
import BoxListagemTurma from "@/turma/components/box/BoxListagemTurma.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
	'box': BoxListagemTurma,
	'alert-success' : AlertSuccess,
    'alert-error' : AlertError,
  },
  data: () => ({
	idAlert: "",
	deletarError: "Turma não pode ser deletado!" ,
  deletarSuccess: "Turma Deletado com Sucesso!",
  cadastrarError: "Não foi possível salvar a Turma" ,
	cadastrarSuccess: "Turma Salva com Sucesso!"
  }),

  created() {
    this.idAlert = this.$route.query.idAlert;
  }
};
</script>
<style scoped>
</style>