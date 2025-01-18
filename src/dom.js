let playerScore = 0;
let computerScore = 0;

export const createBoard = (color, user) => {
    const gamesBoard = document.querySelector('.gamesboard-container');
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');
    gameBoard.style.backgroundColor = color;
    gameBoard.id = user;

    for(let i = 0; i < 100; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = i;
        gameBoard.appendChild(block);
    }

    gamesBoard.appendChild(gameBoard);
}


export function addShip(user, ship) {
    const allBoardBlocks = document.querySelectorAll(`#${user} div`);

    const width = 10;

    let isHorizontal = Math.random() < 0.5;
    let randomStartIndex = Math.floor(Math.random() * width * width);

    let validStart;
    if (isHorizontal) {
        if (randomStartIndex <= width * width - ship.length) {
            validStart = randomStartIndex;
        } else {
            validStart = width * width - ship.length;
        }
    } else {
        if (randomStartIndex <= width * width - width * ship.length) {
            validStart = randomStartIndex;
        } else {
            validStart = randomStartIndex - ship.length * width + width;
        }
    }
    let shipBlocks = []

    for (let i = 0; i < ship.length; i++) {
        if(isHorizontal) {
            shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
        }
        else {
            shipBlocks.push(allBoardBlocks[Number(validStart) + i * 10]);
        }
    }

    let valid;

    if(isHorizontal) {
        shipBlocks.every((_shipBlock, index) => {
            valid = shipBlocks[0].id % width !== width - (shipBlocks.length - (index + 1));
        })
    } else {
        shipBlocks.every((_shipBlock, index) => {
            valid = shipBlocks[0].id < 90 + (width * index + 1);
        })
    }

    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

    if(valid && notTaken) {
        shipBlocks.forEach((shipBlock) => {
            shipBlock.classList.add(ship.name);
            shipBlock.classList.add('taken');
        })
    }

    else {
        addShip(user, ship);
    }
}

function checkWin() {
    const gameInfo = document.querySelector('.game-info');
    if(playerScore === 17) {
        document.querySelector(".gamesboard-container").style.pointerEvents = 'none';
        gameInfo.textContent = 'You Won';
    }
    else if(computerScore === 17) {
        document.querySelector(".gamesboard-container").style.pointerEvents = 'none';
        gameInfo.textContent = 'Computer Won';
    }
}


function computerTurn() {
    const playerBlocks = document.querySelectorAll('#player .block');
    const availableBlocks = Array.from(playerBlocks).filter(block => !block.classList.contains('hit') && !block.classList.contains('miss'));
    const gameBoard = document.querySelector('#computer');
    gameBoard.style.pointerEvents = 'none';

    if (availableBlocks.length === 0) return; // No available blocks to attack

    // Randomly select a block
    const randomIndex = Math.floor(Math.random() * availableBlocks.length);
    const block = availableBlocks[randomIndex];

    // Check if the block contains a ship
    if (
        block.classList.contains('destroyer') ||
        block.classList.contains('carrier') ||
        block.classList.contains('submarine') ||
        block.classList.contains('patrol-boat') ||
        block.classList.contains('battleship')
    ) {
        block.classList.add('hit'); // Mark as hit
        computerScore += 1;
    } else {
        block.classList.add('miss'); // Mark as miss
    }

    // Disable further clicks on this block
    block.style.pointerEvents = 'none';
    gameBoard.style.pointerEvents = 'auto';

    checkWin();
}





export function hideComputerShips() {
    const allBoardBlocks = document.querySelectorAll('#computer .block');
    allBoardBlocks.forEach((block) => {
        if (
            block.classList.contains('destroyer') ||
            block.classList.contains('carrier') ||
            block.classList.contains('submarine') ||
            block.classList.contains('patrol-boat') ||
            block.classList.contains('battleship')
        ) {
            // Hide the ship by setting its background color to match the board
            block.classList.add('hide'); // Or match the board's background color
            block.style.border = '1px solid #ccc'; // Optional: Keep the border visible
        }
    });
}

export function checkForHits() {
    const computerBlocks = document.querySelectorAll('#computer .block');

    computerBlocks.forEach((block) => {
        block.addEventListener('click', () => {
            // Check if the block contains any ship class
            if (
                block.classList.contains('destroyer') ||
                block.classList.contains('carrier') ||
                block.classList.contains('submarine') ||
                block.classList.contains('patrol-boat') ||
                block.classList.contains('battleship')
            ) {
                block.classList.add('hit'); // Mark as hit
                block.classList.remove('hide');
                playerScore += 1;
            } else {
                block.classList.add('miss'); // Mark as miss
            }

            // Disable further clicks on this block
            block.style.pointerEvents = 'none';

            setTimeout(computerTurn, 500);

            checkWin();
        });
    });
}