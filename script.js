let dragActive = false,
    selectedTarget,
    finger;

let pos = {
    finger1: {
        currentX: 0,
        currentY: 0,
        initialX: 0,
        initialY: 0,
        xOffset: 0,
        yOffset: 0
     },
    
    finger2: {
        currentX: 0,
        currentY: 0,
        initialX: 0,
        initialY: 0,
        xOffset: 0,
        yOffset: 0
    },

    finger3: {
        currentX: 0,
        currentY: 0,
        initialX: 0,
        initialY: 0,
        xOffset: 0,
        yOffset: 0
    },

    finger4: {
        currentX: 0,
        currentY: 0,
        initialX: 0,
        initialY: 0,
        xOffset: 0,
        yOffset: 0
    },

    finger5: {
        currentX: 0,
        currentY: 0,
        initialX: 0,
        initialY: 0,
        xOffset: 0,
        yOffset: 0
    }
};

document.addEventListener("mousedown", dragStart, false);
document.addEventListener("mouseup", dragEnd, false);
document.addEventListener("mousemove", drag, false);

function dragStart(e){
    console.log(e.target.parentElement.className)
    finger=e.target.parentElement.className;
    selectedTarget=e.target;
    dragActive = true;

    pos[finger].initialX = e.clientX - pos[finger].xOffset;
    pos[finger].initialY = e.clientY - pos[finger].yOffset;
}

function dragEnd(e){
        pos[finger].initialX = pos[finger].currentX;
        pos[finger].initialY = pos[finger].currentY;
        dragActive = false;
}

function drag(e){
    if (dragActive == true){
        e.preventDefault();

        pos[finger].currentX = e.clientX - pos[finger].initialX;
        pos[finger].currentY = e.clientY - pos[finger].initialY;

        pos[finger].xOffset = pos[finger].currentX;
        pos[finger].yOffset = pos[finger].currentY;

        setPosition(pos[finger].currentX,pos[finger].currentY,selectedTarget);
    }
}

function setPosition(x,y, target){
    target.style.left = x + "px";
    target.style.top = y + "px";
}




/*

let scoreBoard = [0,0];
let player1_Score, player2_Score;

game();


function game(){
    for(i=1; i<=10; i++){
        console.log(`- - - - ROUND${i} - - - -`);
        playRound();
    }
}

function playRound(){
    let result = [],
        player1 = userSelection(), // this calls for user input
        player2 = computerSelection(); // this generates computer's random choice
    
    result = whoWins(player1, player2); //call whoWins function and assign result in the form of [x,y]
    updateScore(result);
}

function computerSelection(){
    let seed = Math.random();
    if(seed<=0.33) return "ROCK"
    if(seed>0.33 && seed<=0.66) return "PAPER"
    if(seed>0.66) return "SCISSORS"
}

function userSelection(){
    let figure = prompt("Type Rock/Paper/Scissors:").toUpperCase(); //ask user for the input
    if(figure=="ROCK" || figure=="PAPER" || figure=="SCISSORS") return figure //validate if the input is correct
    else{
        alert("invalid input");
        userSelection(); //call the function again in case it's invalid
    }
}

function whoWins(player1, player2){
    console.log('P: '+player1);
    console.log('C: '+player2);
    if(player1=="ROCK" && player2=="ROCK") return [0,0]
    if(player1=="ROCK" && player2=="PAPER") return [0,1]
    if(player1=="ROCK" && player2=="SCISSORS") return [1,0]
    if(player1=="PAPER" && player2=="ROCK") return [1,0]
    if(player1=="PAPER" && player2=="PAPER") return [0,0]
    if(player1=="PAPER" && player2=="SCISSORS") return [0,1]
    if(player1=="SCISSORS" && player2=="ROCK") return [0,1]
    if(player1=="SCISSORS" && player2=="PAPER") return [1,0]
    if(player1=="SCISSORS" && player2=="SCISSORS") return [0,0]
}

function updateScore(result){
    scoreBoard[0]=scoreBoard[0]+result[0];
    scoreBoard[1]=scoreBoard[1]+result[1];

    player1_Score=scoreBoard[0];
    player2_Score=scoreBoard[1];

    console.log(`PLAYER: ${player1_Score}, COMPUTER: ${player2_Score}`)
}

*/