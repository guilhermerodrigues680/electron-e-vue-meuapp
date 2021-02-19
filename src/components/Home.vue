<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/register.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Cadastro De Pessoa
        </h1>

        <p class="subheading font-weight-regular">
          Aplicação com banco de dados embutido SQLite. <span class="font-weight-bold">'db/local.db'</span>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-form v-on:submit.prevent="cadastrar(nome, idade)">
          <v-row justify="center">
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model.trim="nome"
                label="Nome"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model.number="idade"
                label="Idade"
                required
                type="number"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-btn
                color="success"
                type="submit"
                block
                large
              >Cadastrar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Pessoas cadastradas
        </h2>

        <div>
          <div v-for="pessoa in reversedPessoas" :key="pessoa.PES_ID">
            <p class="ma-0">{{ pessoa }}</p>
          </div>
        </div>
      </v-col>

       <v-col class="mb-4">
        <p class="subheading font-weight-regular">
          Nós estamos usando Node.js {{processVersions.node}},
          Chromium {{processVersions.chrome}},
          e Electron {{processVersions.electron}}.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  
  data: () => ({
    nome: '',
    idade: null,
    pessoas: [],
    processVersions: {
      chrome: '',
      node: '',
      electron: ''
    }
  }),

  computed: {
    reversedPessoas: function () {
      return this.pessoas.reverse()
    }
  },

  created: function() {
    this.loadProcessVersions()
    this.loadPessoas()
  },

  methods: {
    loadProcessVersions() {
      const mainRes = ipcRenderer.sendSync('get-process-versions', null)
      console.debug(mainRes)
      const processVersions = mainRes.data.processVersions
      this.processVersions.chrome = processVersions.chrome
      this.processVersions.node = processVersions.node
      this.processVersions.electron = processVersions.electron
    },
    loadPessoas() {
      const mainRes = ipcRenderer.sendSync('get-pessoas-cadastradas', null)
      console.debug(mainRes)
      this.pessoas = mainRes.data.pessoas
    },
    cadastrar(nome, idade) {
      console.log(nome, idade)
      const mainRes = ipcRenderer.sendSync('submit-form-cadastro-pessoa', { nome, idade })
      console.debug(mainRes)
      this.loadPessoas()
    }
  }
}
</script>
