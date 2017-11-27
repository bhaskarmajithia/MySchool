const express        = require('express');
const mysql    = require('mysql');
const bodyParser     = require('body-parser');
const app            = express();

const port = 8000;
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'demo'  
});
app.use(bodyParser.json())
app.listen(port, () => {
    console.log('Hello world' + port);
  });


  //Get request

app.get('/api/products',function(req,res,next){
    //res.send(JSON.stringify({"status":200,"name":"Bhaskar Majithia"}));
    pool.getConnection(function(err,getConnection){
        if(err)throw err;
        getConnection.query('SELECT * FROM stDetails', function(error, results, fields){
            if(error)res.send(JSON.stringify({"status":500, "error": error, "response": null}));
            else{
                res.send(JSON.stringify({"status":200, "error": null, "response": results}));
            }
        })
    })
});

app.get('/api/products/class/:num/:pin',function(req,res,next){
    //res.send(JSON.stringify({"status":200,"name":"Bhaskar Majithia"}));
    pool.getConnection(function(err,getConnection){
        if(err)throw err;
        getConnection.query(`SELECT * FROM stDetails where class = "${req.params.num}" and pinCode=${req.params.pin}`, function(error, results, fields){
            if(error)res.send(JSON.stringify({"status":500, "error": error, "response": null}));
            else{
                res.send(JSON.stringify({"status":200, "error": null, "response": results}));
            }
        })
    })
})


app.post('/api/login',function(req,res){
    
    pool.getConnection(function(err,getConnection){
        if(err)throw err;
        getConnection.query(`INSERT INTO stDetails(name, class, fatherName, motherName, bloodGroup, totalFees, attendance, locality, city, distt, pinCode) VALUES("${req.body.name}", "${req.body.class}", "${req.body.fatherName}","${req.body.motherName}", "${req.body.bloodGroup}", ${req.body.totalFees}, ${req.body.attendance}, "${req.body.locality}", "${req.body.city}", "${req.body.distt}", ${req.body.pinCode})`, function(error, results, fields){
            if(error)res.send(JSON.stringify({"status":500, "error": error, "response": null}));
            else{
                res.send(JSON.stringify({"status":200, "error": null, "response": results}));
            }
        })
    })
});


app.delete('/api/delete/:id',function(req,res){
    
    pool.getConnection(function(err,getConnection){
        if(err)throw err;
        getConnection.query(`DELETE FROM stDetails WHERE id = ${req.params.id}`, function(error, results, fields){
            if(error)res.send(JSON.stringify({"status":500, "error": error, "response": null}));
            else{
                res.send(JSON.stringify({"status":200, "error": null, "response": results}));
            }
        })
    })
});


app.put('/api/update',function(req,res){
    
    pool.getConnection(function(err,getConnection){
        if(err)throw err;

        getConnection.query(`UPDATE stDetails SET dues = ${req.body.dues} WHERE id = ${req.body.id}`, function(error, results, fields){
            if(error)res.send(JSON.stringify({"status":500, "error": error, "response": null}));
            else{
                res.send(JSON.stringify({"status":200, "error": null, "response": results}));
            }
        })
    })
});








