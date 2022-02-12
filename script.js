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

let scoreBoard = [0,0];
let player1_Score, player2_Score;

let button = document.querySelector('.button');
button.addEventListener('click', function(){
    playRound()});

drawFingers();
drawFingersOpponent("ROCK");

document.addEventListener("mousedown", dragStart, false);
document.addEventListener("mouseup", dragEnd, false);
document.addEventListener("mousemove", drag, false);
//mobile  touch
document.addEventListener("touchstart", dragStart, false);
document.addEventListener("touchend", dragEnd, false);
document.addEventListener("touchmove", drag, false);

function drawFingers(){
    let fingerPos,
        handPos,
        rectJoint,
        rectHand,
        line;
    for (i=1; i<=5; i++){

        fingerPos = document.querySelector('.player1 .finger'+i+" .joint");
        handPos = document.querySelector('.player1 .palm');

        rectJoint = fingerPos.getBoundingClientRect();
        rectHand = handPos.getBoundingClientRect();

        line = document.querySelector('.player1 line.finger'+i);
        line.setAttribute('x1', rectJoint.left+25);
        line.setAttribute('y1', rectJoint.top+25);
        line.setAttribute('x2', rectHand.left+5);
        if(i==5){ //thumb
            line.setAttribute('x2', rectHand.left+175);
            line.setAttribute('y2', rectHand.top+25);
        }
        else{
            line.setAttribute('y2', rectHand.top+50*i-25);
        }
    }
}

function drawFingersOpponent(){
    let fingerPos,
        handPos,
        rectJoint,
        rectHand,
        line;
    for (i=1; i<=5; i++){

        fingerPos = document.querySelector('.player2 .finger'+i+" .joint");
        handPos = document.querySelector('.player2 .palm');

        rectJoint = fingerPos.getBoundingClientRect();
        rectHand = handPos.getBoundingClientRect();

        line = document.querySelector('.player2 line.finger'+i);
        line.setAttribute('x1', rectJoint.left+25);
        line.setAttribute('y1', rectJoint.top+25);
        line.setAttribute('x2', rectHand.right-5);
        if(i==5){ //thumb
            line.setAttribute('x2', rectHand.right-175);
            line.setAttribute('y2', rectHand.top+25);
        }
        else{
            line.setAttribute('y2', rectHand.top+50*i-25);
        }
    }
}

function setOpponentFigure(figure){
    let finger1 = document.querySelector('.player2 .finger1 .joint'),
        finger2 = document.querySelector('.player2 .finger2 .joint'),
        finger3 = document.querySelector('.player2 .finger3 .joint'),
        finger4 = document.querySelector('.player2 .finger4 .joint'),
        finger5 = document.querySelector('.player2 .finger5 .joint')
    switch(figure){
        case 'PAPER':
            setPosition(0, 0, finger1);
            setPosition(0, 0, finger2);
            setPosition(0, 0, finger3);
            setPosition(0, 0, finger4);
            setPosition(0, 0, finger5);
            drawFingersOpponent();
            break;
        case 'ROCK':
            setPosition(-350, 0, finger1);
            setPosition(-400, -5, finger2);
            setPosition(-350, -10, finger3);
            setPosition(-300, -10, finger4);
            setPosition(-20, 120, finger5);
            drawFingersOpponent();
            break;
        case 'SCISSORS':
            setPosition(-20, -40, finger1);
            setPosition(-50, 30, finger2);
            setPosition(-350, -10, finger3);
            setPosition(-300, -10, finger4);
            setPosition(-20, 120, finger5);
            drawFingersOpponent();
            break;        
    }
}

function dragStart(e){
    if(e.target.parentElement!==null &&
      [e.target.parentElement.className].toString().includes('finger')==true &&
      [e.target.parentElement.offsetParent.className].toString().includes('player1')==true){
        finger=e.target.parentElement.className;
        selectedTarget=e.target;

        if (e.type=="touchstart"){
            pos[finger].initialX = e.touches[0].clientX - pos[finger].xOffset;
            pos[finger].initialY = e.touches[0].clientY - pos[finger].yOffset;
        }
        else{
            pos[finger].initialX = e.clientX - pos[finger].xOffset;
            pos[finger].initialY = e.clientY - pos[finger].yOffset;
        }

        dragActive = true;
    }
}

