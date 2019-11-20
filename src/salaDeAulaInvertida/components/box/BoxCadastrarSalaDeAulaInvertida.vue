<template>
  <div class="boxCadastrarSalaDeAulaInvertida" :idTurma="pegaId(idTurma)">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1 v-if="this.salaDeAulaInvertida.id">Editar Material de Sala de Aula Invertida</h1>
          <h1 v-else>Cadastrar Material de Sala de Aula Invertida</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.salaDeAulaInvertida.id" />
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
                    v-model="salaDeAulaInvertida.titulo"
                    required
                    lazy-validation
                  ></v-text-field>
                </v-flex>

                <v-flex md12 mt-3>
                  <h1 class="input">Descrição</h1>

                  <vue-editor
                    name="descricao"
                    v-validate="'required'"
                    :error-messages="errors.collect('descricao')"
                    data-vv-name="descricao"
                    required
                    lazy-validation
                    v-model="salaDeAulaInvertida.descricao"
                    :editor-toolbar="customToolbar"
                  ></vue-editor>

                  <h1 class="input mt-3">Nome do Link</h1>
                  <v-text-field name="nome" background-color="white" v-model="links.nome"></v-text-field>
                  <h1 class="input">Url do Link</h1>
                  <v-text-field name="link" background-color="white" v-model="links.link"></v-text-field>

                  <v-btn dark @click="adicionaCampo()">Adicionar Link</v-btn>

                  <v-flex class="grey mt-2">
                    <h2 class="ml-2">Links Adicionados</h2>
                    <v-flex v-for="(link,n) in this.salaDeAulaInvertida.links" :key="n">
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
                    <router-link
                      :to="{path:'/listagemSalaDeAulaInvertida', query: {idTurma:this.salaDeAulaInvertida.turmaId }}"
                    >
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
            <img :height="'120px'" id="base64" :src="imagemUploadUrl" alt="material imagem" />
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
import SalaDeAulaInvertida from "@/salaDeAulaInvertida/domain/SalaDeAulaInvertida.js";
import Dictionary from "@/salaDeAulaInvertida/dictionary/Dictionary.js";
import DialogCadastrarSalaDeAulaInvertida from "@/ajuda/components/dialog/salaDeAulaInvertida/DialogCadastrarSalaDeAulaInvertida.vue";
import DialogEditarSalaDeAulaInvertida from "@/ajuda/components/dialog/salaDeAulaInvertida/DialogEditarSalaDeAulaInvertida.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarSalaDeAulaInvertida,
    "dialog-ajuda-editar": DialogEditarSalaDeAulaInvertida
  },
  props: ["idTurma"],

  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("pt", new Dictionary());
    console.log(this.links);
  },

  created() {
    if (this.$session.has("salaDeAulaInvertidaEditar")) {
      console.log(this.$session.get("salaDeAulaInvertidaEditar"));
      this.salaDeAulaInvertida = this.$session.get("salaDeAulaInvertidaEditar");
      this.$session.remove("salaDeAulaInvertidaEditar");
      // $("#base64").attr("src", "data:image/png;base64," +this.salaDeAulaInvertida.imagem);
      this.imagemUploadUrl =
        "data:image/png;base64," + this.salaDeAulaInvertida.imagem;
    }
  },

  methods: {
    removeImagem() {
      this.salaDeAulaInvertida.imagem = "";
      document.getElementById("base64").src = "";
    },

    deletaLink(n) {
      this.salaDeAulaInvertida.links.splice(n, 1);
    },

    pegaId(idTurma) {
      if (idTurma) {
        this.salaDeAulaInvertida.turmaId = idTurma;
      }
    },
    adicionaCampo() {
      if (this.links.nome != null && this.links.link != null) {
        this.salaDeAulaInvertida.links.push(this.links);
        this.links = {
          nome: null,
          link: null
        };
      }
      console.log(this.salaDeAulaInvertida);
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
      console.log(this.salaDeAulaInvertida.descricao);
      this.adicionaCampo();
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          //renderizando imagem
          this.salaDeAulaInvertida.imagem = document
            .getElementById("base64")
            .src.substr(22);

          if (this.salaDeAulaInvertida.id) {
            this.$http
              .put(
                "aulas/" + this.salaDeAulaInvertida.id,
                this.salaDeAulaInvertida,
                { headers: { Authorization: this.$session.get("token") } }
              )
              .then(
                () => {
                  // window.location.href = "/?idAlert=salaDeAulaInvertidaSuccess";

                  this.$router.push({
                    name: "listagemSalaDeAulaInvertida",
                    query: {
                      idAlert: "cadastrarSuccess",
                      idTurma: this.salaDeAulaInvertida.turmaId
                    }
                  });
                },
                err => {
                  console.error(err);

                  // window.location.href = "/?idAlert=salaDeAulaInvertidaError";
                  this.$router.push({
                    name: "listagemSalaDeAulaInvertida",
                    query: {
                      idAlert: "cadastrarError",
                      idTurma: this.salaDeAulaInvertida.turmaId
                    }
                  });
                }
              );
          } else {
            //console.log(this.$http.options.root);
            console.log(this.salaDeAulaInvertida);
            this.$http
              .post("aulas", this.salaDeAulaInvertida, {
                headers: { Authorization: this.$session.get("token") }
              })
              .then(
                () => {
                  // window.location.href = "/?idAlert=salaDeAulaInvertidaSuccess";
                  this.$router.push({
                    name: "listagemSalaDeAulaInvertida",
                    query: {
                      idAlert: "cadastrarSuccess",
                      idTurma: this.salaDeAulaInvertida.turmaId
                    }
                  });
                },
                () => {
                  // window.location.href = "/?idAlert=salaDeAulaInvertidaError";
                  this.$router.push({
                    name: "listagemSalaDeAulaInvertida",
                    query: {
                      idAlert: "cadastrarError",
                      idTurma: this.salaDeAulaInvertida.turmaId
                    }
                  });
                }
              );
          }
        }
      });
    }
  },
  data: () => ({
    salaDeAulaInvertida: new SalaDeAulaInvertida(),
    imagemUploadUrl: require("@/assets/upload-icon.png"),
    salaDeAulaInvertidaEditar: null,
    numeroDeCampos: 1,
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