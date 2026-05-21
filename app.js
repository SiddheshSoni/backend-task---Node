const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{

    const url = req.url;
    const method = req.method;

    if(req.url === "/"){
        res.setHeader('Content-Type', 'text/html');

        fs.readFile('formValues.txt', (err, data)=>{
            const dataVal = err ? '' : data.toString();
            console.log(dataVal);

            res.end(`
                <h1>${dataVal}</h1>
                <form method="POST" action="/message">
                    <label>Name:</label>
                    <input type='text' name='username'>
                    <button type="submit">Add</button>
                </form>
            `);
        });
    }else{
        if(req.url === "/message"){
            res.setHeader('Content-Type', 'text/html');
            
            let dataChunks = [];
            req.on('data', (chunks)=>{
                dataChunks.push(chunks);
            });
            
            req.on('end', ()=>{
                let combinedBuffer = Buffer.concat(dataChunks);
                let value = combinedBuffer.toString().split("=")[1];

                fs.writeFile('formValues.txt', value, (err)=>{
                    res.statusCode =302;
                    res.setHeader('location', '/');
                    res.end();
                });
                
            })
        }else{
            // if(req.url == '/read'){
            //     fs.readFile('formValues.txt', (err, data)=>{
            //         console.log(data.toString());
                    
                    
            //         res.end(`<h1>${data.toString()}</h1>`);
            //     })
            // }
        }
    }

})

server.listen(3000,()=> console.log("Server started!"))