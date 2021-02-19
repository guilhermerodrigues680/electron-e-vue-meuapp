<template>
  <div>
    <h1>Cadastro De Pessoa</h1>

    <form v-on:submit.prevent="cadastrar(nome, idade)">
      <label class="display-block">
        <span>Nome:</span>
        <input v-model.trim="nome" type="text">
      </label>
      <label class="display-block">
        <span>Idade:</span>
        <input v-model.number="idade" type="number">
      </label>
      <span class="display-block">
        <input type="submit" value="Cadastrar">
      </span>
    </form>

    <h2>Pessoas cadastradas</h2>
    
    <ul>
      <li v-for="pessoa in reversedPessoas" :key="pessoa.PES_ID">
        {{ pessoa }}
      </li>
    </ul>

    <div>
      Nós estamos usando Node.js {{processVersions.node}},
      Chromium {{processVersions.chrome}},
      e Electron {{processVersions.electron}}.
    </div>
  </div>
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

<style scoped>
.display-block {
  color: red;
  display: block;
}
</style>
