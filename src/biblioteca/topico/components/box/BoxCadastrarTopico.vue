<template>
  <div class="boxCadastrarTopico">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1 v-if="this.topico.id">Editar Tópico da Biblioteca</h1>
          <h1 v-else>Cadastrar Tópico da Biblioteca</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.topico.id" />
          <dialog-ajuda-cadastrar v-else />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-layout d-flex mt-4>
          <v-flex md8 class="white lighten-2">
            <v-form class="ml-4">
              <v-flex md12 mt-3>
                <h1 class="input">Nome do Tópico</h1>
                <v-text-field
                  name="nome"
                  v-validate="'required|max:100'"
                  :error-messages="errors.collect('nome')"
                  data-vv-name="nome"
                  background-color="white"
                  v-model="topico.nome"
                  required
                  lazy-validation
                ></v-text-field>
              </v-flex>
              <v-flex md12 mt-3>
                <v-layout row wrap justify-end>
                  <router-link :to="{path:'/listagemTopico'}">
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
import Topico from "@/biblioteca/topico/domain/Topico.js";
import Dictionary from "@/biblioteca/topico/dictionary/Dictionary.js";
import DialogCadastrarTopico from "@/ajuda/components/dialog/biblioteca/topico/DialogCadastrarTopico.vue";
import DialogEditarTopico from "@/ajuda/components/dialog/biblioteca/topico/DialogEditarTopico.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarTopico,
    "dialog-ajuda-editar": DialogEditarTopico
  },

  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("pt", new Dictionary());

    if (this.$session.has("topicoEditar")) {
      console.log(this.$session.get("topicoEditar"));
      this.topico = this.$session.get("topicoEditar");
      this.$session.remove("topicoEditar");
    }
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          //console.log(this.$http.options.root);

          if (this.topico.id) {
            this.$http.put("topicos/" + this.topico.id, this.topico,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
               // window.location.href = "/?idAlert=topicoSuccess";
                this.$router.push({
                name: "listagemTopico",
                query: { idAlert: "cadastrarSuccess" }
              });
              },
              () => {
               // window.location.href = "/?idAlert=topicoError";
               this.$router.push({
                name: "listagemTopico",
                query: { idAlert: "cadastrarError" }
              });
              }
            );
          } else {
            this.$http.post("topicos", this.topico,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
               // window.location.href = "/?idAlert=topicoSuccess";
                this.$router.push({
                name: "listagemTopico",
                query: { idAlert: "cadastrarSuccess" }
              });
              },
              () => {
               // window.location.href = "/?idAlert=topicoError";
               this.$router.push({
                name: "listagemTopico",
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
    topico: new Topico(),
    topicoEditar: null
  })
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>