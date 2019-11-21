<template>
  <div class="listagemAlunosTurma">
    <alert-success v-if="idAlert == 'deletarSuccess'" :msg="deletarSuccess" />
    <alert-error v-if="idAlert == 'deletarrror'" :msg="deletarError" />
    <box :idTurma="this.idTurma" />
    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxListagemAlunosTurma from "@/aluno/components/box/BoxListagemAlunosTurma.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
	'box': BoxListagemAlunosTurma,
	'alert-success' : AlertSuccess,
    'alert-error' : AlertError,
  },
  
  data: () => ({
	idAviso: "",
	deletarError: "O Aluno não pode ser deletado!" ,
	deletarSuccess: "Aluno Deletado com Sucesso!"
  }),

  created() {
    this.idAlert = this.$route.query.idAlert;
     this.idTurma = this.$route.query.idTurma;
  }
};
</script>
<style scoped>
</style> 