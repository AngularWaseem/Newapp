const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const http=require('http'); //htt serverinnode
const app=express();
const api=require('./server/routes/api');
const cors=require('cors');

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api',api);
app.use(express.static(path.join(__dirname,'dist')));
app.get("*",(req, res) =>{
  res.sendFile(path.join(__dirname,'dist/AngularProject/index.html'));
 });
//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api',api);
//serve express static files
app.use(express.static(path.join(__dirname,'dist')));

//when we build our project using ng build, it outputs everything and puts it into dist folder, which basically allows the static files which are located over there


// return other routes to angular index file
app.get("*",(req, res) =>{
 res.sendFile(path.join(__dirname,'dist/TechMBookM/index.html'));
});
//we send them to index as it is the base for our angular

//set port
const port=process.env.PORT || '3000';
app.set('port',port);

//create the HTTP server
const server=http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));