const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const {connection} = require('./db/db');

app.set('view engine','ejs');

app.use(express.static('./views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.route('/').get(async(req, res) => {
    
    connection.query("SELECT * FROM tareas;",(err,result)=>{
        if(err) throw err;
        console.log("Hice la consulta...");
        console.log(result);
        res.render('index',{data:result});
    });

    
    //res.send('hello');
});

app.route('/save').post((req, res)=>{
    console.log('Dentro del metodo save');
    console.log(req.body);
    connection.query(`INSERT INTO tareas (nombre, punteo, finish) VALUES ('${req.body.nombreTarea}',${req.body.punteoTarea}, 0);`,(err,result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.route('/update').post((req,res)=>{
    console.log('Dentro del metodo update');
    console.log(req.body);
    connection.query(`UPDATE tareas SET finish=${req.body.value} WHERE idTarea=${req.body.tarea};`,(err,result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});


app.route('/delete/:id').get((req,res)=>{
    console.log('Dentro del metodo delete');
    console.log(req.params.id);
    connection.query(`DELETE FROM tareas WHERE idTarea=${req.params.id};`,(err,result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

  
app.listen(process.env.PORT,()=>{
    console.log("Aplicacion escuchando en el puerto: " + process.env.PORT);
});