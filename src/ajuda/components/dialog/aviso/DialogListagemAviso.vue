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
        <v-card-title class="headline grey lighten-2" primary-title>Ajuda - Listagem de Avisos</v-card-title>

        <v-card-text>
          Nesta tela é possível visualizar todos os Avisos cadastrados.
          <br />
          <br />Para Cadastrar um novo Aviso clique em:
          <v-btn dark>novo aviso</v-btn>

          <br />
          <br />É Possível Editar um Aviso clicando em: Editar Aviso ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">edit</v-icon>
              </template>
              <span>Editar Aviso</span>
            </v-tooltip>
          </v-btn>
          <br />
          <br />É possível Deletar um Aviso clicando em: Deletar Aviso ->
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">delete</v-icon>
              </template>
              <span>Deletar Aviso</span>
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