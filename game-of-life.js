const canvas = document.getElementById('game-of-life');
const ctx = canvas.getContext('2d');

const cellSize = 2;
const rows = Math.floor(canvas.height / cellSize);
const cols = Math.floor(canvas.width / cellSize);

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let grid = createEmptyGrid();
let isRunning = false;

function createEmptyGrid() {
    return new Array(rows * cols).fill(false);
}


function createGliderGun() {
    const emptyGrid = createEmptyGrid();

    const gliderGunCoords = [
        [5, 1], [5, 2], [6, 1], [6, 2], [5, 11], [6, 11], [7, 11], [4, 12], [3, 13], [3, 14], [8, 12], [9, 13], [9, 14], [6, 15], [4, 16], [5, 17], [6, 17], [7, 17], [6, 18], [8, 16], [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25], [3, 35], [4, 35], [3, 36], [4, 36],
    ];

    for (const [row, col] of gliderGunCoords) {
        const index = row * cols + col;
        emptyGrid[index] = true;
    }

    return emptyGrid;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < grid.length; i++) {
        if (grid[i]) {
            const row = Math.floor(i / cols);
            const col = i % cols;

            ctx.fillStyle = 'black';
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

function addGliderGunAt(row, col) {
    const gliderGunOffsets = [
        [0, 1], [0, 2], [1, 0], [1, 1], [0, 11], [1, 11], [2, 11], [-1, 12], [-2, 13], [-2, 14], [3, 12], [4, 13], [4, 14], [1, 15], [-1, 16], [0, 17], [1, 17], [2, 17], [1, 18], [3, 16], [-2, 21], [-1, 21], [0, 21], [-2, 22], [-1, 22], [0, 22], [-3, 23], [1, 23], [-4, 25], [-3, 25], [1, 25], [2, 25], [-2, 35], [-1, 35], [-2, 36], [-1, 36],
    ];

    for (const [dr, dc] of gliderGunOffsets) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            const index = newRow * cols + newCol;
            grid[index] = true;
        }
    }
}


function step() {
    const newGrid = createEmptyGrid();

    for (let i = 0; i < grid.length; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const neighbors = countNeighbors(row, col);

        if (grid[i]) {
            newGrid[i] = neighbors === 2 || neighbors === 3;
        } else {
            newGrid[i] = neighbors === 3;
        }
    }

    grid = newGrid;
}

function countNeighbors(row, col) {
    let count = 0;

    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;

            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                const index = newRow * cols + newCol;
                count += grid[index] ? 1 : 0;
            }
        }
    }

    return count;
}

function gameLoop() {
    if (isRunning) {
        step();
        draw();
    }

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    addGliderGunAt(row, col);
    draw();
});


document.getElementById('start').addEventListener('click', () => {
    isRunning = true;
});

document.getElementById('stop').addEventListener('click', () => {
    isRunning = false;
});

function createRandomGrid() {
    return new Array(rows * cols).fill(null)
        .map(() => Math.random() < 0.5);
}

document.getElementById('randomize').addEventListener('click', () => {
    grid = createRandomGrid();
    draw();
});

function clearGrid() {
    return createEmptyGrid();
}

document.getElementById('clear').addEventListener('click', () => {
    grid = clearGrid();
    draw();
});


draw();
gameLoop();
