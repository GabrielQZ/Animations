const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random()*1000,
    time = 0,
    pauseAnimation = false;

document.body.style = `margin: 0`;
canvas.style = `display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin: auto;
                background-color: black`;

document.body.appendChild(canvas);

context.translate(width/2, height/2);
context.strokeStyle = 'white';
context.lineWidth = 2;

const sin = Math.sin;
const cos = Math.cos;

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    switch (input.code) {
        case 'Space':

            pauseAnimation = !pauseAnimation;

            if (!pauseAnimation) {
                render()
            }
            
            break;
    }
    
}

//ANIMAITON CYCLE

const renderImage = () => {

    context.save()


        renderTrigShape()
    
        context.rotate(Math.PI/2)

        renderTrigShape()

        context.rotate(Math.PI/2)

        renderTrigShape()
    
        context.rotate(Math.PI/2)

        renderTrigShape()


    context.restore()
}

const renderTrigShape = () => {
    const mult = .2+time/3000 < .7 ? .2+time/3000 : .7,
          base = seed + time,
          cInt1 = 333,
          cInt2 = 393,
          cInt3 = time/92 < 21 ? time/92 : 21,
          cInt4 = 300,
          cInt5 = 130;

    let noise1 = Noise((base+111)/cInt4,(base+111)/cInt4)*cInt5,
        noise2 = Noise((base+777)/cInt4,(base+777)/cInt4)*cInt5,
        noise3 = Noise((base+333)/cInt4,(base+333)/cInt4)*cInt5,
        noise4 = Noise((base+444)/cInt4,(base+444)/cInt4)*cInt5,

        xTransN = Noise(base/1321+412,base/1321+1412),
        xTransN1 = Noise(base/1321+123,base/1321+5412),
        yTransN = Noise(base/1321+142,base/1321+412),
        yTransN1 = Noise(base/1321+124,base/1321+142);

    context.save()

    context.translate((xTransN-xTransN1)*173, (yTransN-yTransN1)*173)

    for (let i = 0; i < Math.PI*2; i+=Math.PI/cInt3) {

        const 
            x1 =  sin(i) * (cInt1*(1+(noise1/cInt2))),
            x2 =  noise2,
            y1 =  noise3,
            y2 =  cos(i) * (cInt1*(1+(noise4/cInt2))),

            maxDis = distance(cInt1*(1+cInt5/cInt2), 0, 0, cInt1*(1+cInt5/cInt2));

        let 
            color = (noise1/29)+(time/1.7)+(Math.abs(x1, y2)/4),
            light = mapNumber(distance(x1, x2, y1, y2), 30, maxDis, 10, 80);

            

        context.strokeStyle = `hsl(${color}, 100%, ${light}%)`;

        context.beginPath()
        context.moveTo(x1*mult, y1*mult)
        context.lineTo(x2*mult, y2*mult)
        context.stroke()

    }

    context.restore()

}
 
const render = () => {
    time++

    clearFullScreen()
    renderImage();

    context.rotate(-.003)

    if (!pauseAnimation) {
        setTimeout(window.requestAnimationFrame, 0, render)
    }

}


const clearFullScreen = () => {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

const distance = (x1,x2,y1,y2) => {

    const subX = x1 - x2,
          subY = y1 - y2;

    return Math.sqrt( Math.pow(subX, 2) + Math.pow(subY, 2));
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};


render()