//selectting  all required elements
const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".playerX"),
    selectOBtn = selectBox.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");
let tabGame = document.getElementById("#tabgold");


window.onload = () => {
    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all avaiable section's spans
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerX clicked
        playBoard.classList.add("show"); //show the playboard section on playerX clicked
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerO clicked
        playBoard.classList.add("show"); //show the playboard section on playerO clicked
        players.setAttribute("class", "players active player");
    }
}

let playerXIcon = "fas fa-times"; //class name cross icon
let playerOIcon = "far fa-circle"; //class name circle icon
let playerSign; //suppose player will be X
let runBot = true;

//user click function
function clickedBox(element) {
    // console.log(element);
    playerSign = "X";
    if (players.classList.contains("player")) { //id players element has contain .player
        element.innerHTML = `<i class="${playerOIcon}"></i>` //adding circle icon tag inside clicked element
        players.classList.add("active");
        playerSign = "O"; //if player will be O then we'll change the sign
        element.setAttribute("id", playerSign);

    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>` //adding cross icon tag inside clicked element
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); //calling the winner function
    playBoard.style.pointerEvents = "none"; //once user select then user can't select any other box until box select
    element.style.pointerEvents = "none"; //once user select any boc then than can't be selected again
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //generating random time delay so bot will delay randomly to select box
    setTimeout(() => {
        bot(runBot); //calling bot function
    }, randomDelayTime); //passing random delay time
}

//bot click function
function bot(runBot) {
    if (runBot) { //if runBot is true then run the following codes


        //first change the playerSign... if user has X value in id then bot will have O
        playerSign = "O";
        let array = []; //creating empty array... we'll store unselected box index in this array
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //if span has no any child element
                array.push(i); //inserting unclicked or unselected boxes inside array means that span has no child
                // console.log(i + " " + "has no child");
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
        if (array.length > 0) {
            if (players.classList.contains("player")) { //id players element has contain .player
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside clicked element
                players.classList.remove("active");
                //if user is O then the box id value will be X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);

            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside clicked element
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);

            }
            selectWinner(); //calling the winner function
        }
        allBox[randomBox].style.pointerEvents = "none"; //once bot select any box then user can't select or click on that box
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

//select the winner
function getClass(idname) {
    return document.querySelector(".box" + idname).id; //returning id name
}

function checkClasses(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkClasses(1, 2, 3, playerSign) || checkClasses(4, 5, 6, playerSign) || checkClasses(7, 8, 9, playerSign) ||
        checkClasses(1, 4, 7, playerSign) || checkClasses(2, 5, 8, playerSign) || checkClasses(3, 6, 9, playerSign) ||
        checkClasses(1, 5, 9, playerSign) || checkClasses(3, 5, 7, playerSign)) {
        console.log(playerSign + " " + "is the winner");
        //onece match won by someoen then stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(() => { //set delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); //700 ms delay

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        //if match has drawn
        //first we'll check all id... if all span has id no one won the game then we'll draw the game
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" &&
            getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => { //set delay to show result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700); //700 ms delay

            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}