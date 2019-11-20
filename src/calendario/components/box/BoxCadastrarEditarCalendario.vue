<template>
  <div class="boxCadastrarEditarCalendario">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1 v-if="this.calendario.id">Editar Calendário</h1>
          <h1 v-else>Cadastrar Calendário</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.calendario.id" />
          <dialog-ajuda-cadastrar v-else />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md8>
          <v-layout d-flex mt-4>
            <v-flex md10 class="white lighten-2">
              <v-form class="ml-4">
                <v-flex md12 mt-3>
                  <h1 class="input">Link</h1>
                  <v-text-field
                    name="linkDoCalendario"
                    v-validate="'required'"
                    :error-messages="errors.collect('linkDoCalendario')"
                    data-vv-name="linkDoCalendario"
                    background-color="white"
                    v-model="calendario.linkDoCalendario"
                    required
                    lazy-validation
                  ></v-text-field>
                </v-flex>
                <v-flex md12 mt-3>
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
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Calendario from "@/calendario/domain/Calendario.js";
import Dictionary from "@/calendario/dictionary/Dictionary.js";
import DialogCadastrarCalendario from "@/ajuda/components/dialog/calendario/DialogCadastrarCalendario.vue";
import DialogEditarCalendario from "@/ajuda/components/dialog/calendario/DialogEditarCalendario.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarCalendario,
    "dialog-ajuda-editar": DialogEditarCalendario
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
    init: function() {
      this.loadData();
    },

    loadData() {
      this.$http.get("calendario",{ headers: {'Authorization': this.$session.get("token")}}).then(
        resposta => {
         

          this.calendario = resposta.body;
        },
        err => {
          console.error(err);
          this.cadastrar = true;
          // window.location.href = "/?idAlert=calendarioErrorBusca";
        }
      );
    },

    submit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          this.$http.put("calendario", this.calendario,{ headers: {'Authorization': this.$session.get("token")}}).then(
            () => {
            //  window.location.href = "/?idAlert=calendarioSuccess";

               this.$router.push({
                name: "home",
                query: { idAlert: "calendarioSuccess" }
              }); 
            },
            err => {
              console.error(err);
             // window.location.href = "/?idAlert=calendarioError";
              this.$router.push({ name: "home", query: { idAlert: "calendarioError" } })
            }
          );
        }
      });
    }
  },
  data: () => ({
    cadastrar: false,
    calendario: new Calendario(),
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