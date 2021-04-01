//SERVIDOR E ROTAS
const {req, res} = require('express');
const express = require('express');
const petshop = require('./petshop');

const app = express();
app.use(express.json());

app.get('/pets', (req, res) => {
    return res.send(petshop.listarPets());
});

app.post('/pets', (req, res) => {

    const { nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos} = req.body;

    const adiciona = {
    nome,
    tipo,
    idade,
    raca,
    peso,
    tutor,
    contato,
    vacinado,
    servicos
};
    petshop.adicionarPet(adiciona);
    //petshop.atualizarBanco();
    return res.json(adiciona);
});

app.get('/pets/:nome', (req, res) => {
    let encontrarPet = petshop.buscarPet('Tag');
    if(!encontrarPet){
            return response.status(400).json({error: 'Animal não foi encontrado'});
    }
    return res.send(encontrarPet);
});

app.listen(3000, () => {
    console.log('Servidor rodando!');
});