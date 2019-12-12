module.exports = (dados) => {
    let response = {
        status: true,
        error: {}
    };

    if (dados.nome == '') {
        response.status = false;
        response.error.nome = 'Campo nome não foi preenchido';
    }

    if (dados.preco == '') {
        response.status = false;
        response.error.preco = 'Campo preço não foi preenchido';
    }

    if (dados.imagem == '') {
        response.status = false;
        response.error.imagem = 'Campo imagem não foi preenchido';
    }

    return response;
}