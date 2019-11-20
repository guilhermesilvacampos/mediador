<template>
  <div class="boxCadastrarTurma">
    <v-container mt-1 mr-5>
      <v-layout row>
      <v-flex md12>
          <h1 v-if="this.turma.id">Editar Turma</h1>
          <h1 v-else>Cadastrar Turma</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.turma.id" />
          <dialog-ajuda-cadastrar v-else />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-layout d-flex mt-4>
          <v-flex md8 class="white lighten-2">
            <v-form class="ml-4">
              <v-flex md12 mt-3>
                <h1 class="input">Nome da Turma</h1>
                <v-text-field
                  name="nome"
                  v-validate="'required|max:100'"
                  :error-messages="errors.collect('nome')"
                  data-vv-name="nome"
                  background-color="white"
                  v-model="turma.nome"
                  required
                  lazy-validation
                ></v-text-field>
              </v-flex>
              <v-flex md12 mt-3>
                <h1 class="input">Chave de Acesso</h1>
                <v-text-field
                  name="chaveDeAcesso"
                  type="text"
                  v-validate="'required'"
                  :error-messages="errors.collect('chaveDeAcesso')"
                  data-vv-name="chaveDeAcesso"
                  background-color="white"
                  box
                  v-model="turma.chaveDeAcesso"
                  required
                  lazy-validation
                ></v-text-field>
                <v-layout row wrap justify-end>
                  <router-link :to="{path:'/listagemTurma'}">
                    <v-btn dark>Cancelar</v-btn>
                  </router-link>

                  <v-btn dark @click="submit()">Cadastrar</v-btn>
                </v-layout>
              </v-flex>
            </v-form>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Turma from "@/turma/domain/Turma.js";
import Dictionary from "@/turma/dictionary/Dictionary.js";
import DialogCadastrarTurma from "@/ajuda/components/dialog/turma/DialogCadastrarTurma.vue";
import DialogEditarTurma from "@/ajuda/components/dialog/turma/DialogEditarTurma.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarTurma,
    "dialog-ajuda-editar": DialogEditarTurma
  },

  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("pt", new Dictionary());

    if (this.$session.has("turmaEditar")) {
      console.log(this.$session.get("turmaEditar"));
      this.turma = this.$session.get("turmaEditar");
      this.$session.remove("turmaEditar");
    }
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          //console.log(this.$http.options.root);

          if (this.turma.id) {
            this.$http.put("turmas/" + this.turma.id, this.turma,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
               // window.location.href = "/?idAlert=turmaSuccess";
               this.$router.push({
                name: "listagemTurma",
                query: { idAlert: "cadastrarSuccess" }
              }); 
              },
              () => {
               // window.location.href = "/?idAlert=turmaError";
                this.$router.push({
                name: "listagemTurma",
                query: { idAlert: "cadastrarError" }
              }); 
              }
            );
          } else {
            this.$http.post("turmas", this.turma,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
               // window.location.href = "/?idAlert=turmaSuccess";
                this.$router.push({
                name: "listagemTurma",
                query: { idAlert: "cadastrarSuccess" }
              }); 
              },
              () => {
               // window.location.href = "/?idAlert=turmaError";
                this.$router.push({
                name: "listagemTurma",
                query: { idAlert: "cadastrarError" }
              }); 
              }
            );
          }
        }
      });
    }
  },
  data: () => ({
    turma: new Turma(),
    turmaEditar: null
  })
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>