import './style.css';
import { Snake } from './snake';
import { cellSize, GRID_SIZE, Position} from './constants';
import { Barrier } from './barrier';
import { randInt } from './barrier';
import { Food } from './food';

let grid = document.querySelector<HTMLDivElement>('#game-grid')!;

let snake = new Snake();

createEventListeners();
drawSnake();
drawBarriers();
placeFoods();

setInterval(() => {
	// State update (logic, game mechanics)
	if(snake.alive) {
		moveOrDie(snake.newDirection)
	}

	// UI update
	drawSnake();
}, 500);


function moveOrDie (direction: Snake["direction"]){
	snake.direction = direction;
	let head = snake.body[0];
	switch(direction){
		case 'up':
			if(head.y === 0){
				snake.alive = false;
				break;
			}
			snake.body.unshift({x: head.x, y: head.y - 1});
			break;
		case 'down':
			if(head.y === GRID_SIZE - 1){
				snake.alive = false;
				break;
			}
			snake.body.unshift({x: head.x, y: head.y + 1});
			break;
		case 'left':
			if (head.x === 0){
				snake.alive = false;
				break;
			}
			snake.body.unshift({x: head.x - 1, y: head.y});
			break;
		case 'right':
			if (head.x === GRID_SIZE - 1){
				snake.alive = false;
				break;
			}
			snake.body.unshift({x: head.x + 1, y: head.y});
			break;
	}
	if(snake.alive && !snake.hasEaten) snake.body.pop();
}

function drawBarrier(body: Position[], variation: number) {
	for(let pos of body){
		let cell = document.createElement('div');
		cell.style.top = pos.y * cellSize + 'px';
		cell.style.left = pos.x * cellSize + 'px';
		cell.classList.add(`barrier-image${variation}`)
		cell.classList.add('barrier-cell');
		grid.appendChild(cell);
	
	}
}

function drawSnake(){
	removeSnake();
	for(let i=0; i < snake.body.length; i++){
		let cell = document.createElement('div');
		cell.style.top = snake.body[i].y * cellSize + 'px';
		cell.style.left = snake.body[i].x * cellSize + 'px';
		cell.style.backgroundColor = snake.alive ? snake.color : 'red';
		cell.classList.add('snake-cell');
		grid.appendChild(cell);
	
	}
}

function removeSnake(){
	let cells = document.querySelectorAll('.snake-cell');
	for(let i=0; i<cells.length; i++){
		cells[i].remove();
	}
}

function createEventListeners() {
	document.body.addEventListener('keydown', (event: KeyboardEvent) => {
		if(event.key == 'ArrowUp' && snake.direction != 'down') {
			snake.newDirection = 'up';
		}
		else if (event.key == 'ArrowRight' && snake.direction != 'left') {
			snake.newDirection = 'right';
		} else if (event.key == 'ArrowLeft' && snake.direction != 'right' ) {
			snake.newDirection = 'left';
		} else if (event.key == 'ArrowDown' && snake.direction != 'up') {
			snake.newDirection = 'down';
		}
	});

}

function drawBarriers() {
	let barrier;
	let position;

	for(let i=0; i < 10; i++) {
		let maxSize = Math.ceil(Math.random() * 6);

		position = {
			x: Math.floor(Math.random() * (GRID_SIZE - maxSize + 1)),
			y: Math.floor(Math.random() * (GRID_SIZE - maxSize + 1))
		}
		
		barrier = new Barrier(position, maxSize);
		let randomImageInt = randInt(2);
		drawBarrier(barrier.body, randomImageInt + 1)
	}

}

function placeFoods() {
	for(let i=0; i < 15; i++) {
		let position = {
			x: Math.floor(Math.random() * GRID_SIZE),
			y: Math.floor(Math.random() * GRID_SIZE )
		}
		let food = new Food(position);
		let cell = document.createElement('div');
		cell.style.top = food.position.y * cellSize + 'px';
		cell.style.left = food.position.x * cellSize + 'px';
		let variation = randInt(4)
		cell.classList.add(`food-image${variation}`)
		cell.classList.add('barrier-cell');
		grid.appendChild(cell);
	}	
}
