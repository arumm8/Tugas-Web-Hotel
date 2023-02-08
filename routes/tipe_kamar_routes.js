const express = require('express')

const app = express()

app.use(express.json())

const tipeKamarController = require ("../controller/tipe_kamar_controller")

app.get("/getAllTipeKamar", tipeKamarController.getAllTipeKamar)

app.post("/addTipeKamar", tipeKamarController.addTipeKamar)

app.post("/findTipeKamar", tipeKamarController.findTipeKamar)

app.put("/updateTipeKamar/:id", tipeKamarController.updateTipeKamar)

app.delete("/deleteTipeKamar/:id", tipeKamarController.deleteTipeKamar)

module.exports = app