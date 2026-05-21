const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{

    const url = req.url;
    const method = req.method;

    if(req.url === "/"){
        res.setHeader('Content-Type', 'text/html');
        
        res.end(`
            <form method="POST" action="/message">
                <label>Name:</label>
                <input type='text' name='username'>
                <button type="submit">Add</button>
            </form>
        `);
    }else{
        if(req.url === "/message"){
            res.setHeader('Content-Type', 'text/html');
            res.statusCode=302;
            res.end(`<h1>This is a message</h1>`)
            
        }
    }

})

server.listen(3000,()=> console.log("Server started!"))