import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async(req, res) => {
    const buffers = []

    for await (const chunck of req){
        buffers.push(chunck)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)
 
 
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
  //req
    //.pipe(new InverseNumberStream())
    //.pipe(res);
});

server.listen(3334, () => {
  console.log('Server is running on http://localhost:3334');
});
