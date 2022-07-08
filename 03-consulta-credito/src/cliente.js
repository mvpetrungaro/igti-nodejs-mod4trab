const db = require('./db')

const getClientes = async () => {
  return await db.cliente.findAll()
}

module.exports = {
  getClientes
}
