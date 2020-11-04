const express = require('express');

const app = express();

/**
    Metodos http
    get: buscar info do backend
    post: criar uma info no backend
    put/patch: editar info backend / patch seria para alguma alteração de info específica
    delete: deletar info backend
 */

app.get('/projects', (request, response) => { 
    return response.json([
        'Projeto 1',
        'Projeto 2',
    ]);
 });

app.post('/projects', (req, res) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.put('/projects/:id', (req, res) => {

    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3',
    ]);
});

app.delete('/projects/:id', (req, res) => {

    return response.json([
        'Projeto 2',
        'Projeto 3',
    ]);
});

app.listen(3333, () => {
    console.log('backend started!😂')
});