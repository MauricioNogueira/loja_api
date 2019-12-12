const express = require('express');
const api = express();
const mysql = require("./database");
const Produto = require('./src/models/Produto');
const CreateProductRequest = require('./src/request/create-products');

api.get('/', function (req, res) {
    res.send("Funcionando");
});

api.get('/produtos', function (req, res) {
    let produto = new Produto(mysql);

    produto.listar().then((result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json([]);
    });
});

api.post('/cadastrar', function (req, res) {
    let produto = new Produto(mysql);
    let response = CreateProductRequest(req.body);

    if (response.status) {
        produto.cadastrar(req.body)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    } else {
        res.status(500).json(response);
    }
});

api.get('/produto/:id', function (req, res) {
    let produto = new Produto(mysql);

    produto.buscar(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

api.put('/atualizar/:id', function (req, res) {
    let produto = new Produto(mysql);
    let response = CreateProductRequest(req.body);

    if (response.status) {
        produto.atualizar(req.params.id, req.body)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    } else {
        res.status(500).json(response);
    }
});

api.delete('/deletar/:id', function (req, res) {
    let produto = new Produto(mysql);

    produto.deletar(req.params.id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

module.exports = (app) => {
    app.use('/api', api);
}