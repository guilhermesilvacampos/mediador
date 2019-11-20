<template>
  <div class="boxListagemItem" :idTopico="pegaIdTopico(idTopico)">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1>Listagem de Itens - Tópico: {{this.topico.nome}}</h1>
        </v-flex>
        <v-flex md1>
          <dialog-ajuda />
        </v-flex>
      </v-layout>
      <v-layout row>
      <v-flex>
        <router-link :to="{path:'/cadastrarItem/?idTopico='+this.idTopico}">
          <v-btn color="black" dark>Novo Item</v-btn>
        </router-link>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex>
        <router-link :to="{name: 'listagemTopico'}">
          <v-btn color="black" dark>Voltar</v-btn>
        </router-link>
      </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md12>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-data-table
                  :headers="headers"
                  :items="item"
                  class="elevation-1"
                  no-data-text="Não há nenhum Item Cadastrado"
                  :loading="this.loading"
                >
                  <template v-slot:items="props">
                    <tr>
                      <td>{{props.item.nome}}</td>
                      <td>{{props.item.linkDoItem}}</td>
                      <td>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="editarItem(props.item)" v-on="on">edit</v-icon>
                            </template>
                            <span>Editar Item</span>
                          </v-tooltip>
                        </v-btn>

                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="deleteItem(props.item.id)" v-on="on">delete</v-icon>
                            </template>
                            <span>Deletar Item</span>
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
import DialogListagemItem from "@/ajuda/components/dialog/biblioteca/item/DialogListagemItem.vue";

export default {
  components: {
    "dialog-ajuda": DialogListagemItem
  },

  $_veeValidate: {
    validator: "new"
  },

  props: ["idTopico"],

  data: () => ({
    loading: true,
    item: [],
    topico: '',
    topico_id: "",
    headers: [
      { text: "Nome", value: "nome" },
      { text: "Link", value: "linkDoItem" },
      { text: "Ações", value: "acoes" }
    ]
  }),

  mounted() {
    this.topico = this.$session.get("topicoItem");
   //this.$session.remove("topicoItem");
  },

  methods: {
    pegaIdTopico(idTopico) {
      this.topico_id = idTopico;
      this.$http.get("itens/todos/?idDoTopico=" + this.topico_id,{ headers: {'Authorization': this.$session.get("token")}}).then(
        resposta => {
          this.item = resposta.body;
          this.loading = false;
        },
        err => {
          this.loading = false;
          alert("Não foi possível buscar os itens");
        }
      );
    },

    editarItem(itemEditar) {
      this.$session.start();
      this.$session.set("itemEditar", itemEditar);
      window.location.href = "/cadastrarItem";
    },

    deleteItem(id) {
      if (confirm("Tem certeza que deseja deletar ?")) {
        this.$http.delete("itens/" + id,{ headers: {'Authorization': this.$session.get("token")}}).then(
          () => {
            window.location.href =
              "/listagemItem/?idAlert=deletarSuccess&idTopico=" + this.topico_id;
          },
          err => {
            console.err(err);
            window.location.href =
              "/listagemItem/?idAlert=deletarError&idTopico=" + this.topico_id;
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