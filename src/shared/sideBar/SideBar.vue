<template>
  <div id="app">
    <v-app light>
      <v-navigation-drawer
        width="200px"
        fixed
        permanent
        v-model="drawer"
        app
        dark
        class="lighten-1"
      >
        <v-flex mt-5 pt-5>
          <h1 class="gerenciamento ml-3">Gerenciamento</h1>
        </v-flex>
        <v-list >
          <v-list-item-group v-model="item">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-layout row wrap>
                <v-flex mt-3 ml-2 mr-2>
                  <router-link :to="{name:item.path}">
                    <v-layout row>
                      <v-flex md1>
                        <v-list-item-icon>
                          <imagem :height="'auto'" :width="'20px'" :url="item.img" />
                        </v-list-item-icon>
                      </v-flex>
                      <v-flex md11 class="ml-3">
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                      </v-flex>
                    </v-layout>
                  </router-link>
                </v-flex>
              </v-layout>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark class="lighten-2" fixed app :clipped-left="clipped">
        <imagem :height="'120%'" :width="'7%'" :url="logoClickEscola" />
        <router-link :to="{name:'home'}">
          <v-toolbar-title>ClickEscola</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-layout row wrap justify-end>
          <v-flex md2>
            <p class="subtitle-1">Admin</p>
          </v-flex>
          <v-flex md1>
            
              <a @click="logout()">Sair</a>
            
          </v-flex>
        </v-layout>
      </v-toolbar>
    </v-app>
  </div>
</template>
<script>
import Imagem from "@/shared/image/img.vue";
export default {
  components: {
    imagem: Imagem
  },

  methods: {
      logout(){
        this.$session.destroy();
         this.$router.push({
                name: "login",
              });
      }
  },

  data: () => ({
    abs: "../../../assets/logo.png",
    drawer: true,
    clipped: true,
    logoClickEscola: require("@/assets/LogoClickEscola.png"),
    item: 1,

    items: [
      { text: "Home", img: require("@/assets/Home.png"), path: "home" },
      {
        text: "Gerenciar Avisos",
        img: require("@/assets/Avisos.png"),
        path: "listagemAviso"
      },
      {
        text: "Gerenciar Turmas e Sala de Aula Invertida",
        img: require("@/assets/gerenciamento-de-SAI.jpg"),
        path: "listagemTurma"
      },
      {
        text: "Gerenciar Notícias",
        img: require("@/assets/noticia.png"),
        path: "listagemNoticia"
      },
      {
        text: "Gerenciar Calendário",
        img: require("@/assets/calendario.jpg"),
        path: "cadastrarEditarCalendario"
      },
      {
        text: "Gerenciar Formulário de Bullying",
        img: require("@/assets/formulario-bullyin.png"),
        path: "cadastrarEditarBullying"
      },
      {
        text: "Gerenciar Gremio",
        img: require("@/assets/gremio-icon.png"),
        path: "cadastrarEditarGremio"
      },
      {
        text: "Gerenciar Biblioteca",
        img: require("@/assets/biblioteca.png"),
        path: "listagemTopico"
      },
      {
        text: "Gerenciar Sobre a Escola",
        img: require("@/assets/sobre-escola.jpg"),
        path: "cadastrarEditarSobreEscola"
      },
      {
        text: "Gerenciar Professores",
        img: require("@/assets/professores.png"),
        path: "listagemProfessores"
      },
      
    ]
  })
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}

.gerenciamento {
  color: white;
}
</style>