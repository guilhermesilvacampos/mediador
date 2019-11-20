<template>
  <div class="boxListagemTurma">
    <v-container mt-1 mr-5>
         <v-layout row>
      <v-flex md12 >
        <h1>Listagem de Turmas</h1>
       </v-flex>
      <v-flex md1 >
        <dialog-ajuda/>
      </v-flex>
      </v-layout>
      <v-flex>
        <router-link :to="{path:'/cadastrarTurma'}">
          <v-btn color="black" dark>Nova Turma</v-btn>
        </router-link>
      </v-flex>
      <v-layout row>
        <v-flex md12>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <p>Todas as turmas cadastradas durante o ano serão excluídas juntamente com seus respectivos alunos e materiais de sala de aula invertida no dia (25/12).</p>
              <v-form class="ml-4">
                <v-data-table :headers="headers" :items="turma" class="elevation-1" no-data-text="Não há nenhuma Turma Cadastrada" :loading="this.loading">
                  <template v-slot:items="props">
                    <tr>
                      <td>{{props.item.nome}}</td>
                      <td>{{props.item.chaveDeAcesso}}</td>
                      <td>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="editarItem(props.item)" v-on="on">edit</v-icon>
                            </template>
                            <span>Editar Turma</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="deleteItem(props.item.id)" v-on="on">delete</v-icon>
                            </template>
                            <span>Deletar Turma</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                small
                                @click="adicionarSalaDeAulaInvertida(props.item.id)"
                                v-on="on"
                              >add</v-icon>
                            </template>
                            <span>Adicionar Material de Sala de Aula Invertida</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                small
                                @click="listagemSalaDeAulaInvertida(props.item)"
                                v-on="on"
                              >list</v-icon>
                            </template>
                            <span>Listar Materiais de Sala De Aula Invertida</span>
                          </v-tooltip>
                        </v-btn>
                        <v-btn icon>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon small @click="listagemAlunos(props.item)" v-on="on">school</v-icon>
                            </template>
                            <span>Listar Alunos</span>
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
import DialogListagemTurma from "@/ajuda/components/dialog/turma/DialogListagemTurma.vue";

export default {

  components:{
    'dialog-ajuda': DialogListagemTurma
  },

  $_veeValidate: {
    validator: "new"
  },

  mounted() {
    
    this.$http.get("turmas/todas",{ headers: {'Authorization': this.$session.get("token")}}).then(
      resposta => {
        this.turma = resposta.body;
        this.loading = false;
      },
      err => {
        this.loading = false;
        alert("Não foi possível buscar as Turmas");
      }
    );
  },

  data: () => ({
    loading: true,
    turma: [],
    headers: [
      { text: "Nome da turma", value: "nome" },
      { text: "Chave de acesso", value: "chaveDeAcesso" },
      { text: "Ações", value: "acoes" }
    ]
  }),

  methods: {
    editarItem(turmaEditar) {
      this.$session.start();
      this.$session.set("turmaEditar", turmaEditar);
      window.location.href = "/cadastrarTurma";
    },

    deleteItem(id) {
      if (confirm("Tem certeza que deseja deletar ?")) {
        this.$http.delete("turmas/" + id,{ headers: {'Authorization': this.$session.get("token")}}).then(
          () => {
            window.location.href = "/listagemTurma/?idAlert=deletarSuccess";
          },
          err => {
            console.err(err);
            window.location.href = "/listagemTurma/?idAlert=deletarError";
          }
        );
      }
    },

    adicionarSalaDeAulaInvertida(idTurma) {
      window.location.href =
        "/cadastrarSalaDeAulaInvertida/?idTurma=" + idTurma;
    },

    listagemSalaDeAulaInvertida(turma) {
      this.$session.start();
      this.$session.set("turmaMaterial", turma);
      window.location.href = "/listagemSalaDeAulaInvertida/?idTurma=" + turma.id;
    },

    listagemAlunos(turma) {
      this.$session.start();
      this.$session.set("turmaAlunos", turma);
      window.location.href = "/listagemAlunosTurma/?idTurma=" + turma.id;

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