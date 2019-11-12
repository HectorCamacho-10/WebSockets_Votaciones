const express= require('express');
const app= express();
const path = require('path');

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname,'public')));

const server =app.listen(app.get('port'), ()=>{
    console.log('server :'+app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);


//funciones

var usuarios = new Array();
var pass = new Array();

function verficacion(nm, psw){    
    var us = false;
    for(var i = 0; i<usuarios.length; i++){
        if(nm == usuarios[i] && pass[i]==psw){
           return true;
        }
    }
    return us;
}
var mydatas=[0,0,0,0,0];
function insertar(bol , nm, psw){
    if(bol){
        return true;
    }else{
        usuarios.push(nm);
        pass.push(psw);
        return false;
    }
}




io.on('connection',(socket)=>{
    console.log("new")

    socket.on('mg', (dt)=>{
       io.sockets.emit('mg', dt);
    });

    socket.on('usuario',(dt)=>{
       var bandera = insertar(verficacion(dt.nombre,dt.password), dt.nombre,dt.password);//false se inserto en bd true existe
        socket.emit('usuario',{
            bandera: bandera,
            nombre : dt.nombre,
            password :dt.password
        });
    });
});

