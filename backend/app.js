const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://superchoby:1superchoby@cluster0-6hnd0.mongodb.net/test?retryWrites=true&w=majority';

mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
MongoClient.connect(url, mongoOptions, function(err, db){
    if (err) throw err;
    const dbo = db.db('mydb');
    const myobj = {
        name: "Company Inc",
        address: "Highway 37",
    }
    dbo.collection("customers").insertOne(myobj, function(err, res){
        if (err) throw err;
        console.log("1 document inserted");
        db.close()
    })
    
})


const server = http.createServer(function(request, response){
    if(request.method === 'GET'){
        if(request.url === '/createuser'){
            console.log(Object.keys(response))
        }
    }
})

const port = 8080
const host = '127.0.0.1'
server.listen(port, host);