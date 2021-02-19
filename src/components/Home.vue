<template>
  <div>
    <h1>Cadastro De Pessoa</h1>
    <div>
      <span>We are using Node.js <span id="node-version"></span>,</span>
      <span>Chromium <span id="chrome-version"></span>,</span>
      <span>and Electron <span id="electron-version"></span>.</span>
    </div>

    <br>

    <form v-on:submit.prevent="cadastrar(nome, idade)">
      <label>
        <span>Nome:</span>
        <input v-model.trim="nome" type="text">
      </label>
      <label>
        <span>Idade:</span>
        <input v-model.number="idade" type="number">
      </label>
      <input type="submit" value="Cadastrar">
    </form>

    <br>
    <h2>Pessoas cadastradas</h2>
    
    <ul>
      <li v-for="pessoa in pessoas" :key="pessoa.PES_ID">
        {{ pessoa }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  
  data: () => ({
    nome: '',
    idade: null,
    pessoas: []
  }),

  created: function() {
    this.loadPessoas()
  },

  methods: {
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
