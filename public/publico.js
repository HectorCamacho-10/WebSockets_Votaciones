const socket = io();

let morada = document.getElementById('morada');
let negra = document.getElementById('negra');
let roja = document.getElementById('roja');
let blanca = document.getElementById('blanca');
let amarilla = document.getElementById('amarilla');

let btn = document.getElementById('OK');
let usuario = document.getElementById('usuario');
let password = document.getElementById('password');


//Funciones 
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

function insertar(bol , nm, psw){
    if(bol){
        return true;
    }else{
        usuarios.push(nm);
        pass.push(psw);
        return false;
    }
}

function ocultar(){
    document.getElementById('nav').innerHTML='';
    document.getElementById('login').innerHTML='';
}


//OBTENIENDO DATOS
function usuarios_en(ns, ps){
    if(ns != ""){
    //var valor = insertar( verficacion(ns,ps),ns,ps);//True existe - false se inserto
    //var valor = verficacion(ns,ps);//false
    
            socket.emit('usuario',{
                nombre: ns,
                password: ps
            });
        
    }
      
}

//BOTON PARA VERIFICAR
btn.addEventListener('click',()=>{
    if(usuario.value != "" && password.value !=""){
         console.log("btn ok");
         usuarios_en(usuario.value, password.value);
         valors_campos();

    }else{
        alert("LLENA LOS CAMPOS");
    }
   
});



//funcion
//ocultar();
function hacer(q, ns, np){
    if(q==true){
        console.log('existes' + ns, +np);
        alert("NO PUEDES VOTAR");
        ocultar();
    }
    else{
        console.log('no existes' + ns, +np);
        alert('Tu VOTO se contara');
       // mostrar();
    }
}

//escuhar
socket.on('usuario',dt=>{
    hacer(dt.bandera, dt.nombre, dt.password);
});


var valor =0;
var indice = 0;
//PLANILLAS
var planillas = [0,0,0,0,0];

//ACTUALIZAR PLANILLAS
const fp = (m,n,r,b,a)=>{
    planillas[0]=m;
    planillas[1]=n;
    planillas[2]=r;
    planillas[3]=b;
    planillas[4]=a;
}

function valors_campos(){
  
morada.addEventListener('click',()=>{
    socket.emit('mg',{
        i: 0
    });  
    ocultar();
    
});

negra.addEventListener('click',()=>{
    socket.emit('mg',{
        i: 1
    });
    ocultar();
   
    
    
});
roja.addEventListener('click',()=>{
    socket.emit('mg',{
        i: 2
    });
        
});

blanca.addEventListener('click',()=>{
    socket.emit('mg',{
        i: 3
    });
    ocultar();
    
});
amarilla.addEventListener('click',()=>{
    
    socket.emit('mg',{
        i: 4
    });   
    ocultar();
    
});  
}




var ctx = document.getElementById('myChart').getContext('2d');
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Morada', 'Negra', 'Roja','Blanca', 'Amarillo'],
        datasets: [{
            label: 'Total de votos',
            data: planillas,
            backgroundColor: [
                'rgba(128,0,128)',
                'rgba(0,0,0)',
                'rgba(255,0,0)',
                'rgba(255,255,255)',
                'rgba(255,255,0)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(0,0,0)',
                'rgba(153, 102, 255, 1)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


function cg(){
    socket.emit('dtdt');
    myChart.update();
    socket.on('d',dtt=>{
        fp(dtt.m,dtt.n,dtt.r,dtt.b,dtt.a);
        myChart.update();
    });
    console.log(planillas);
    console.log('se cargo');
    socket.on('mg',function(dt){
    console.log(dt);
    fp(dt.m,dt.n,dt.r,dt.b,dt.a);
    myChart.update();
});
}
cg();
