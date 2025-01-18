import {createBoard, addShip, hideComputerShips, checkForHits} from './dom.js';
import {ships} from './ship.js';

createBoard('yellow', 'player');
createBoard('pink', 'computer');

const randomizeShips = document.querySelector(".randomize-button");
const startGame = document.querySelector(".start-button");
const gameInfo = document.querySelector(".game-info");
const restart = document.querySelector(".restart-game");
restart.style.pointerEvents = 'none';

for(let i = 0; i < ships.length; i++) {
    addShip('computer', ships[i]);
}

hideComputerShips();

ships.forEach((ship) => {
    addShip('player', ship);
})

randomizeShips.addEventListener('click', () => {
    const allBoardBlocks = document.querySelectorAll('#player div');

    Array.from(allBoardBlocks).forEach((block) => {
        block.className = 'block';
    })

    ships.forEach((ship) => {
        addShip('player', ship);
    })
})


startGame.addEventListener('click', () => {
    gameInfo.textContent = 'Game Started!';
    randomizeShips.style.pointerEvents = 'none';
    startGame.style.pointerEvents = 'none';
    checkForHits();
    restart.style.pointerEvents = 'auto';
})

restart.addEventListener('click', () => {
    window.location.reload();
})





