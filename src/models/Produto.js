class Produto {
    constructor(db) {
        this._db = db;
    }

    cadastrar(dados) {
        let sql = "INSERT INTO produtos(nome, preco, imagem) VALUES (?, ?, ?)";

        return new Promise((resolver, reject) => {
            let values = [
                dados.nome,
                dados.preco,
                dados.imagem
            ];

            this._db.query(sql, values, function (error, results) {
                if (error) {
                    console.log(error);
                    return reject({message: "Não foi possível cadastrar o produto"});
                }

                return resolver({message: "Produto cadastrado com sucesso"});
            });
        });
    }

    listar() {
        let sql = `SELECT * FROM produtos`;

        return new Promise((resolver, reject) => {
            this._db.query(sql, function(error, results) {
                if (error) {
                    return reject("Não foi possível listar os produtos");
                }

                return resolver(results);
            });
        });
    }

    buscar(id) {
        let sql = `SELECT * FROM produtos WHERE id = ?`;

        return new Promise((resolver, reject) => {
            this._db.query(sql, [id], function(error, results) {
                if (error) {
                    console.log("Error ao buscar produto");
                    return reject({message: "Error ao buscar produto"});
                }

                return resolver(results);
            });
        });
    }

    atualizar(id, dados) {
        let sql = `UPDATE produtos SET nome = ?, preco = ?, imagem = ? WHERE id = ?`;
        let values = [
            dados.nome,
            dados.preco,
            dados.imagem,
            id
        ];

        return new Promise((resolver, reject) => {
            this._db.query(sql, values, function (error, results) {
                if (error) {
                    console.log("Erro ao atualizar dados do produto");
                    return reject({message: "Erro ao atualizar dados do produto"});
                }

                return resolver({message: "Produto atualizado com sucesso"});
            });
        });
    }

    deletar(id) {
        let sql = `DELETE FROM produtos WHERE id = ?`;
        
        return new Promise((resolver, reject) => {
            this._db.query(sql, [id], function(error, results) {
                if (error) {
                    console.log("Erro ao deletar produto");
                    return reject({message: "Erro ao deletar produto"});
                }

                return resolver({message: "Produto excluído com sucesso"});
            });
        })
    }
}

module.exports = Produto;