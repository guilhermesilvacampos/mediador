<template>
  <div class="boxCadastrarEditarBullying">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1 v-if="this.bullying.id">Editar Formulário de Bullying</h1>
          <h1 v-else>Cadastrar Formulário de Bullying</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.bullying.id" />
          <dialog-ajuda-cadastrar v-else />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md8>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-flex md12 mt-3>
                  <h1 class="input">Link do Formulário</h1>
                  <v-text-field
                    name="linkDoFormulario"
                    v-validate="'required'"
                    :error-messages="errors.collect('linkDoFormulario')"
                    data-vv-name="linkDoFormulario"
                    background-color="white"
                    v-model="bullying.linkDoFormulario"
                    required
                    lazy-validation
                  ></v-text-field>
                  
                </v-flex>
                <v-flex md12 mt-3>
                  <h1 class="input">Descrição</h1>

                  <vue-editor v-model="bullying.descricao" :editor-toolbar="customToolbar"></vue-editor>

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
            <img :height="'120px'" id="base64" :src="imagemUploadUrl" alt="bullying imagem"/>
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
import Bullying from "@/bullying/domain/Bullying.js";
import Dictionary from "@/bullying/dictionary/Dictionary.js";
import DialogCadastrarBullying from "@/ajuda/components/dialog/bullying/DialogCadastrarBullying.vue";
import DialogEditarBullying from "@/ajuda/components/dialog/bullying/DialogEditarBullying.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarBullying,
    "dialog-ajuda-editar": DialogEditarBullying
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
this.bullying.imagem = '';
document.getElementById("base64").src = '';
    },

    init: function() {
      this.loadData();
    },

    loadData() {
      this.$http.get("bullying",{ headers: {'Authorization': this.$session.get("token")}}).then(
        resposta => {
          

          this.bullying = resposta.body;
          document.getElementById("base64").src =
            "data:image/png;base64," + resposta.body.imagem;

            console.log(this.bullying);
        },
        err => {
          console.error(err);
          this.cadastrar = true;
          //window.location.href = "/?idAlert=bullyingErrorBusca";
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
        return function(e) {
          var binaryData = e.target.result;
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
          console.log(this.cadastrar);
          //renderizando imagem
          this.bullying.imagem = document
            .getElementById("base64")
            .src.substr(22);
          console.log(this.bullying);
            this.$http.put("bullying" , this.bullying,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
               // window.location.href = "/?idAlert=bullyingSuccess";

                 this.$router.push({
                name: "home",
                query: { idAlert: "bullyingSuccess" }
              }); 
              },
              err => {
                console.error(err);
                // window.location.href = "/?idAlert=bullyingError";
                this.$router.push({ name: "home", query: { idAlert: "bullyingError" } })
              }
            );
        }
      });
    }
  },
  data: () => ({
    cadastrar: false,
    bullying: new Bullying(),
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