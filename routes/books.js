var express = require("express");
var router = express.Router();

//Obtener Libros
//PATH /books
router.get("/", (req, res, next)=>{
    req.db.query("SELECT * FROM libro", (err, results)=>{
        if(err){
            res.send([]);
        }else{
            res.send(results)
        }
    });
});


//Obtener un Libro
//PATH /books/id
router.get("/:id", (req, res, next)=>{
    let id = req.params.id;
    req.db.query("SELECT * FROM libro WHERE idlibro = "+id, (err, results)=>{
        if(err || results.length == 0){
            res.status(404).send({msg:"El libro no existe"});
        }else{
            res.send(results[0]);
        }
    });
    
});

//Insertar Libro
//PATH /books
router.post("/", (req, res, next)=>{
    let body = req.body;
    req.db.query("INSERT INTO libro SET nombre = ?, autor = ?, paginas = ? ", [body.nombre, body.autor, body.paginas], (err, results)=>{
        if(err){
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    });
});

//Actualizar Libro
//PATH /books
router.put("/:id", (req, res, next)=>{
    let body =  req.body;
    req.db.query("UPDATE libro SET nombre = ?, autor = ?, paginas = ? WHERE idlibro = ?"
    ,[body.nombre, body.autor, body.paginas, req.params.id], (err, results)=>{
        if(err){
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    });
});


//Eliminar Libro
//PATH /books/id
router.delete("/:id", (req, res, next)=>{
    req.db.query("DELETE FROM libro WHERE idlibro = ?", [req.params.id], (err, results)=>{
        if(err){
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    });
});

module.exports = router;

