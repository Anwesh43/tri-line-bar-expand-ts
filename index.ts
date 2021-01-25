const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 3
const scGap : number = 0.02 
const strokeFactor : number = 90 
const sides : number = 2
const delay : number = 20 
const colors : Array<string> = [
    "#3F51B5",
    "#f44336",
    "#AA00FF",
    "#4CAF50",
    "#E65100"
]
const backColor : string = "#bdbdbd"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.divideScale(scale, i, n)) * n 
    }
    
    static sinify(scale : number) {
        return Math.sin(scale * Math.PI)
    }
}