<template>
  <div
    class="boxListagemAlunosTurma"
    :idTurma="this.turma_id== ''?pegaIdTurma(idTurma):this.turma_id = idTurma"
  >
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md6>
          <h1>Listagem de Alunos - Turma: {{this.turma.nome}}</h1>
        </v-flex>
        <v-spacer></v-spacer>
      <v-flex md5>
        <router-link :to="{name: 'listagemTurma'}">
          <v-btn color="black" dark>Voltar</v-btn>
        </router-link>
      </v-flex>
        <v-flex md1>
          <dialog-ajuda />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex md8>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-data-table
                  :headers="headers"
                  :items="aluno"
                  class="elevation-1"
                  no-data-text="Não há nenhum Aluno Cadastrado"
                  :loading="this.loading"
                >
                  <template v-slot:items="props">
                    <tr>
                      <td>{{props.item.nome}}</td>
                      <td>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="deleteItem(props.item.id)" v-on="on">delete</v-icon>
                            </template>
                            <span>Deletar Aluno</span>
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
import DialogListagemAluno from "@/ajuda/components/dialog/aluno/DialogListagemAluno.vue";

export default {
  components: {
    "dialog-ajuda": DialogListagemAluno
  },

  $_veeValidate: {
    validator: "new"
  },

  props: ["idTurma"],

  mounted() {
    this.turma = this.$session.get("turmaAlunos");
    //this.$session.remove("turmaAlunos");
  },

  data: () => ({
    loading: true,
    turma:'',
    turma_id: "",
    aluno: [],
    headers: [
      { text: "Nome do Aluno", value: "nome" },
      { text: "Ações", value: "acoes" }
    ]
  }),

  methods: {
    pegaIdTurma(idTurma) {
      this.turma_id = idTurma;
      this.$http.get("turmas/" + this.turma_id + "/alunos",{ headers: {'Authorization': this.$session.get("token")}}).then(
        resposta => {
          this.aluno = resposta.body;
          this.loading = false;
        },
        err => {
          this.loading = false;
          alert("Não foi possível buscar os alunos");
        }
      );
    },

    deleteItem(id) {
      if (confirm("Tem certeza que deseja deletar ?")) {
        this.$http.delete("alunos/" + id,{ headers: {'Authorization': this.$session.get("token")}}).then(
          () => {
            window.location.href =
              "/listagemAlunosTurma/?idAlert=deletarSuccess&idTurma=" +
              this.turma_id;
          },
          err => {
            console.err(err);
            window.location.href =
              "/listagemAlunosTurma/?idAlert=deletarError&idTurma=" +
              this.turma_id;
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