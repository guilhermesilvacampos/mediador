<template>
  <div class="home">
  
    <alert-error v-if="idAlert == 'bullyingErrorBusca'" :msg="bullyingErrorBusca" />
    <alert-error v-if="idAlert == 'bullyingError'" :msg="bullyingError" />
    <alert-success v-if="idAlert == 'bullyingSuccess'" :msg="bullyingSuccess" />

    <alert-error v-if="idAlert == 'gremioErrorBusca'" :msg="gremioErrorBusca" />
    <alert-error v-if="idAlert == 'gremioError'" :msg="gremioError" />
    <alert-success v-if="idAlert == 'gremioSuccess'" :msg="gremioSuccess" />

    <alert-error v-if="idAlert == 'sobreEscolaErrorBusca'" :msg="sobreEscolaErrorBusca" />
    <alert-error v-if="idAlert == 'sobreEscolaError'" :msg="sobreEscolaError" />
    <alert-success v-if="idAlert == 'sobreEscolaSuccess'" :msg="sobreEscolaSuccess" />

    <alert-error v-if="idAlert == 'calendarioErrorBusca'" :msg="calendarioErrorBusca" />
    <alert-error v-if="idAlert == 'calendarioError'" :msg="calendarioError" />
    <alert-success v-if="idAlert == 'calendarioSuccess'" :msg="calendarioSuccess" />

  
    <box-home />
    <side-bar />
  </div>
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxHome from "@/home/components/box/BoxHome.vue";
import AlertSuccess from "@/shared/alert/alertSuccess.vue";
import AlertError from "@/shared/alert/alertError.vue";

export default {
  components: {
    "side-bar": SideBar,
    "box-home": BoxHome,
    "alert-success": AlertSuccess,
    "alert-error": AlertError
  },
  created() {
    console.log(this.$route.query.idAlert);
    this.idAlert = this.$route.query.idAlert;
  },

  data: () => ({
    
    bullyingErrorBusca:
      "Não foi possível buscar as informações sobre o bullying",
    bullyingError: "Não foi possível Cadastrar as informações sobre o bullying",
    bullyingSuccess:
      "As informações sobre o bullying foram cadastradas com sucesso",

    gremioErrorBusca: "Não foi possível buscar as informações sobre o gremio",
    gremioError: "Não foi possível Cadastrar as informações sobre o gremio",
    gremioSuccess:
      "As informações sobre o gremio foram cadastradas com sucesso",

    sobreEscolaErrorBusca:
      "Não foi possível buscar as informações sobre a Escola",
    sobreEscolaError:
      "Não foi possível Cadastrar as informações sobre a Escola",
    sobreEscolaSuccess:
      "As informações sobre a Escola foram cadastradas com sucesso",

    calendarioErrorBusca:
      "Não foi possível buscar as informações sobre o Calendário",
    calendarioError:
      "Não foi possível Cadastrar as informações sobre o Calendário",
    calendarioSuccess:
      "As informações sobre o Calendário foram cadastradas com sucesso",

     

    type: "success"
  })
};
</script>
<style scoped>
</style>