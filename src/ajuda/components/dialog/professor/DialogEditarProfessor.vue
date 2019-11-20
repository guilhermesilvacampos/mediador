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
        <v-card-title class="headline grey lighten-2" primary-title>Ajuda - Editar Professor</v-card-title>

        <v-card-text>
          Nesta tela é possível realizar a edição de um Professor.
          <br />
          <br />Para editar um Professor é necessário que se preencha os campos:
          <br />
          <br />Nome e Descrição preenchendo as caixas de texto correspondentes.
          <br />
          <br />E Também inserir Disciplinas informando o Nome da Disciplina.
          <br />
          <br />Para adicionar uma ou mais Disciplinas é necessário informar Nome da Disciplina e clicar em
          <v-btn dark>Adicionar Disciplina</v-btn>
          <br />Caso queira remover a disciplina adicionada basta clicar em
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">delete</v-icon>
              </template>
              <span>Deletar Disciplina</span>
            </v-tooltip>
          </v-btn>
          <br />
          <br />Para salvar as alterações clique em
          <v-btn dark>publicar</v-btn>
          <br />
          <br />** Os campos Nome e Descrição são de preenchimento obrigatórios**
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