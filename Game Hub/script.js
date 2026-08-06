const cards = document.querySelector(".jogos");


// ======================
// FUNÇÕES GERAIS
// ======================


function esconderBanner(){

    let banner = document.querySelector(".banner");

    if(banner){

        banner.style.display="none";

    }

}



function voltarMenu(){

    location.reload();

}




// ======================
// 🐍 SNAKE
// ======================


function abrirSnake(){


    esconderBanner();



    cards.innerHTML = `

    <div id="snakeContainer" style="text-align:center">

        <h2>🐍 Snake</h2>

        <h3>Pontos: <span id="score">0</span></h3>

        <canvas id="snake" width="500" height="500"></canvas>

        <br><br>

        <button onclick="voltarMenu()">

        ⬅ Voltar

        </button>

    </div>

    `;



    iniciarSnake();


}





function iniciarSnake(){


const canvas=document.getElementById("snake");

const ctx=canvas.getContext("2d");



let cobra=[

{x:10,y:10}

];



let comida={

x:15,

y:15

};



let direcao="RIGHT";

let pontos=0;

let vivo=true;






document.onkeydown=function(e){


e.preventDefault();



if(e.key=="ArrowUp" && direcao!="DOWN")

direcao="UP";



if(e.key=="ArrowDown" && direcao!="UP")

direcao="DOWN";



if(e.key=="ArrowLeft" && direcao!="RIGHT")

direcao="LEFT";



if(e.key=="ArrowRight" && direcao!="LEFT")

direcao="RIGHT";



};







function desenhar(){



ctx.fillStyle="#0d1117";

ctx.fillRect(0,0,500,500);





ctx.fillStyle="red";

ctx.fillRect(

comida.x*20,

comida.y*20,

18,

18

);







cobra.forEach((parte,index)=>{


ctx.fillStyle=index==0?"#00ff88":"#3fb950";


ctx.fillRect(

parte.x*20,

parte.y*20,

18,

18

);


});



}








function atualizar(){



if(!vivo)

return;





let cabeca={...cobra[0]};





if(direcao=="RIGHT")

cabeca.x++;



if(direcao=="LEFT")

cabeca.x--;



if(direcao=="UP")

cabeca.y--;



if(direcao=="DOWN")

cabeca.y++;






if(

cabeca.x<0 ||

cabeca.y<0 ||

cabeca.x>=25 ||

cabeca.y>=25

){


vivo=false;



cards.innerHTML=`

<div style="text-align:center">

<h1>💀 GAME OVER</h1>

<h2>Pontos: ${pontos}</h2>

<button onclick="voltarMenu()">

⬅ Voltar

</button>

</div>

`;

return;


}





cobra.unshift(cabeca);





if(

cabeca.x==comida.x &&

cabeca.y==comida.y

){



pontos++;


document.getElementById("score").innerHTML=pontos;




comida={

x:Math.floor(Math.random()*25),

y:Math.floor(Math.random()*25)

};



}

else{


cobra.pop();


}





desenhar();



}




desenhar();


setInterval(atualizar,120);



}// ======================
// 🏓 PONG
// ======================


function abrirPong(){


    esconderBanner();



    cards.innerHTML=`

    <div style="text-align:center">


    <h2>🏓 Pong</h2>


    <h3>Escolha a dificuldade:</h3>


    <button onclick="iniciarPong('facil')">

    🟢 Fácil

    </button>


    <br><br>


    <button onclick="iniciarPong('medio')">

    🟡 Médio

    </button>


    <br><br>


    <button onclick="iniciarPong('dificil')">

    🔴 Difícil

    </button>



    <br><br>


    <button onclick="voltarMenu()">

    ⬅ Voltar

    </button>



    </div>

    `;



}







function iniciarPong(dificuldade){



cards.innerHTML=`

<div id="pongContainer" style="text-align:center">


<h2>🏓 Pong</h2>



<h3>

Você:

<span id="p1">0</span>


|

CPU:

<span id="p2">0</span>


</h3>




<canvas id="pong" width="700" height="400"></canvas>



<br><br>



<button onclick="voltarMenu()">

⬅ Voltar

</button>



</div>

`;






const canvas=document.getElementById("pong");

const ctx=canvas.getContext("2d");





let player=150;

let cpu=150;



let cima=false;

let baixo=false;



let pontosPlayer=0;

let pontosCPU=0;





let velocidadeCPU;



if(dificuldade=="facil")

velocidadeCPU=2;



if(dificuldade=="medio")

velocidadeCPU=4;



if(dificuldade=="dificil")

velocidadeCPU=6;






let bola={


x:350,

y:200,

vx:3,

vy:3


};







document.onkeydown=function(e){


e.preventDefault();



if(e.key=="ArrowUp")

cima=true;



if(e.key=="ArrowDown")

baixo=true;



};







document.onkeyup=function(e){


if(e.key=="ArrowUp")

cima=false;



if(e.key=="ArrowDown")

baixo=false;



};








function resetBola(){


bola.x=350;

bola.y=200;


bola.vx*=-1;


bola.vy=3;


}







function atualizarPong(){



// jogador


if(cima && player>0)

player-=6;



if(baixo && player<300)

player+=6;






// bola


bola.x+=bola.vx;

bola.y+=bola.vy;






if(

bola.y<=0 ||

bola.y>=390

)

bola.vy*=-1;






// colisão jogador


if(

bola.x<=35 &&

bola.y>=player &&

bola.y<=player+100

){


bola.vx*=-1;


}







// CPU


if(cpu+50<bola.y)

cpu+=velocidadeCPU;

else

cpu-=velocidadeCPU;






if(cpu<0)

cpu=0;



if(cpu>300)

cpu=300;







// colisão CPU


if(

bola.x>=650 &&

bola.y>=cpu &&

bola.y<=cpu+100

){


bola.vx*=-1;


}





// pontos


if(bola.x<0){


pontosCPU++;


document.getElementById("p2").innerHTML=pontosCPU;


resetBola();


}




if(bola.x>700){


pontosPlayer++;


document.getElementById("p1").innerHTML=pontosPlayer;


resetBola();


}



}








function desenharPong(){



ctx.fillStyle="black";

ctx.fillRect(0,0,700,400);






ctx.fillStyle="#3fb950";

ctx.fillRect(

20,

player,

15,

100

);







ctx.fillStyle="#ff4444";

ctx.fillRect(

665,

cpu,

15,

100

);






ctx.fillStyle="white";

ctx.fillRect(

bola.x,

bola.y,

10,

10

);




}







function loopPong(){



atualizarPong();


desenharPong();


requestAnimationFrame(loopPong);



}



loopPong();



}// ======================
// 🏎️ RACING 3D
// ======================


