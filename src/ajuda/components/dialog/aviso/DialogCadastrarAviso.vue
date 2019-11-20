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
        <v-card-title class="headline grey lighten-2" primary-title>Ajuda - Cadastrar Aviso</v-card-title>

        <v-card-text>
          Nesta tela é possível realizar o cadastro de um novo Aviso.
          <br />
          <br />Para cadastrar um aviso é necessário que se preencha os campos:
          <br />
          <br />Título e Descrição preenchendo as caixas de texto correspondentes.
          <br />
          <br />É possível inserir uma imagem clicando em :
          <v-btn dark>Inserir Imagem</v-btn>

          <br />
          <br />E Também inserir links informando o Nome do Link e a URL do site.
          <br />
          <br />Para adicionar um ou mais links é necessário informar Nome do Link e a URL do site e clicar em
          <v-btn dark>Adicionar Link</v-btn>
          <br />Caso queira remover o link adicionado basta clicar em
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">delete</v-icon>
              </template>
              <span>Deletar Link</span>
            </v-tooltip>
          </v-btn>
          <br />
          <br />Para salvar as alterações clique em
          <v-btn dark>publicar</v-btn>
          <br />
          <br />** Os campos Título e Descrição são de preenchimento obrigatórios**
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