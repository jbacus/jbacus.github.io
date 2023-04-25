const canvas = document.getElementById('game-of-life');
const ctx = canvas.getContext('2d');

const cellSize = 10;
const rows = Math.floor(canvas.height / cellSize);
const cols = Math.floor(canvas.width / cellSize);

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let grid = createGliderGun();

function createEmptyGrid() {
    return new Array(rows).fill(null)
        .map(() => new Array(cols).fill(false));
}

function createGliderGun() {
    const gliderGunPattern = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const emptyGrid = createEmptyGrid();
    const offsetX = 1;
    const offsetY = 1;

    for (let row = 0; row < gliderGunPattern.length; row++) {
        for (let col = 0; col < gliderGunPattern[row].length; col++) {
            emptyGrid[row + offsetY][col + offsetX] = Boolean(gliderGunPattern[row][col]);
        }
    }

    return emptyGrid;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col]) {
                ctx.fillStyle = 'black';
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}

function step() {
    const newGrid = createEmptyGrid();
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const neighbors = countNeighbors(row, col);
            const isAlive = grid[row][col];

            if (isAlive) {
                newGrid[row][col] = neighbors === 2 || neighbors === 3;
            } else {
                newGrid[row][col] = neighbors === 3;
            }
        }
    }
    grid = newGrid;
}

function countNeighbors(row, col) {
    let count = 0;
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) continue;
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += grid[newRow][newCol] ? 1 : 0;
            }
        }
    }
    return count;
}

function gameLoop() {
    step();
    draw();
    setTimeout(gameLoop, 100);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    grid[row][col] = !grid[row][col];
    draw();
});

// Initiate game loop
draw();
setTimeout(gameLoop, 50);
