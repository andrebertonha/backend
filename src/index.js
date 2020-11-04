const express = require('express');
const { uuid, isUuid } = require('uuidv4')

const app = express();

// add function to routes have to be before the routes
app.use(express.json());

/** CONCEITOS */

/**
    Metodos HTTP
    get: buscar info do backend
    post: criar uma info no backend
    put/patch: editar info backend / patch seria para alguma alteração de info específica
    delete: deletar info backend
 */

 /**
    tipos de Parametros

    query params: filtros e paginação (principalmente)
    route params: identificar recursos na hora de atualizar ou deletar 
    request body: Conteudo na hora de criar ou editar um recurso
  */

/**
    Middleware: 
    - interceptador de requisições: interromper totalmente a requisição
    - alterar dados da requisição
 */

const projects = [];

// middleware
function logRequests(req, res, next) {
    const { method, url } = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
}

function validateProjectId(req, res, next) {
    const { id } = req.params;

    if(!isUuid(id)) {
        return res.status(400).json({ error: 'Invalid id project' });
    }

    return next();
}

app.use(logRequests);

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

app.put('/projects/:id', validateProjectId, (req, res) => {

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

app.delete('/projects/:id', validateProjectId, (req, res) => {

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