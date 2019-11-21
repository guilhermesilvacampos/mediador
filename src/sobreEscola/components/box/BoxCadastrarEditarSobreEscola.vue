<template>
  <div class="boxCadastrarEditarSobreEscola">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1 v-if="this.sobreEscola.id">Editar Sobre a Escola</h1>
          <h1 v-else>Cadastrar Sobre a Escola</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.sobreEscola.id" />
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
                    v-validate="'required'"
                    :error-messages="errors.collect('nome')"
                    data-vv-name="nome"
                    background-color="white"
                    v-model="sobreEscola.nome"
                    required
                    lazy-validation
                  ></v-text-field>
                </v-flex>
                <v-flex md12 mt-3>
                  <h1 class="input">Descrição</h1>

                  <vue-editor
                    v-model="sobreEscola.descricao"
                    name="descricao"
                    v-validate="'required'"
                    :error-messages="errors.collect('descricao')"
                    data-vv-name="descricao"
                    background-color="white"
                    required
                    lazy-validation
                    :editor-toolbar="customToolbar"
                  ></vue-editor>

                  <v-layout row wrap justify-end>
                    <router-link :to="{name:'home'}">
                      <v-btn dark>Cancelar</v-btn>
                    </router-link>

                    <v-btn dark @click="submit()">Publicar</v-btn>
                  </v-layout>
                </v-flex>
              </v-form>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-layout column align-center justify-center class="grey lighten-1" md4>
          <v-flex md2>
            <img :height="'120px'" id="base64" :src="imagemUploadUrl" alt="escola imagem"/>
          </v-flex>

          <v-btn color="black" dark>
            <v-flex md1>
              <input
                class="md1"
                style="opacity:0; position:absolute; float:left;"
                @change="onFileChange1"
                :type="'file'"
              />
            </v-flex>Inserir Imagem
          </v-btn>
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small @click="removeImagem()" v-on="on">delete</v-icon>
              </template>
              <span>Remover Imagem</span>
            </v-tooltip>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import SobreEscola from "@/sobreEscola/domain/SobreEscola.js";
import Dictionary from "@/sobreEscola/dictionary/Dictionary.js";
import DialogCadastrarSobreEscola from "@/ajuda/components/dialog/sobreEscola/DialogCadastrarSobreEscola.vue";
import DialogEditarSobreEscola from "@/ajuda/components/dialog/sobreEscola/DialogEditarSobreEscola.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarSobreEscola,
    "dialog-ajuda-editar": DialogEditarSobreEscola
  },

  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("pt", new Dictionary());
  },

  created: function() {
    this.init();
  },

  methods: {
    removeImagem(){
this.sobreEscola.imagem = '';
document.getElementById("base64").src = '';
    },

    init: function() {
      this.loadData();
    },

    loadData() {
      this.$http.get("escola",{ headers: {'Authorization': this.$session.get("token")}}).then(
        resposta => {
          this.sobreEscola = resposta.body;

          document.getElementById("base64").src =
            "data:image/png;base64," + resposta.body.imagem;
        },
        err => {
          console.error(err);
          this.cadastrar = true;
          // window.location.href = "/?idAlert=sobreEscolaErrorBusca";
        }
      );
    },

    onFileChange1(e) {
      // this.file = e.target.files[0];
      // this.url = URL.createObjectURL(this.file);

      var f = e.target.files[0]; // FileList object

      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function() {
        return function(f) {
          var binaryData = f.target.result;
          //Converting Binary Data to base 64
          var base64String = window.btoa(binaryData);
          //showing file converted to base64
          // $("#base64").attr("src", "data:image/png;base64," + base64String);
          document.getElementById("base64").src =
            "data:image/png;base64," + base64String;
        };
      })();
      // Read in the image file as a data URL.
      reader.readAsBinaryString(f);
    },

    submit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          //renderizando imagem
          this.sobreEscola.imagem = document
            .getElementById("base64")
            .src.substr(22);

          this.$http.put("escola", this.sobreEscola,{ headers: {'Authorization': this.$session.get("token")}}).then(
            () => {
             // window.location.href = "/?idAlert=sobreEscolaSuccess";

               this.$router.push({
                name: "home",
                query: { idAlert: "sobreEscolaSuccess" }
              }); 
            },
            err => {
              console.error(err);
             // window.location.href = "/?idAlert=sobreEscolaError";
              this.$router.push({ name: "home", query: { idAlert: "sobreEscolaError" } })
            }
          );
        }
      });
    }
  },
  data: () => ({
    cadastrar: false,
    sobreEscola: new SobreEscola(),
    imagemUploadUrl: require("@/assets/upload-icon.png"),
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