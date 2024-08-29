const CarroService = require('../services/CarroService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error: '', result:[]};

        let carros = await CarroService.buscarTodos();

        for(let i in carros){
            json.result.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo
            });
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = {error: '', result:{}};

        let codigo = req.params.codigo;
        let carro = await CarroService.buscarUm(codigo);

        if(carro){
            json.results = carro;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = {error: '', result:{}};

        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if(modelo && placa){
            let carroCodigo = await CarroService.inserir(modelo, placa);
            json.results = {
                codigo: carroCodigo,
                modelo,
                placa
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    }
}