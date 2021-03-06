const { ipcMain } = require('electron')
import sqliteDb from './db/sqlite-db'

function init() {
  ipcMain.on('submit-form-cadastro-pessoa', function (event, data) {
    // Access form data here
    console.log(data)
    
    // TODO: Adicionar validacao
    const pessoa = data
    sqliteDb.insertPessoa(pessoa)
    event.returnValue = { data: 'data', error: null };
  });

  ipcMain.on('get-pessoas-cadastradas', async function (event, ...args) {
    // Access form data here
    console.log(args)
    
    // TODO: Adicionar validacao
    //const pessoa = data
    const pessoas = await sqliteDb.selectAllPessoa()
    event.returnValue = { data: { pessoas }, error: null };
  });

  ipcMain.on('get-process-versions', function (event, ..._) {
    const processVersions = {
      chrome: process.versions.chrome,
      node: process.versions.node,
      electron: process.versions.electron
    }

    event.returnValue = { data: { processVersions }, error: null }
  });

}

export {
  init
}
