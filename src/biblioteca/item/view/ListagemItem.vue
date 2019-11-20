<template>
  <div class="listagemItem">
    <alert-success v-if="idAlert == 'deletarSuccess'" :msg="deletarSuccess" />
    <alert-error v-if="idAlert == 'deletarError'" :msg="deletarError" />

    <alert-success v-if="idAlert == 'cadastrarSuccess'" :msg="cadastrarSuccess" />
    <alert-error v-if="idAlert == 'cadastrarError'" :msg="cadastrarError" />
    <box :idTopico="this.idTopico" />
    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxListagemItem from "@/biblioteca/item/components/box/BoxListagemItem.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
	'box': BoxListagemItem,
	'alert-success' : AlertSuccess,
    'alert-error' : AlertError,
  },
  data: () => ({
  idAlert: "",
	deletarError: "Item não pode ser deletado!" ,
  deletarSuccess: "Item Deletado com Sucesso!",
  cadastrarSuccess: "Item Salvo com Sucesso!",
  cadastrarError: "Não foi Possível Salvar o Item"
  }),

  created() {
    this.idAlert = this.$route.query.idAlert;
     this.idTopico = this.$route.query.idTopico;
  }
};
</script>
<style scoped>
</style>