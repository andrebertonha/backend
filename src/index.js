const express = require('express');

const app = express();

app.get('/', (request, response) => { 
    return response.json({
        message: "hello go stack 12"
    });
 });

app.listen(3333, () => {
    console.log('backend started!😂')
});