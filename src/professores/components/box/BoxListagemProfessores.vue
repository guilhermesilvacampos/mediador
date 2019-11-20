<template>
  <div class="boxListagemProfessores">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1>Listagem de Professores</h1>
        </v-flex>
        <v-flex md1>
          <dialog-ajuda />
        </v-flex>
      </v-layout>
      <v-flex>
        <router-link :to="{path:'/cadastrarProfessores'}">
          <v-btn color="black" dark>Novo Professor</v-btn>
        </router-link>
      </v-flex>
      <v-layout row>
        <v-flex md12>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-data-table
                  :headers="headers"
                  :items="professores"
                  class="elevation-1"
                  no-data-text="Não há nenhum Professor Cadastrado"
                  :loading="this.loading"
                >
                  <template v-slot:items="props">
                    <tr>
                      <td>{{props.item.nome}}</td>
                      <td>
                        <v-flex v-for="disciplina in props.item.disciplinas" :key="disciplina">
                          <tr>
                            <p>- {{disciplina}}</p>
                          </tr>
                        </v-flex>
                      </td>
                      <td>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="editarItem(props.item)" v-on="on">edit</v-icon>
                            </template>
                            <span>Editar Professor</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="deleteItem(props.item.id)" v-on="on">delete</v-icon>
                            </template>
                            <span>Deletar Professor</span>
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
import DialogListagemProfessor from "@/ajuda/components/dialog/professor/DialogListagemProfessor.vue";

export default {
  components: {
    "dialog-ajuda": DialogListagemProfessor
  },

  $_veeValidate: {
    validator: "new"
  },

  mounted() {
    

    this.$http.get("professores",{ headers: {'Authorization': this.$session.get("token")}}).then(
      resposta => {
        this.professores = resposta.body;
        this.loading = false;
      },
      err => {
        this.loading = false;
        alert("Não foi possível buscar os Professores");
      }
    );
  },

  data: () => ({
    loading: true,
    professores: [],
    headers: [
      { text: "Nome", value: "nome" },
      { text: "Disciplinas", value: "disciplina" },
      { text: "Ações", value: "acoes" }
    ]
  }),

  methods: {
    editarItem(professoresEditar) {
      this.$session.start();
      this.$session.set("professoresEditar", professoresEditar);
      window.location.href = "/cadastrarProfessores";
    },

    deleteItem(id) {
      if (confirm("Tem certeza que deseja deletar ?")) {
        this.$http.delete("professores/" + id,{ headers: {'Authorization': this.$session.get("token")}}).then(
          () => {
            window.location.href =
              "/listagemProfessores/?idAlert=deletarSuccess";
          },
          err => {
            console.err(err);
            window.location.href = "/listagemProfessores/?idAlert=deletarError";
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