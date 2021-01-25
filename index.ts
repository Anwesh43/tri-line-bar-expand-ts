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

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawTriLineBarExpand(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        context.save()
        context.translate(w / 2, h)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1 - 2 * j, 1)
            DrawingUtil.drawLine(context, -w / 2, 0, -w / 2 + w * 0.5 * sf1, -h * 0.5 * sf1)
            DrawingUtil.drawLine(context, 0, 0, -w * 0.5 * sf2, 0)
            context.save()
            context.translate(-w / 2, 0)
            context.fillRect(0, -h * 0.5 * sf3, w / 10, h * 0.5 * sf3)
            context.restore()
            context.restore()
        }
        context.restore()
    }

    static drawTLBRNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        DrawingUtil.drawTriLineBarExpand(context, scale)
    }
}