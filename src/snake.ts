import { GRID_SIZE, Position } from './constants';


export class Snake {
	body: Position[] = [];
	color: string = 'black';
	direction: 'up' | 'down' | 'right' | 'left' = 'right';
	newDirection: typeof this.direction = 'right';
	alive: boolean = true;
	hasEaten: boolean = false;

	constructor() {
		// push the first 3 positions into the body array
		let center = Math.floor(GRID_SIZE / 2);
		for (let i = 0; i < 3; i++) {
			this.body.push({ x: center - i , y: center});
		}
	}

}
