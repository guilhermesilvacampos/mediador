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
        <v-card-title class="headline grey lighten-2" primary-title>Ajuda - Listagem de Tópicos da Biblioteca</v-card-title>

        <v-card-text>
          Nesta tela é possível visualizar todos os Tópicos da Biblioteca cadastrados.
          <br />
          <br />Para Cadastrar um novo Tópico clique em:
          <v-btn dark>novo tópico</v-btn>

          <br />
          <br />É Possível Editar um Tópico clicando em: Editar Tópico ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">edit</v-icon>
              </template>
              <span>Editar Tópico</span>
            </v-tooltip>
          </v-btn>
          <br />
          <br />É possível Deletar um tópico clicando em: Deletar Tópico ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">delete</v-icon>
              </template>
              <span>Deletar Tópico</span>
            </v-tooltip>
          </v-btn>

          <br />
          <br />É possível Adicionar um Novo Item para um Tópico da Biblioteca clicando em: Adicionar Item Para o Tópico ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">add</v-icon>
              </template>
              <span>Adicionar Item Para o Tópico</span>
            </v-tooltip>
          </v-btn>

          <br />
          <br />É possível Visualizar todos Itens cadastrados no Tópico da Biblioteca clicando em: Listar Itens do Tópico ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">list</v-icon>
              </template>
              <span>Listar Itens do Tópico</span>
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