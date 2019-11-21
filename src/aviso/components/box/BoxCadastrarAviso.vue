<template>
  <div class="boxCadastrarAviso">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1 v-if="this.aviso.id">Editar Aviso</h1>
          <h1 v-else>Cadastrar Aviso</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.aviso.id" />
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
                    v-model="aviso.titulo"
                    required
                    lazy-validation
                  ></v-text-field>
                </v-flex>
                <v-flex md12 mt-3>
                  <h1 class="input">Descrição</h1>

                  <vue-editor
                    v-model="aviso.descricao"
                    :editor-toolbar="customToolbar"
                    name="descricao"
                    v-validate="'required'"
                    :error-messages="errors.collect('descricao')"
                    data-vv-name="descricao"
                    required
                    lazy-validation
                  ></vue-editor>

                  <h1 class="input mt-3">Nome do Link</h1>
                  <v-text-field name="nome" background-color="white" v-model="links.nome"></v-text-field>
                  <h1 class="input">Url do Link</h1>
                  <v-text-field name="link" background-color="white" v-model="links.link"></v-text-field>

                  <v-btn dark @click="adicionaCampo()">Adicionar Link</v-btn>

                  <v-flex class="grey mt-2">
                    <h2 class="ml-2">Links Adicionados</h2>
                    <v-flex v-for="(link,n) in this.aviso.links" :key="n">
                      <v-layout row>
                        <v-flex>
                          <h3 class="ml-3">Nome do Link : {{link.nome}}</h3>
                          <h3 class="ml-3">Url do Link : {{link.link}}</h3>
                        </v-flex>
                        <v-flex>
                          <v-btn icon>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-icon small @click="deletaLink(n)" v-on="on">delete</v-icon>
                              </template>
                              <span>Deletar Link</span>
                            </v-tooltip>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <br />
                    </v-flex>
                  </v-flex>

                  <v-layout row wrap justify-end>
                    <router-link :to="{path:'/listagemAviso'}">
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
            <img :height="'120px'" id="base64" :src="imagemUploadUrl" alt="imagem aviso"/>
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
import Aviso from "@/aviso/domain/Aviso.js";
import Dictionary from "@/aviso/dictionary/Dictionary.js";
import DialogCadastrarAviso from "@/ajuda/components/dialog/aviso/DialogCadastrarAviso.vue";
import DialogEditarAviso from "@/ajuda/components/dialog/aviso/DialogEditarAviso.vue";
export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarAviso,
    "dialog-ajuda-editar": DialogEditarAviso
  },

  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("pt", new Dictionary());
    console.log(this.links);
  },

  created() {
    if (this.$session.has("avisoEditar")) {
      this.aviso = this.$session.get("avisoEditar");
      this.$session.remove("avisoEditar");
      // $("#base64").attr("src", "data:image/png;base64," +this.aviso.imagem);
      this.imagemUploadUrl = "data:image/png;base64," + this.aviso.imagem;
    }
  },

  methods: {
    removeImagem() {
      this.aviso.imagem = "";
      document.getElementById("base64").src = "";
    },

    deletaLink(n) {
      this.aviso.links.splice(n, 1);
    },

    adicionaCampo() {
      if (this.links.nome != null && this.links.link != null) {
        this.aviso.links.push(this.links);
        this.links = {
          nome: null,
          link: null
        };
      }
      console.log(this.aviso);
    },

    onFileChange1(e) {
      // this.file = e.target.files[0];
      // this.url = URL.createObjectURL(this.file);

      var f = e.target.files[0]; // FileList object

      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function() {
        return function(d) {
          var binaryData = d.target.result;
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
      this.adicionaCampo();
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          //renderizando imagem
          this.aviso.imagem = document.getElementById("base64").src.substr(22);

          if (this.aviso.id) {
            this.$http
              .put("avisos/" + this.aviso.id, this.aviso, {
                headers: { Authorization: this.$session.get("token") }
              })
              .then(
                () => {
                  //  window.location.href = "/?idAlert=avisoSuccess";

                  this.$router.push({
                    name: "listagemAviso",
                    query: { idAlert: "cadastrarSuccess" }
                  });
                },
                err => {
                  console.error(err);
                  // window.location.href = "/?idAlert=avisoError";

                  this.$router.push({
                    name: "listagemAviso",
                    query: { idAlert: "cadastrarError" }
                  });
                }
              );
          } else {
            //console.log(this.$http.options.root);
            console.log(this.aviso);
            this.$http
              .post("avisos", this.aviso, {
                headers: { Authorization: this.$session.get("token") }
              })
              .then(
                () => {
                  //window.location.href = "/?idAlert=avisoSuccess";
                  this.$router.push({
                    name: "listagemAviso",
                    query: { idAlert: "cadastrarSuccess" }
                  });
                },
                () => {
                  //window.location.href = "/?idAlert=avisoError";
                  this.$router.push({
                    name: "listagemAviso",
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
    aviso: new Aviso(),
    imagemUploadUrl: require("@/assets/upload-icon.png"),
    avisoEditar: null,
    links: {
      nome: null,
      link: null
    },
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