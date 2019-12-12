const mysql = require("../database");
const produtos = require('./factory-products');

const queryLoja = `CREATE TABLE IF NOT EXISTS produtos(
    id bigint auto_increment primary key,
    nome varchar(255) NOT NULL,
    preco double NOT NULL,
    imagem text NOT NULL
)`;

const insertProdutos = `INSERT INTO produtos(nome, preco, imagem) VALUES (?, ?, ?)`;

function createTableProdutos() {
    mysql.query(queryLoja, (error, results) => {
        if (error) {
            return console.log("Erro ao criar a tabela de produtos");
        }

        console.log("Tabela de produtos foi criado com sucesso");
    });
}

function addProdutos() {
    produtos.forEach((produto) => {

        mysql.query(insertProdutos, produto, function(error, results) {
            if (error) {
                return console.log("Erro ao inserir dados na tabela de produtos");
            }

            console.log(`${produto[0]} foi adicionado`);
        });
    });
}

mysql.connect();
createTableProdutos();
addProdutos();
mysql.end();
