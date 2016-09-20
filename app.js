/**
 * Created by heriipurnama on 18/10/15.
 */
var http       = require("http");
var url        = require("url");
var router     = require("routes")(); //mgambil paket library routes, npm install routes
var view       = require("swig"); //mgambil paket library swig, npm install swig
var mysql      = require("mysql"); //mgambil paket mysql, npm install mysql
var connection = mysql.createConnection({
    host       : "localhost",
    port       : 3306,
    database   : 'nodejs',
    user       : 'root',
    password   : 'root',
});

router.addRoute('/',function(req,res){ //routing menampilkan halaman depan
   connection.query("select * from mahasiswa",function(err,rows,field){//function callback dg parameter
      if(err) throw err; //jika error menampilkan error
       // console.log(rows); //jika tidak maka akan ditampilkan == pil.1

       /*==menampilkan data kedalam terminal melalui browser ==== pil.2
       rows.forEach(function(item){
           console.log("nama "+item.nama+" "+"nim "+item.nim);
       });
       ============================================================*/
       //menampilkan dalam bentuk JSON
       res.writeHead(200,{"Content-Type":"text/plain"});
       res.end(JSON.stringify(rows));//mengkonfersi bentuk data JSON dan menampilkanya kedalam BROWSER kebentuk JSON
   });
});

router.addRoute("/insert",function(req,res){ //parameter1
    connection.query("insert into mahasiswa set ?", { //perbedaan dr insert param1 query param JSON objek param funtion callback
        nim: "96",
           nama: "wasihlove",
                alamat: "banjarnegara"
    },function(err,field){//parameter yg 1 error ke 2 hasil
        if(err) throw err;
                 res.writeHead(900,{"Content-Type":"text/plain"});
                 res.end(field.affectedRows+" Affected Rows");
        //menampilkanya dalam konsole
        console.log(field.affectedRows+" Affected Rows");
        res.end();
    });
});

router.addRoute("/update",function(req,res){
    connection.query("update mahasiswa set ? where ?",[ //bdanya param1 query
        { nama: "heriipurnamaLOVEwsriyuliyanti" },   //param2 berisi JSON objek ? membaca nama
        { nim : "R2088MM"} //membaca kondisi
    ],function(err,fields){
        if(err) throw err;
          res.writeHead(200,{"Content-type":"text/plain"});
             res.end(fields.changedRows+" Rows Update");
        //menampilkanya dalam konsole
        console.log(fields.changedRows+" Rows Update");
            res.end();
    });
});

router.addRoute("/delete",function(req,res){
    connection.query("delete from mahasiswa where ?",
        { nim : "2" },
        function(err,fields){
            if(err) throw err;
                 res.writeHead(200,{"Content-Type":"text/plain"});
                     res.end(fields.affectedRows+" Rows Deleted");
            //menampilkanya dalam konsole
                 console.log(fields.affectedRows+" Rows Deleted");
                       res.end();
        }
    );
});

http.createServer(function(req,res){
    var path  = url.parse(req.url).pathname;
    var match  = router.match(path);
    if(match){
        match.fn(req,res);
    }else{
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.end("Page NOt Found");
    }

}).listen(8888);

console.log("server running di 8888");