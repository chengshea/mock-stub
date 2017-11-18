var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer	= require('multer');
var router = express.Router();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get 请求方法的返回
router.get('/api/*.do', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query.methodName,__dirname);
	var fileName = req.query.methodName;
	
	
	//全部参数
	var array = new Array();
	for(var key in req.query){
		array.push(key+"=");
		array.push(req.query[key]+"&");
              
	}
	var str = array.join("");
	fileName=str.substr(str,str.length-1)
	var jsonFile= __dirname + '/../json/' + fileName + '.json';
	var isExits = fs.existsSync(jsonFile);
	res.contentType('json');//返回的数据类型  
	if(isExits){
		fs.readFile(jsonFile,'utf-8',function(err,data){  
		    if(err){  
		        console.log(data);  
		    }else{  
		        console.log(data);
		        res.json(JSON.parse(data));
		    }  
		});
	}else{
		res.json({code:-1,message:"请求文件["+fileName+".json]文件不存在"});
	}
});




router.post('/api/*.do',multer().single('file'),function(req,res){
   res.header("Access-Control-Allow-Origin", "*");
   console.log("log:"+req.body.uiId)  
     
   var array = new Array();
    for(var key in req.body){
		array.push(key+"=");
		array.push(req.body[key]+"&");
	}
  

    var str = array.join("");
    fileName=str.substr(str,str.length-1)
    console.log("fileName : "+fileName) 
	var jsonFile= __dirname + '/../json/' + fileName + '.json';
	
	var file = req.file; 
    if(file){
	    fs.writeFile(file.originalname, file, function(err){
	        if(err)console.log(err);
	        else {
	        	console.log('文件类型：%s', file.mimetype);
	            console.log('文件大小：%s', file.size);
	        }
	    });
    }
	var isExits = fs.existsSync(jsonFile);
	res.contentType('json');//返回的数据类型  
	if(isExits){
		fs.readFile(jsonFile,'utf-8',function(err,data){  
		    if(err){  
		        console.log(data);  
		    }else{  
		        console.log(data);
		        res.json(JSON.parse(data));
		    }  
		});
	}else{
		res.json({code:-1,message:"请求文件["+fileName+".json]文件不存在"});
	}
    
});
module.exports = router;
