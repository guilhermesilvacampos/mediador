<template>
  <div class="boxCadastrarProfessores">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1 v-if="this.professores.id">Editar Professor</h1>
          <h1 v-else>Cadastrar Professor</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.professores.id" />
          <dialog-ajuda-cadastrar v-else />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md8>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-flex md12 mt-3>
                  <h1 class="input">Nome</h1>
                  <v-text-field
                    name="nome"
                    v-validate="'required|max:300'"
                    :error-messages="errors.collect('nome')"
                    data-vv-name="nome"
                    background-color="white"
                    v-model="professores.nome"
                    required
                    lazy-validation
                  ></v-text-field>
                </v-flex>
                <v-flex md12 mt-3>
                  <h1 class="input">Descrição</h1>

                  <vue-editor
                    v-model="professores.descricao"
                    :editor-toolbar="customToolbar"
                    name="descricao"
                    v-validate="'required'"
                    :error-messages="errors.collect('descricao')"
                    data-vv-name="descricao"
                    required
                    lazy-validation
                  ></vue-editor>

                  <h1 class="input">Nome da Disciplina</h1>
                  <v-text-field name="nome" background-color="white" v-model="disciplina"></v-text-field>

                  <v-btn dark @click="adicionaCampo()">Adicionar Disciplina</v-btn>

                  <v-flex class="grey">
                    <h2 class="ml-2">Disciplinas Adicionadas</h2>
                    <v-flex v-for="(disciplina, n) in this.professores.disciplinas" :key="n">
                      <v-layout row>
                        <v-flex>
                          <h3 class="ml-3">Disciplina : {{disciplina}}</h3>
                        </v-flex>
                        <v-flex>
                          <v-btn icon>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-icon small @click="deletaDisciplina(n)" v-on="on">delete</v-icon>
                              </template>
                              <span>Deletar Disciplina</span>
                            </v-tooltip>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <br />
                    </v-flex>
                  </v-flex>

                  <v-layout row wrap justify-end>
                    <router-link :to="{path:'/listagemProfessores'}">
                      <v-btn dark>Cancelar</v-btn>
                    </router-link>

                    <v-btn dark @click="submit()">Publicar</v-btn>
                  </v-layout>
                </v-flex>
              </v-form>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Professores from "@/professores/domain/Professores.js";
import Dictionary from "@/professores/dictionary/Dictionary.js";
import DialogCadastrarProfessor from "@/ajuda/components/dialog/professor/DialogCadastrarProfessor.vue";
import DialogEditarProfessor from "@/ajuda/components/dialog/professor/DialogEditarProfessor.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarProfessor,
    "dialog-ajuda-editar": DialogEditarProfessor
  },

  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("pt", new Dictionary());
  },

  created() {
    if (this.$session.has("professoresEditar")) {
      console.log(this.$session.get("professoresEditar"));
      this.professores = this.$session.get("professoresEditar");
      this.$session.remove("professoresEditar");
    }
  },

  methods: {
    deletaDisciplina(n) {
      this.professores.disciplinas.splice(n, 1);
    },

    adicionaCampo() {
      if (this.disciplina != null) {
        this.professores.disciplinas.push(this.disciplina);
        this.disciplina = null;
      }
      console.log(this.professores);
    },

    submit() {
      this.adicionaCampo();
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          this.$http.post("professores", this.professores,{ headers: {'Authorization': this.$session.get("token")}}).then(
            () => {
              

              // window.location.href = "/?idAlert=professoresSuccess";

              this.$router.push({
                name: "listagemProfessores",
                query: { idAlert: "cadastrarSuccess" }
              });
            },
            err => {
              console.error(err);
              
              // window.location.href = "/?idAlert=professoresError";
              /*  this.$router.push({
                name: "listagemProfessores",
                query: { idAlert: "cadastrarError" }
              });*/
            }
          );
        }
      });
    }
  },
  data: () => ({
    professores: new Professores(),
    imagemUploadUrl: require("@/assets/upload-icon.png"),
    professoresEditar: null,
    disciplina: null,
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "" }, { align: "justify" }, { align: "right" }]
    ]
  })
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>