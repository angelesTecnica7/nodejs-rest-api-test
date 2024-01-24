import express from 'express' //requiere express, esto es igual a const express = require('express)

import employeesRouters from './routers/employees.routes.js'

import indexRouters from './routers/index.routes.js'

const app = express() //ejecuta la funcion express

app.use(express.json())
app.use('/api', employeesRouters)
app.use(indexRouters)

app.use((req, res, next) =>{
    res.status(404).json({
        massage: 'Esta pagina no Existe'
    })
})

export default app