var express = require('express')
var mysql = require('mysql')
var bodyparser = require('body-parser')
var cors = require('cors')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'nodeexpressfriends1'
})

connection.connect(error =>{
    if(error)
        throw error
    console.log("Connected to database: nodeexpressfriends1" );
})

var app = express()
app.use(bodyparser.json())
app.use(cors())

app.get('/all', (req, res) =>{
    var sql = 'select * from friends'
    connection.query(sql, (error, data)=>{
        if(error)
            throw error

        res.json(data)    
    })

})

app.post('/add', (req, res)=>{
    //console.log(req);
    var name = req.query.name
    var location = req.query.location
    var sql = "insert into friends (name, location, likes, dislikes) values ('"
                +name + "','" + location + "', 0, 0 )"
    console.log(sql);    
    connection.query(sql, error=>{
        if(error)
            throw error
        res.send("Success")

    })  
})

app.get('/get/:id', (req, res)=>{
    var sql = "select * from friends where id=" + req.params.id
    connection.query(sql, (error, data)=>{
        if(error)
            throw error
        res.json(data)

    })
})


app.put('/update/:id', (req, res)=>{
    var id = req.params.id
    var name = req.body.name
    var location = req.body.location
    var likes = req.body.likes
    var dislikes = req.body.dislikes
    console.log(id);
    console.log(req.body);
    var sql = "update friends set name='"+name+"', location='"+location+"' where id=" + id
    console.log(sql);
    connection.query(sql, error=>{
        if(error)
            throw error
        res.send("Update success for " + id)

    })
    
})

app.put('/update/likes/:id', (req, res)=>{
    var id = req.params.id
    var likes = req.body.likes
    var sql = "update friends set likes="+likes+" where id=" + id
    console.log(sql);
    connection.query(sql, error=>{
        if(error)
            throw error
        res.send("Update likes success for " + id)

    })
})


app.put('/update/dislikes/:id', (req, res)=>{
    var id = req.params.id
    var dislikes = req.body.dislikes
    var sql = "update friends set dislikes="+dislikes+" where id=" + id
    console.log(sql);
    connection.query(sql, error=>{
        if(error)
            throw error
        res.send("Update dislikes success for " + id)

    })
})







app.listen(1234)

