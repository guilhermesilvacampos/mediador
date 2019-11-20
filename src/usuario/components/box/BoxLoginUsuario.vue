<template>
  <div class="loginUsuario">
    <v-container>
      <v-layout row wrap justify-center align-center class="layout-form">
        <v-flex text-xs-center md12>
          <v-avatar size="120">
            <img :src="logoClickEscola" alt="logo" />
          </v-avatar>
          <h1 class="label">Mediador Pedagógico</h1>
        </v-flex>
        <v-flex md6 class="black formulario-flex" elevation-5>
          <v-form md10>
            <v-layout row wrap justify-center align-center>
              <v-flex md8 mt-3>
                <h1 class="label">Nome de Usuário</h1>
                <v-text-field
                  class="input"
                  name="username"
                  type="text"
                  v-validate="'required'"
                  :error-messages="errors.collect('username')"
                  data-vv-name="username"
                  box
                  background-color="white"
                  v-model="usuario.username"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md8 mt-3>
                <h1 class="label">Senha</h1>
                <v-text-field
                  class="input"
                  name="senha"
                  type="password"
                  v-validate="'required'"
                  :error-messages="errors.collect('senha')"
                  data-vv-name="senha"
                  box
                  background-color="white"
                  v-model="usuario.senha"
                  required
                ></v-text-field>
                <v-layout row wrap justify-center>
                  
                  <v-btn @click="save()">Login</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Dictionary from "@/usuario/dictionary/Dictionary.js";
import Usuario from "@/usuario/domain/Usuario.js";
export default {
  $_veeValidate: {
    validator: "new"
  },

  mounted() {
    this.$validator.localize("pt", new Dictionary());
  },

  data: () => ({
    usuario: new Usuario(),
    logoClickEscola: require("@/assets/LogoClickEscola.png")
  }),

  methods: {
    save() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          alert("Preencha os Campos Corretamente!");
        } else {
          this.$http.post("login", this.usuario).then(
            response => {
              //console.log(response);

              this.salvaToken(response.headers.get("Authorization"));

              this.$router.push({
                name: "home"
              });
            },
            err => {
              console.error(err);

              alert("Nome de Usuário ou Senha estão incorretos");
            }
          );
        }
      });
    },

    salvaToken(token) {
      this.$session.start();
      this.$session.set("token", token);

      console.log(this.$session.get("token"));
    }
  }
};
</script>
<style scoped>
.formulario-flex {
  border-radius: 15px;
}

.loginUsuario {
  background-color: dimgray;
  height: 100vh;
}

.layout-form {
  margin-top: 8%;
}

.label {
  color: white;
}
.input {
  border-radius: 20px;
}
</style>