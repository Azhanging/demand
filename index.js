const http = require('http');

const fs = require('fs');

const path = require('path');

const server = http.createServer((req, res) => {
	fs.readFile(path.join(__dirname,req.url),{
		encoding:'utf8'
	},(err,data)=>{
		
		if(err){
			res.writeHead(400,'error');
			res.end();
			return;
		}
		
		if(/\.js/.test(req.url)){
			res.setHeader('Content-Type','application/javascript');
		}
		
		if(/m1|m2/.test(req.url)){	
			setTimeout(()=>{
				res.write(data);
				res.end();
			},10);
		}else{
			res.write(data);
			res.end();
		}
		
	});
});

server.listen(8888);