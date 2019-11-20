<template>
  <div class="boxListagemTopico">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1>Listagem de Tópicos da Biblioteca</h1>
        </v-flex>
        <v-flex md1>
          <dialog-ajuda />
        </v-flex>
      </v-layout>
      <v-flex>
        <router-link :to="{path:'/cadastrarTopico'}">
          <v-btn color="black" dark>Novo Tópico</v-btn>
        </router-link>
      </v-flex>
      <v-layout row>
        <v-flex md10>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-data-table
                  :headers="headers"
                  :items="topico"
                  class="elevation-1"
                  no-data-text="Não há nenhum tópico Cadastrado"
                  :loading="this.loading"
                >
                  <template v-slot:items="props">
                    <tr>
                      <td>{{props.item.nome}}</td>
                      <td>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="editarItem(props.item)" v-on="on">edit</v-icon>
                            </template>
                            <span>Editar Tópico</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="deleteItem(props.item.id)" v-on="on">delete</v-icon>
                            </template>
                            <span>Deletar Tópico</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="adicionarItem(props.item.id)" v-on="on">add</v-icon>
                            </template>
                            <span>Adicionar Item Para o Tópico</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="listagemItem(props.item)" v-on="on">list</v-icon>
                            </template>
                            <span>Listar Itens do Tópico</span>
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
import DialogListagemTopico from "@/ajuda/components/dialog/biblioteca/topico/DialogListagemTopico.vue";

export default {
  components: {
    "dialog-ajuda": DialogListagemTopico
  },

  $_veeValidate: {
    validator: "new"
  },

  mounted() {
    this.$http.get("topicos/",{ headers: {'Authorization': this.$session.get("token")}}).then(
      resposta => {
        this.topico = resposta.body;
        this.loading = false;
      },
      err => {
        this.loading = false;
        alert("Não foi possível buscar os topicos");
      }
    );
  },

  data: () => ({
    loading: true,
    topico: [],
    headers: [
      { text: "Nome", value: "nome" },
      { text: "Ações", value: "acoes" }
    ]
  }),

  methods: {
    editarItem(topicoEditar) {
      this.$session.start();
      this.$session.set("topicoEditar", topicoEditar);
      window.location.href = "/cadastrarTopico";
    },

    deleteItem(id) {
      if (confirm("Tem certeza que deseja deletar ?")) {
        this.$http.delete("topicos/" + id,{ headers: {'Authorization': this.$session.get("token")}}).then(
          () => {
            window.location.href = "/listagemTopico/?idAlert=deletarSuccess";
          },
          err => {
            console.err(err);
            window.location.href = "/listagemTopico/?idAlert=deletarError";
          }
        );
      }
    },

    adicionarItem(idTopico) {
      window.location.href = "/cadastrarItem/?idTopico=" + idTopico;
    },

    listagemItem(topico) {
      this.$session.start();
      this.$session.set("topicoItem", topico);
      window.location.href = "/listagemItem/?idTopico=" + topico.id;
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