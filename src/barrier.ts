import { Position } from "./constants";

export class Barrier {
	body: Position[] = [];

	constructor(leftCornerPosition: Position, size: number) {
		let directionSet = new Set<string>();
		let firstCell = randInt(size);
		this.body.push({
			x: firstCell + leftCornerPosition.x,
			y: firstCell + leftCornerPosition.y
		})

		
		let elementCount = randInt(size * size);
		for(let i=0; i < elementCount; i++) {

			// Find the available neighbour cells and push to the set
			if(this.body.at(-1)!.x + 1 < size + leftCornerPosition.x ) {
				directionSet.add('right')
			} if(this.body.at(-1)!.x - 1 >= leftCornerPosition.x ) {
				directionSet.add('left')
			} if(this.body.at(-1)!.y + 1 < size + leftCornerPosition.y ) {
				directionSet.add('down')
			} if(this.body.at(-1)!.y - 1 >= leftCornerPosition.y) {
				directionSet.add('up')
			}

			let setSize = directionSet.size;
			let randomSetItemIndex = randInt(setSize);
			let element = [...directionSet][randomSetItemIndex];
			switch(element) {
				case 'up':
					this.body.push({
						x: this.body.at(-1)!.x,
						y: this.body.at(-1)!.y - 1
					})
					break;
				case 'down':
					this.body.push({
						x: this.body.at(-1)!.x,
						y: this.body.at(-1)!.y + 1
					})
					break;
				case 'right':
					this.body.push({
						x: this.body.at(-1)!.x + 1,
						y: this.body.at(-1)!.y
					})
					break;
				case 'left':
					this.body.push({
						x: this.body.at(-1)!.x - 1,
						y: this.body.at(-1)!.y
					})
					break;
			}

		}
	}

}

export function randInt(number: number) {
	return Math.floor(Math.random() * number)

}