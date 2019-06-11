var express=require('express')
var mongoose=require('mongoose')
var bodyparser=require('body-parser')
var cors=require('cors')
var path=require('path')
var route=require('./routes/router')


var app =express();

const port=3000;

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))
app.use('/api',route);

mongoose.connect('mongodb://localhost:27017/contactlist');

mongoose.connection.on('connected',()=>{
    console.log('Connected to db')
})
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log(err)
    }
})


app.get('/',(req,res)=>{
    res.send('hello world')
})


app.listen(port,()=>{
   console.log('Server started at port :'+port)
})

