<template>
  <div class="boxListagemNoticia">
    <v-container mt-1 mr-5>
       <v-layout row>
      <v-flex md12 >
        <h1>Listagem de Notícias</h1>
       </v-flex>
      <v-flex md1 >
        <dialog-ajuda/>
      </v-flex>
      </v-layout>
      <v-flex>
        <router-link :to="{path:'/cadastrarNoticia'}">
          <v-btn color="black" dark>Nova Noticia</v-btn>
        </router-link>
      </v-flex>
      <v-layout row>
        <v-flex md8>
          <v-layout d-flex mt-4>
            <v-flex md12 class="white lighten-2">
              <v-form class="ml-4">
                <v-data-table :headers="headers" :items="noticia" class="elevation-1" no-data-text="Não há nenhuma Notícia Cadastrada" :loading="this.loading">
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
                            <span>Editar Notícia</span>
                          </v-tooltip>
                        </v-btn>

                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="deleteItem(props.item.id)" v-on="on">delete</v-icon>
                            </template>
                            <span>Deletar Notícia</span>
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
import DialogListagemNoticia from "@/ajuda/components/dialog/noticia/DialogListagemNoticia.vue";

export default {

  components:{
    'dialog-ajuda': DialogListagemNoticia
  },

  $_veeValidate: {
    validator: "new"
  },

  mounted() {
    this.$http.get("noticias/todas",{ headers: {'Authorization': this.$session.get("token")}}).then(
      resposta => {
        this.noticia = resposta.body;
        this.loading = false;
      },
      err => {
        this.loading = false;
        alert("Não foi possível buscar as Notícias");
      }
    );
  },

  data: () => ({
    noticia: [],
    loading: true,
    headers: [
      { text: "Titulo", value: "titulo" },
      { text: "Data", value: "dataDeCriacao" },
      { text: "Ações", value: "acoes" }
    ]
  }),

  methods: {
    editarItem(noticiaEditar) {
      this.$session.start();
      this.$session.set("noticiaEditar", noticiaEditar);
      window.location.href = "/cadastrarNoticia";
    },

    deleteItem(id) {
      if (confirm("Tem certeza que deseja deletar ?")) {
        this.$http.delete("noticias/" + id,{ headers: {'Authorization': this.$session.get("token")}}).then(
          () => {
            window.location.href = "/listagemNoticia/?idAlert=deletarSuccess";
          },
          err => {
            console.err(err);
            window.location.href = "/listagemNoticia/?idAlert=deletarError";
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