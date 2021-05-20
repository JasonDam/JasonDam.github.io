export class Point {
    //optional parameters
    constructor(private _x?: number, private _y?:number){
    }

    draw(){
        console.log('X: ' + this._x + ' Y: ' + this._y);
    }

    // getX(){
    //     return this.x;
    // }

    get x(){
        return this._x;
    }

    // setX(value){
    //     if (value < 0){
    //         throw new Error('value cannot be less than 0');
    //     }
    //     this.x = value;
    // }

    set x(value){
        if (value < 0){
            throw new Error('value cannot be less than 0');
        }
        this._x = value;
    }
}