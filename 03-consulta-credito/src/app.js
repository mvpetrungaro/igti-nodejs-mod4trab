require('dotenv').config()

const express = require('express')

const app = express()

const { check, validationResult } = require('express-validator')

const consultaCliente = require('./consulta-cliente')

const cliente = require('./cliente')

app.use(express.json())

app.get('/', async (_req, res, _next) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!')
})

app.post(
  '/consulta-credito',

  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
  check('parcelas', 'O número de parcelas deve ser um número inteiro').notEmpty().isInt(),

  async (req, res, next) => {

    const erros = validationResult(req)

    if (!erros.isEmpty()) {
      res.status(400)
      next(erros.array())
    }

    next()
  },

  async (req, res, next) => {
    
    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas,
      )

      res.status(201).json(valores)
    } catch (erro) {
      
      res.status(405)
      next(erro.message)
    }
  }
)

app.get('/cliente', async (_req, res, next) => {

  try {

    const clientes = await cliente.getClientes()

    res.status(200).json(clientes)
  } catch (erro) {

    res.status(405)
    next(erro.message)
  }
})

app.use(async (err, _req, res, _next) => {

  console.log(err)

  if (!res.statusCode && !res.status) {
    res.status(500)
  }

  res.json({ error: err })
})

module.exports = app
