<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <a v-on="on">
          Ajuda
          <v-icon>fa fa-question</v-icon>
        </a>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Ajuda - Editar Item</v-card-title>

         <v-card-text>
          Nesta tela é possível realizar a edição de um Item.
          <br />
          <br />Para editar um Item é necessário que se preencha os campos:
          <br />
          <br />Nome do Item e Link do Item
          preenchendo as caixas de texto correspondentes e clicar em
          <v-btn dark>cadastrar</v-btn>
          <br />
          <br />** Os campos Nome do Item e Link do Item são de preenchimento obrigatório**
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>
<style scoped>
a {
  color: black;
}
</style>