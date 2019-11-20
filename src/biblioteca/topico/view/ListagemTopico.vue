<template>
  <div class="listagemTopico">
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
import BoxListagemTopico from "@/biblioteca/topico/components/box/BoxListagemTopico.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
	'box': BoxListagemTopico,
	'alert-success' : AlertSuccess,
    'alert-error' : AlertError,
  },
  data: () => ({
	idAlert: "",
	deletarError: "Tópico não pode ser deletado!" ,
  deletarSuccess: "Tópico Deletado com Sucesso!",
  cadastrarSuccess: "Tópico Salvo com Sucesso!",
  cadastrarError: "Não foi Possível Salvar o Tópico"
  }),

  created() {
    this.idAlert = this.$route.query.idAlert;
  }
};
</script>
<style scoped>
</style>