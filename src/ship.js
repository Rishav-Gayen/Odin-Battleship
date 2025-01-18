class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }
}

const destroyer = new Ship('destroyer', 3);
const submarine = new Ship('submarine', 3);
const patrolBoat = new Ship('patrol-boat', 2);
const carrier = new Ship('carrier', 5);
const battleship = new Ship('battleship', 4);

export const ships = [destroyer, submarine, patrolBoat, carrier, battleship];




