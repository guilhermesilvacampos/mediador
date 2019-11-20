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
        <v-card-title class="headline grey lighten-2" primary-title>Ajuda - Cadastrar Turma</v-card-title>

        <v-card-text>
          Nesta tela é possível realizar o cadastro de uma nova Turma.
          <br />
          <br />Para cadastrar uma Turma é necessário que se preencha os campos:
          <br />
          <br />Nome e Chave de Acesso
          preenchendo as caixas de texto correspondentes e clicar em
          <v-btn dark>publicar</v-btn>
          <br />
          <br />
A Chave De Acesso será utilizada pelos alunos no aplicativo móvel para que possam ter acesso aos materiais de sala de aula invertida adicionados posteriormente a esta turma.
          <br />
          <br />
**A Chave de Acesso deve ser Diferente das utilizadas em outras turmas cadastradas**
          <br />
          <br />** Os campos Nome e Chave de Acesso são de preenchimento obrigatórios**
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