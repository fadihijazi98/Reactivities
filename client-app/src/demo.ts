let withInitalValueToIdentifeDataType = 41;
let thisWillTakeAnyDataType;
let thisWithCertainDataType : number;
let thisWithCollectionOfDataType: number, string;

interface ICar {
    color: string;
    type: string;
    max_speed: number;
    model: number;
    amount_of_wack?: string
}
const car1: ICar = {
    color: "red",
    type: "bmw",
    max_speed: 220,
    model: 2019,
    amount_of_wack: "0killo"
}
const car2: ICar = {
    color: "yellow",
    type: "marcedece",
    max_speed: 200,
    model: 2010,
}
const fun = (x:number ,y:number) => {
    return x*y;
}
export default ICar;
export const cars = [car1, car2];
