const http = require('http');

const axios = require('axios');

const fs = require('fs');

const path = require('path');

const server = http.createServer((req, res) => {
	fs.readFile(path.join(__dirname,req.url),{
		encoding:'utf8'
	},(err,data)=>{
		if(err){
			data = '';
		}
		if(/\.js/.test(req.url)){
			res.setHeader('Content-Type','application/javascript');		
		}
		if(/m1/.test(req.url)){	
			setTimeout(()=>{
				res.write(data);
				res.end();
			},100);
		}else{
			res.write(data);
			res.end();
		}
		
	});
});

server.listen(8888);