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
        <v-card-title class="headline grey lighten-2" primary-title>Ajuda - Editar Notícia</v-card-title>

        <v-card-text>
          Nesta tela é possível realizar a edição de uma Notícia.
          <br />
          <br />Para editar uma Notícia é necessário que se preencha os campos:
          <br />
          <br />Título, Descrição e URL do site onde está situada a Notícia
          preenchendo as caixas de texto correspondentes e clicar em <v-btn dark> publicar </v-btn>
          <br />
          <br />** Os campos Título e Descrição e Link são de preenchimento obrigatórios**
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