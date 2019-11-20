<template>
  <div class="listagemSadaDeAulaInvertida">
    <alert-success v-if="idAlert == 'deletarSuccess'" :msg="deletarSuccess" />
    <alert-error v-if="idAlert == 'deletarError'" :msg="deletarError" />

    <alert-success v-if="idAlert == 'cadastrarSuccess'" :msg="cadastrarSuccess" />
    <alert-error v-if="idAlert == 'cadastrarError'" :msg="cadastrarError" />

    <box :idTurma="this.idTurma" />
    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxListagemSalaDeAulaInvertida from "@/salaDeAulaInvertida/components/box/BoxListagemSalaDeAulaInvertida.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
	'box': BoxListagemSalaDeAulaInvertida,
	'alert-success' : AlertSuccess,
    'alert-error' : AlertError,
  },
  data: () => ({
  idAlert: "",
  idTurma:"",
	deletarError: "O Material de Sala De Aula Invertida não pode ser deletado!" ,
  deletarSuccess: "Material de Sala De Aula Invertida Deletado com Sucesso!",
  	cadastrarError: "Não foi possível Salvar o Material de Sala De Aula Invertida" ,
  cadastrarSuccess: "Material de Sala De Aula Invertida Salvo com Sucesso!",
  }),

  created() {
    this.idAlert = this.$route.query.idAlert;
     this.idTurma = this.$route.query.idTurma;
  }
};
</script>
<style scoped>
</style>