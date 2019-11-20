<template>
  <div class="boxHome">
    <v-container>
      <v-layout justify-center>
        <v-flex md9 text-xs-center>
          <v-layout row wrap justify-center>
            <v-flex :key="icon.src" v-for="icon in icons">
              <router-link :to="{path:icon.path}" :hidden="icon.hidden">
                <v-card width="190px" class="elevation-0">
                <v-card-title >
                  <v-btn class="elevation-7 btn-icon">
                    <imagem
                      :height="'150px'"
                      :width="'170px'"
                      style="border-radius:10px;"
                      :url="icon.src"
                    />
                  </v-btn>
                </v-card-title>
                
                <v-card-text  >
                  <v-flex text-xs-center>

                    <h3 class="text-icon">{{icon.text}}</h3>
                  </v-flex>
                </v-card-text>
                </v-card>
              </router-link>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Imagem from "@/shared/image/img.vue";
export default {
  components: {
    imagem: Imagem
  },

  created() {
    this.$session.remove("itemEditar");
    this.$session.remove("topicoEditar");
    this.$session.remove("aavisoEditar");
    this.$session.remove("noticiaEditar");
    this.$session.remove("itemEditar");
    this.$session.remove("turmaMaterial");
    this.$session.remove("turmaEditar");
    this.$session.remove("turmaAlunos");
    this.$session.remove("professoresEditar");
    this.$session.remove("salaDeAulaInvertidaEditar");

  },
  data: () => ({
    icons: [
      {
        src: require("@/assets/avisos_icon.jpg"),
        text: "Gerenciar Avisos",
        path: "listagemAviso",
        hidden: false
      },
      {
        src: require("@/assets/sai.jpg"),
        text: "Gerenciar Turmas e Sala de Aula Invertida",
        path: "listagemTurma",
        hidden: false
      },
      {
        src: require("@/assets/noticias_icon.jpg"),
        text: " Gerenciar Noticias",
        path: "listagemNoticia",
        hidden: false
      },
      {
        src: require("@/assets/calendario_icon.jpg"),
        text: "Gerenciar Calendário",
        path: "cadastrarEditarCalendario",
        hidden: false
      },
      {
        src: require("@/assets/bullying_icon.png"),
        text: "Gerenciar Formulário de Bullying",
        path: "cadastrarEditarBullying",
        hidden: false
      },
      {
        src: require("@/assets/gremio.png"),
        text: "Gerenciar Grêmio",
        path: "cadastrarEditarGremio",
        hidden: false
      },
      {
        src: require("@/assets/biblioteca.jpeg"),
        text: "Gerenciar Biblioteca",
        path: "listagemTopico",
        hidden: false
      },
      {
        src: require("@/assets/sobreEscola.jpg"),
        text: "Gerenciar Sobre a Escola",
        path: "cadastrarEditarSobreEscola",
        hidden: false
      },
      {
        src: require("@/assets/professores.jpg"),
        text: "Gerenciar Professores",
        path: "listagemProfessores",
        hidden: false
      },
      
    ]
  })
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.text-icon {
  color: black;
}
.btn-icon {
  height: 140px;
  width: 140px;
  border-radius: 10px;
}
</style>