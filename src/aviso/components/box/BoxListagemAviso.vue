<template>
  <div class="boxListagemAviso">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1>Listagem de Avisos</h1>
        </v-flex>
        <v-flex md1>
          <dialog-ajuda />
        </v-flex>
      </v-layout>
      <v-flex>
        <router-link :to="{path:'/cadastrarAviso'}">
          <v-btn color="black" dark>Novo Aviso</v-btn>
        </router-link>
      </v-flex>
      <v-layout row>
        <v-flex md10>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-data-table
                  :headers="headers"
                  :items="aviso"
                  class="elevation-1"
                  no-data-text="Não há nenhum Aviso Cadastrado"
                  :loading="this.loading"
                >
                  <template v-slot:items="props">
                    <tr>
                      <td>{{props.item.titulo}}</td>
                      <td>{{props.item.dataDeCriacao}}</td>
                      <td>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="editarItem(props.item)" v-on="on">edit</v-icon>
                            </template>
                            <span>Editar Aviso</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="deleteItem(props.item.id)" v-on="on">delete</v-icon>
                            </template>
                            <span>Deletar Aviso</span>
                          </v-tooltip>
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-form>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template> 
<script>
import DialogListagemAviso from "@/ajuda/components/dialog/aviso/DialogListagemAviso.vue";

export default {
  components: {
    "dialog-ajuda": DialogListagemAviso
  },

  $_veeValidate: {
    validator: "new"
  },

  mounted() {
    this.$http.get("avisos/todos",{ headers: {'Authorization': this.$session.get("token")}}).then(
      resposta => {
        this.aviso = resposta.body;
        this.loading = false;
      },
      err => {
        this.loading = false;

        alert("Não foi possível buscar os avisos");
      }
    );
  },

  data: () => ({
    loading: true,
    aviso: [],
    headers: [
      { text: "Titulo", value: "titulo" },
      { text: "Data", value: "dataDeCriacao" },
      { text: "Ações", value: "acoes" }
    ]
  }),

  methods: {
    editarItem(avisoEditar) {
      this.$session.start();
      this.$session.set("avisoEditar", avisoEditar);
     // window.location.href = "/cadastrarAviso";
     this.$router.push({
                name: "cadastrarAviso",
                
              });
    },

    deleteItem(id) {
      if (confirm("Tem certeza que deseja deletar ?")) {
        this.$http.delete("avisos/" + id,{ headers: {'Authorization': this.$session.get("token")}}).then(
          () => {
            window.location.href = "/listagemAviso/?idAlert=deletarSuccess";
           /*  this.$router.push({
                name: "listagemAviso",
                query: { idAviso: "deletarSuccess" }
              }); 
              */
          },
          err => {
            console.err(err);
            window.location.href = "/listagemAviso/?idAlert=deletarError";
            /*
          this.$router.push({
                name: "listagemAviso",
                query: { idAviso: "deletarError" }
              }); 
              */
          }
        );
      }
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>