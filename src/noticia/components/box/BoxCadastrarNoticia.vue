<template>
  <div class="boxCadastrarNoticia">
    <v-container mt-1 mr-5>
      <v-layout row>
      <v-flex md12>
          <h1 v-if="this.noticia.id">Editar Notícia</h1>
          <h1 v-else>Cadastrar Notícia</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.noticia.id" />
          <dialog-ajuda-cadastrar v-else />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md8>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-flex md12 mt-3>
                  <h1 class="input">Titulo</h1>
                  <v-text-field
                    name="titulo"
                    v-validate="'required|max:300'"
                    :error-messages="errors.collect('titulo')"
                    data-vv-name="titulo"
                    background-color="white"
                    v-model="noticia.titulo"
                    required
                    lazy-validation
                  ></v-text-field>
                </v-flex>
                <v-flex md12 mt-3>
                  <h1 class="input">Descrição</h1>
                  <vue-editor
                    v-model="noticia.descricao"
                    :editor-toolbar="customToolbar"
                    name="descricao"
                    v-validate="'required'"
                    :error-messages="errors.collect('descricao')"
                    data-vv-name="descricao"
                    required
                    lazy-validation
                  ></vue-editor>
                </v-flex>
                <v-flex md12 mt-3>
                  <h1 class="input">Link</h1>
                  <v-text-field
                    name="links"
                    v-validate="'required'"
                    :error-messages="errors.collect('links')"
                    data-vv-name="links"
                    background-color="white"
                    v-model="noticia.links"
                    required
                    lazy-validation
                  ></v-text-field>

                  

                  <v-layout row wrap justify-end>
                    <router-link :to="{path:'/listagemNoticia'}">
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
import Noticia from "@/noticia/domain/Noticia.js";
import Dictionary from "@/noticia/dictionary/Dictionary.js";
import DialogCadastrarNoticia from "@/ajuda/components/dialog/noticia/DialogCadastrarNoticia.vue";
import DialogEditarNoticia from "@/ajuda/components/dialog/noticia/DialogEditarNoticia.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarNoticia,
    "dialog-ajuda-editar": DialogEditarNoticia
  },

  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("pt", new Dictionary());
    console.log(this.links);
  },

  created() {
    if (this.$session.has("noticiaEditar")) {
      console.log(this.$session.get("noticiaEditar"));
      this.noticia = this.$session.get("noticiaEditar");
      this.$session.remove("noticiaEditar");
    }
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          if (this.noticia.id) {
            this.$http.put("noticias/" + this.noticia.id, this.noticia,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
                

              //  window.location.href = "/?idAlert=noticiaSuccess";

                this.$router.push({
                name: "listagemNoticia",
                query: { idAlert: "cadastrarSuccess" }
              });
              },
              err => {
                console.error(err);
                
               // window.location.href = "/?idAlert=noticiaError";

                 this.$router.push({
                name: "listagemNoticia",
                query: { idAlert: "cadastrarError" }
              });

              }
            );
          } else {
            //console.log(this.$http.options.root);
            console.log(this.noticia);
            this.$http.post("noticias", this.noticia,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
              //  window.location.href = "/?idAlert=noticiaSuccess";

                 this.$router.push({
                name: "listagemNoticia",
                query: { idAlert: "cadastrarSuccess" }
              });
              },
              () => {
              //  window.location.href = "/?idAlert=noticiaError";

                 this.$router.push({
                name: "listagemNoticia",
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
    noticia: new Noticia(),
    noticiaEditar: null,
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