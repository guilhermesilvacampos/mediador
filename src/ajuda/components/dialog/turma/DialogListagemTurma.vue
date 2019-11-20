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
        <v-card-title class="headline grey lighten-2" primary-title>Ajuda - Listagem de Turmas</v-card-title>

        <v-card-text>
          Nesta tela é possível visualizar todos as Turmas cadastradas.
          <br />
          <br />Para Cadastrar uma nova Turma clique em:
          <v-btn dark>nova turma</v-btn>

          <br />
          <br />É Possível Editar uma Turma clicando em: Editar Turma ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">edit</v-icon>
              </template>
              <span>Editar Turma</span>
            </v-tooltip>
          </v-btn>
          <br />
          <br />É possível Deletar uma Turma clicando em: Deletar Turma ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">delete</v-icon>
              </template>
              <span>Deletar Turma</span>
            </v-tooltip>
          </v-btn>

          <br />
          <br />É possível Adicionar um Novo Material de Sala de Aula Invertida para uma Turma clicando em: Adicionar Material de Sala de Aula Invertida ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">add</v-icon>
              </template>
              <span>Adicionar Material de Sala de Aula Invertida</span>
            </v-tooltip>
          </v-btn>

          <br />
          <br />É possível Visualizar todos os Materiais de Sala de Aula Invertida cadastrados na Turma clicando em: Listar Materiais de Sala de Aula Invertida ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">list</v-icon>
              </template>
              <span>Listar Materiais de Sala de Aula Invertida</span>
            </v-tooltip>
          </v-btn>

          <br />
          <br />É possível Visualizar todos os Alunos que se cadastraram na Turma clicando em: Listar Alunos ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">school</v-icon>
              </template>
              <span>Listar Alunos</span>
            </v-tooltip>
          </v-btn>
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