<template>
  <div class="boxCadastrarItem" :idTopico="pegaId(idTopico)">
    <v-container mt-1 mr-5>
      <v-layout row>
        <v-flex md12>
          <h1 v-if="this.item.id">Editar Item</h1>
          <h1 v-else>Cadastrar Item</h1>
        </v-flex>

        <v-flex md1>
          <dialog-ajuda-editar v-if="this.item.id" />
          <dialog-ajuda-cadastrar v-else />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md10>
          <v-layout d-flex mt-4>
            <v-flex md8 class="white lighten-2">
              <v-form class="ml-4">
                <v-flex md12 mt-3>
                  <h1 class="input">Nome do Item</h1>
                  <v-text-field
                    name="nome"
                    v-validate="'required|max:100'"
                    :error-messages="errors.collect('nome')"
                    data-vv-name="nome"
                    background-color="white"
                    v-model="item.nome"
                    required
                    lazy-validation
                  ></v-text-field>
                </v-flex>
                <v-flex md12 mt-3>
                  <h1 class="input">Link do Item</h1>
                  <v-text-field
                    name="linkDoItem"
                    type="text"
                    v-validate="'required'"
                    :error-messages="errors.collect('linkDoItem')"
                    data-vv-name="linkDoItem"
                    background-color="white"
                    box
                    v-model="item.linkDoItem"
                    required
                    lazy-validation
                  ></v-text-field>
                  <v-layout row wrap justify-end>
                    <router-link :to="{path:'/listagemItem', query:{ idTopico: this.item.idDoTopico }}">
                      <v-btn dark>Cancelar</v-btn>
                    </router-link>

                    <v-btn dark @click="submit()">Cadastrar</v-btn>
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
import Item from "@/biblioteca/item/domain/Item.js";
import Dictionary from "@/biblioteca/item/dictionary/Dictionary.js";
import DialogCadastrarItem from "@/ajuda/components/dialog/biblioteca/item/DialogCadastrarItem.vue";
import DialogEditarItem from "@/ajuda/components/dialog/biblioteca/item/DialogEditarItem.vue";

export default {
  components: {
    "dialog-ajuda-cadastrar": DialogCadastrarItem,
    "dialog-ajuda-editar": DialogEditarItem
  },
  props: ["idTopico"],

  $_veeValidate: {
    validator: "new"
  },
  mounted() {
    this.$validator.localize("pt", new Dictionary());
  },

  created() {
    if (this.$session.has("itemEditar")) {
      console.log(this.$session.get("itemEditar"));
      this.item = this.$session.get("itemEditar");
      this.$session.remove("itemEditar");
    }
  },

  methods: {
    pegaId(idTopico) {
      if (idTopico) {
        this.item.idDoTopico = idTopico;
      }
    },

    submit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os campos corretamente!");
        } else {
          if (this.item.id) {
            this.$http.put("itens/" + this.item.id, this.item,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
                

               // window.location.href = "/?idAlert=itemSuccess";

                 this.$router.push({
                name: "listagemItem",
                query: { idAlert: "cadastrarSuccess", idTopico: this.item.idDoTopico }
              });
              },
              err => {
                console.error(err);
                
               // window.location.href = "/?idAlert=itemError";
                this.$router.push({
                name: "listagemItem",
                query: { idAlert: "cadastrarError" , idTopico: this.item.idDoTopico}
              });
              }
            );
          } else {
            //console.log(this.$http.options.root);
            console.log(this.item);
            this.$http.post("itens", this.item,{ headers: {'Authorization': this.$session.get("token")}}).then(
              () => {
                //window.location.href = "/?idAlert=itemSuccess";
                this.$router.push({
                name: "listagemItem",
                query: { idAlert: "cadastrarSuccess", idTopico: this.item.idDoTopico }
              });
              },
              err => {
               // window.location.href = "/?idAlert=itemError";
                 this.$router.push({
                name: "listagemItem",
                query: { idAlert: "cadastrarError" , idTopico: this.item.idDoTopico}
              });
              }
            );
          }
        }
      });
    }
  },
  data: () => ({
    item: new Item(),
    itemEditar: null
  })
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>