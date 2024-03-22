const boxes = document.getElementsByClassName("box");
const result = document.getElementsByClassName("result")[0];
const reset = document.querySelector(".resetBtn");
const image = document.querySelector(".image");
const line = document.querySelector(".line");
const boxText = document.querySelectorAll(".gameBox");

const turnMusic = new Audio("./ting.mp3")

let isGameOver = false;
let turn = "X";

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}


// function to check for a win 
const checkWin = () => {
    const win = [
        [0, 1, 2, 16, 50, 0],
        [3, 4, 5, 50, 50, 0],
        [6, 7, 8, 84, 50, 0],
        [0, 3, 6, 50, 16, 90],
        [1, 4, 7, 50, 50, 90],
        [2, 5, 8, 50, 84, 90],
        [0, 4, 8, 50, 50, 45],
        [2, 4, 6, 50, 50, 135],
    ];

    win.forEach((el) => {
        const [x, y, z] = el;
        if ((boxText[x].innerText !== "") && (boxText[x].innerText === boxText[y].innerText) && (boxText[y].innerText === boxText[z].innerText)) {
            isGameOver = true;
            result.innerText = boxText[x].innerText + " Won";
            image.style.width = "100px";

            if (
                (
                    (boxText[0].innerText !== "") &&    
                    (boxText[0].innerText === boxText[4].innerText) &&
                    (boxText[4].innerText === boxText[8].innerText)
                ) || (
                    (boxText[2].innerText !== "") &&
                    (boxText[2].innerText === boxText[4].innerText) &&
                    (boxText[4].innerText === boxText[6].innerText)
                )
            ) {
                line.style.width = "110%";
                line.style.top = `${el[3]}%`;
                line.style.left = `${el[4]}%`;
                line.style.transform = `translate(-50%, -50%) rotate(${el[5]}deg)`;
            } else {
                line.style.width = "80%";
                line.style.top = `${el[3]}%`;
                line.style.left = `${el[4]}%`;
                line.style.transform = `translate(-50%, -50%) rotate(${el[5]}deg)`;
            }

        }
    })

}

// game logic 

Array.from(boxes).forEach((element) => {
    const boxText = element.querySelector(".gameBox");
    element.addEventListener("click", () => {
        if (boxText.innerText === "" && !isGameOver){
            boxText.innerText = turn;
            turn = changeTurn();
            turnMusic.play();
            checkWin();
            if (!isGameOver) {
                result.innerText = "Turn for " + turn;
            }
        }
    })
})


// Add onclick listener to reset button
reset.addEventListener("click", () => {
    Array.from(boxText).forEach((element) => {
        element.innerText = "";
    })
    isGameOver = false;
    result.innerText = "Turn for " + turn;
    image.style.width = "0px";
    line.style.width = "0px";
})