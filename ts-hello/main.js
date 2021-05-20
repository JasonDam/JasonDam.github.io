// function log(message){
//     console.log(message);
// }
// var message = "hello world";
// log(message);
//var vs let
// function doSomething(){
//     for (var i = 0; i < 5; i++){
//         console.log(i);
//     }
//     console.log('Finally: ' + i);
// }
// function doSomething(){
//     for (let i = 0; i < 5; i++){
//         console.log(i);
//     }
//     console.log('Finally: ' + i);
// }
// Typing and enumerations
// let a: number;
// let b: boolean;
// let c: string;
// let d: any;
// let e: number[] = [1,2,3];
// const ColorRed = 0;
// const ColorGreen = 1;
// enum Color {Red = 0, Green = 1, Blue = 2};
// let backgroundColor = Color.Red;
// a = 1;
// a = 'a';
// let message;
// message ='abc';
// //doing the below gives the intellesense
// let endsWithC = (<string>message).endsWith('c');
// let alternativeWay = (message as string).endsWith('c');
//arrow function
// let log = function(message){
//     console.log(message);
// }
// let doLog = (message) => {
//     console.log(message);
// }
// let doLogShort = (message) => console.log(message);
//interfaces
// interface Point {
//     x: number,
//     y: number
// }
// let drawPoint = (point: Point) => {
// }
// //for if the function has too many variables
// drawPoint({
//     x:1,
//     y:2
// })
//Cohesion/Classes
// class Point {
//     x: number;
//     y: number;
//     draw(){
//     }
//     getDistance(another: Point){
//     }
// }
//Objects
// class Point {
//     x: number;
//     y: number;
//     draw(){
//         console.log('X: ' + this.x + ' Y: ' + this.y);
//     }
//     getDistance(another: Point){
//     }
// }
// let point = new Point();
// point.x = 1;
// point.y = 2;
// point.draw();
//Constructors
// class Point {
//     x: number;
//     y: number;
//     //optional parameters
//     constructor(x?: number, y?:number){
//         this.x = x;
//         this.y = y;
//     }
//     draw(){
//         console.log('X: ' + this.x + ' Y: ' + this.y);
//     }
// }
// let point = new Point();
// point.draw();
//Access Modifiers
// class Point {
//     private x: number;
//     private y: number;
//     //optional parameters
//     constructor(x?: number, y?:number){
//         this.x = x;
//         this.y = y;
//     }
//     draw(){
//         console.log('X: ' + this.x + ' Y: ' + this.y);
//     }
// }
// let point = new Point(1,2);
// point.draw();
//Access Modifiers in Constructors and Properties
var Point = /** @class */ (function () {
    //optional parameters
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.draw = function () {
        console.log('X: ' + this.x + ' Y: ' + this.y);
    };
    Object.defineProperty(Point.prototype, "X", {
        // getX(){
        //     return this.x;
        // }
        get: function () {
            return this.x;
        },
        // setX(value){
        //     if (value < 0){
        //         throw new Error('value cannot be less than 0');
        //     }
        //     this.x = value;
        // }
        set: function (value) {
            if (value < 0) {
                throw new Error('value cannot be less than 0');
            }
            this.x = value;
        },
        enumerable: false,
        configurable: true
    });
    return Point;
}());
var point = new Point(1, 2);
var x = point.X;
point.X = 10;
point.draw();
