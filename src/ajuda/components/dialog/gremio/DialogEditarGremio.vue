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
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Ajuda - Editar Grêmio</v-card-title>

        <v-card-text>
          Nesta tela é possível realizar a edição de um Grêmio.
          <br />
          <br />Para Editar um Grêmio é necessário que se preencha os campos:
          <br />
          <br />Link do Grêmio e Descrição preenchendo as caixas de texto correspondentes.
          <br />
          <br />É possível inserir uma imagem clicando em :
          <v-btn dark>Inserir Imagem</v-btn>
          <br />
          <br />Para salvar as alterações clique em
          <v-btn dark>publicar</v-btn>
          <br />
          <br />** O campo Link do Grêmio é de preenchimento obrigatório**
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