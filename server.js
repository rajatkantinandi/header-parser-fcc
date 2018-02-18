var express=require('express');
var useragent=require('express-useragent');
var path=require('path');
var app=express();
app.use(useragent.express());
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"views","index.html"));
});
app.enable('trust proxy');
app.get('/style.css',function(req,res){
    res.sendFile(path.join(__dirname,"views","style.css"));
});
app.get('/api/whoami',function(req,res){
    var ipAddress=req.ip;
    var langL=req.acceptsLanguages()[0];
    var software={
        "OS":req.useragent.os,
        "Platform":req.useragent.platform,
        "Browser":req.useragent.browser
    };
    res.send({
        ipaddress:ipAddress,
        language:langL,
        software:software
    });
});
app.listen(process.argv[3],process.argv[2],function(){
    console.log("listening to request on: //"+process.argv[2]+":"+process.argv[3]);
});