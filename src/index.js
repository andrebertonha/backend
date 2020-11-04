const express = require('express');
const { uuid } = require('uuidv4')

const app = express();

// add function to routes have to be before the routes
app.use(express.json());

/**
    Metodos http
    get: buscar info do backend
    post: criar uma info no backend
    put/patch: editar info backend / patch seria para alguma alteração de info específica
    delete: deletar info backend
 */

 /**
    tipos de parametros

    query params: filtros e paginação (principalmente)
    route params: identificar recursos na hora de atualizar ou deletar 
    request body: Conteudo na hora de criar ou editar um recurso
  */

const projects = [];

app.get('/projects', (request, response) => { 
    const { title } = request.query;
    
    const results = title
       ? projects.filter(project => project.title.includes(title)) 
       : projects; 

    return response.json(results);
 });

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);    

    return res.json(project);
});

app.put('/projects/:id', (req, res) => {

    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id === id );

    if (projectIndex < 0) {
        return res.status(400).json({ error: "projeto nao encontrado" })
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return res.json(project);
});

app.delete('/projects/:id', (req, res) => {

    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id );

    if (projectIndex < 0) {
        return res.status(400).json({ error: "projeto nao encontrado" })
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send();
});

app.listen(3333, () => {
    console.log('backend started!😂')
});