function drag(e){

    if (dragActive == true){
        e.preventDefault();

        if (e.type=="touchmove"){
            pos[finger].currentX = e.touches[0].clientX - pos[finger].initialX;
            pos[finger].currentY = e.touches[0].clientY - pos[finger].initialY; 
        }
        else{
            pos[finger].currentX = e.clientX - pos[finger].initialX;
            pos[finger].currentY = e.clientY - pos[finger].initialY;
        }

        pos[finger].xOffset = pos[finger].currentX;
        pos[finger].yOffset = pos[finger].currentY;

    // finger limits:
    let limitOutside, limitInside, limitUp, limitDown;

    // stretch outside:
        if(finger=='finger5'){
            limitOutside=30;
        }
        else{
            limitOutside=-30;
        }
        if(pos[finger].currentX<=limitOutside){
            setPosition(limitOutside,pos[finger].currentY,selectedTarget);
            drawFingers();
            pos[finger].currentX=limitOutside;
            pos[finger].xOffset=limitOutside;
        }

    // stretch inside:
        switch (finger){
            case 'finger1':
                limitInside = 430;
                break;
            case 'finger2':
                limitInside = 480;
                break;
            case 'finger3':
                limitInside = 430;
                break;
            case 'finger4':
                limitInside = 370;
                break;
            case 'finger5':
                limitInside = 130;
                break;
        }
        if(pos[finger].currentX>=limitInside){
            setPosition(limitInside,pos[finger].currentY,selectedTarget);
            drawFingers();
            pos[finger].currentX=limitInside;
            pos[finger].xOffset=limitInside;
        }
    // go up:
        limitUp = -50;
        if(pos[finger].currentY<=limitUp){
            setPosition(pos[finger].currentX,limitUp,selectedTarget);
            drawFingers();
            pos[finger].currentY=limitUp;
            pos[finger].yOffset=limitUp;
        }        
    //go down:
        if (finger=='finger5'){
            limitDown = 200;
        }
        else{
            limitDown = 50;
        }
        if(pos[finger].currentY>=limitDown){
            setPosition(pos[finger].currentX,limitDown,selectedTarget);
            drawFingers();
            pos[finger].currentY=limitDown;
            pos[finger].yOffset=limitDown;
        }
        
    // just normal case (all between limitations):
        else{
            setPosition(pos[finger].currentX,pos[finger].currentY,selectedTarget);
            drawFingers();
        }
    }
}

function dragEnd(){
    if(dragActive==true){
        pos[finger].initialX = pos[finger].currentX;
        pos[finger].initialY = pos[finger].currentY;
        dragActive = false;

        detectFigure();
    }
}

function setPosition(x,y, target){
    target.style.left = x + "px";
    target.style.top = y + "px";
}

function moveLine(fingerNum){
    const line = document.querySelector('line.'+fingerNum)
    line.setAttribute('x1', 100);
    line.setAttribute('y1', 100);
}

function detectFigure(){
    //rock
    if(pos.finger1.currentX>250 &&
       pos.finger2.currentX>290 &&
       pos.finger3.currentX>240 &&
       pos.finger4.currentX>190 &&
       pos.finger5.currentY>40 
        )
    return 'ROCK'

    //scissors
    else if(pos.finger1.currentX<180 &&
       pos.finger2.currentX<200 &&
       pos.finger3.currentX>240 &&
       pos.finger4.currentX>190 &&
       pos.finger1.currentY<=pos.finger2.currentY
       )
    return 'SCISSORS'

    //paper
    else if(pos.finger1.currentX<140 &&
       pos.finger2.currentX<190 &&
       pos.finger3.currentX<150 &&
       pos.finger4.currentX<115 && 
       pos.finger5.currentY<60 &&

       pos.finger1.currentY-pos.finger2.currentY<35 &&
       pos.finger2.currentY-pos.finger3.currentY<35 &&
       pos.finger3.currentY-pos.finger4.currentY<35 &&

       pos.finger1.currentX-pos.finger2.currentX+50>-60 &&
       pos.finger1.currentX-pos.finger2.currentX+50<120 &&
       pos.finger2.currentX-pos.finger3.currentX-50>-120 &&
       pos.finger2.currentX-pos.finger3.currentX-50<70 &&
       pos.finger3.currentX-pos.finger4.currentX-30>-120 &&
       pos.finger3.currentX-pos.finger4.currentX-30<70
    )
    return 'PAPER'
    
    else console.log('nothing');
}

function playRound(){
    let result = [],
        player1 = detectFigure(), // this calls for user input
        player2 = computerSelection(); // this generates computer's random choice

    setOpponentFigure(player2);

    result = whoWins(player1, player2); //call whoWins function and assign result in the form of [x,y]
    updateScore(result);
}

function computerSelection(){
    let seed = Math.random();
    if(seed<=0.33) return "ROCK"
    if(seed>0.33 && seed<=0.66) return "PAPER"
    if(seed>0.66) return "SCISSORS"
}

/*
function userSelection(){
    let figure = prompt("Type Rock/Paper/Scissors:").toUpperCase(); //ask user for the input
    if(figure=="ROCK" || figure=="PAPER" || figure=="SCISSORS") return figure //validate if the input is correct
    else{
        alert("invalid input");
        userSelection(); //call the function again in case it's invalid
    }
}
*/

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
    let playerScore = document.querySelector('.playerScore'),
        computerScore = document.querySelector('.computerScore');

    scoreBoard[0]=scoreBoard[0]+result[0];
    scoreBoard[1]=scoreBoard[1]+result[1];

    player1_Score=scoreBoard[0];
    player2_Score=scoreBoard[1];

    console.log(`PLAYER: ${player1_Score}, COMPUTER: ${player2_Score}`);
    playerScore.innerHTML = player1_Score;
    computerScore.innerHTML = player2_Score;
    
}