function abrirCorrida(){


    esconderBanner();


    cards.innerHTML = `

    <div id="corrida" style="text-align:center">

        <h2>🏎️ Racing 3D</h2>

        <div id="game3d"></div>

        <br>

        <button onclick="voltarMenu()">⬅ Voltar</button>

    </div>

    `;


    iniciarCorrida();

}





function iniciarCorrida(){


    let cena = new THREE.Scene();


    cena.background = new THREE.Color(0x87ceeb);



    let camera = new THREE.PerspectiveCamera(

        75,

        700 / 500,

        0.1,

        1000

    );



    let render = new THREE.WebGLRenderer();


    render.setSize(700,500);



    document.getElementById("game3d").appendChild(render.domElement);




    let luz = new THREE.AmbientLight(0xffffff);


    cena.add(luz);





    // estrada

    let estrada = new THREE.Mesh(

        new THREE.BoxGeometry(10,0.2,200),

        new THREE.MeshBasicMaterial({

            color:0x333333

        })

    );


    estrada.position.y=-1;


    cena.add(estrada);





    // 🚗 carro de corrida

let carro = new THREE.Group();


// carroceria

let corpo = new THREE.Mesh(

    new THREE.BoxGeometry(
        1.2,
        0.4,
        2.2
    ),

    new THREE.MeshBasicMaterial({

        color:0xff0000

    })

);


corpo.position.y=0.3;


carro.add(corpo);




// cabine

let cabine = new THREE.Mesh(

    new THREE.BoxGeometry(
        0.8,
        0.4,
        0.9
    ),

    new THREE.MeshBasicMaterial({

        color:0x111111

    })

);


cabine.position.y=0.65;


cabine.position.z=-0.2;


carro.add(cabine);




// rodas

function criarRoda(x,z){


    let roda = new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.25,
            0.25,
            0.15,
            16
        ),

        new THREE.MeshBasicMaterial({

            color:0x000000

        })

    );


    roda.rotation.z=Math.PI/2;


    roda.position.set(
        x,
        0.15,
        z
    );


    carro.add(roda);

}



criarRoda(-0.7,0.7);

criarRoda(0.7,0.7);

criarRoda(-0.7,-0.7);

criarRoda(0.7,-0.7);





carro.position.y=0;


cena.add(carro);		
     



    // obstáculos

    let obstaculos = [];



    function criarObstaculo(){


        let obstaculo = new THREE.Mesh(

            new THREE.BoxGeometry(
                1,
                1,
                1
            ),

            new THREE.MeshBasicMaterial({

                color:0x0000ff

            })

        );



        obstaculo.position.x = Math.random()*8-4;


        obstaculo.position.y=0;


        obstaculo.position.z=-30;


        cena.add(obstaculo);


        obstaculos.push(obstaculo);


    }



    setInterval(criarObstaculo,2000);


    camera.position.set(

        0,

        3,

        8

    );


    camera.lookAt(carro.position);





    let esquerda=false;

    let direita=false;





    document.onkeydown=function(e){


        if(e.key=="ArrowLeft"){

            esquerda=true;

        }


        if(e.key=="ArrowRight"){

            direita=true;

        }


    };





    document.onkeyup=function(e){


        if(e.key=="ArrowLeft"){

            esquerda=false;

        }


        if(e.key=="ArrowRight"){

            direita=false;

        }


    };




function loopCorrida(){


    requestAnimationFrame(loopCorrida);



    // movimento da estrada

    estrada.position.z += 0.15;


   if(estrada.position.z > 100){

    estrada.position.z = -100;

}



    // movimento dos obstáculos

    for(let i=0;i<obstaculos.length;i++){


        obstaculos[i].position.z += 0.5;



        // colisão

        if(

            Math.abs(carro.position.x - obstaculos[i].position.x) < 1

            &&

            Math.abs(carro.position.z - obstaculos[i].position.z) < 2

        ){

            console.log("GAME OVER 🏁");

            location.reload();

        }


    }





    // controle esquerda

    if(esquerda && carro.position.x > -4){

        carro.position.x -= 0.1;

    }



    // controle direita

    if(direita && carro.position.x < 4){

        carro.position.x += 0.1;

    }





    render.render(

        cena,

        camera

    );


}


   


loopCorrida();


}