
const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random();

// alert('CONTROLS\nPress R to toggle object rotation\nPress S to toggle frame screen clear\nPress O to ( Hide / Show ) circles\nPress P to ( Hide / Show ) lines\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      timeMax = 157,
      
      time = timeMax,

      strokeW = 1,

      pauseAnimation = false,

      tiltWindow = true,

      colorIndex = 0,

      startColor = Math.random() * 360,
      
      greyScale = false,

      colorPairs = [['hotpink', 'lime'], ['lightsalmon', 'skyblue'], ['darkslategrey', 'lightgoldenrodyellow'], ['plum', 'yellow']];

      
context.lineWidth = strokeW;

canvas.style = ` display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto`;

canvas.style = `display: block;
                // position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto;
                background-color: black`;

document.body.style = `margin: 0`;

document.body.appendChild(canvas)

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    switch (input.code) {
       
        case 'KeyE':

            tiltWindow = !tiltWindow;
            clearFullScreen()
    
            break;
        case 'Space':

            pauseAnimation = !pauseAnimation;

            if (!pauseAnimation) {
                render()
            }
            
            break;
    }
    
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/2, height/2)

//ANIMAITON CYCLE

        render()

        function render() {

            clearFullScreen()

            createImg()

            if (time > 1) {
 
                seed+=.001
            
                time++
            } else if ( time <= 1){
            pauseAnimation = true;
                setTimeout(()=> { 
                    time = timeMax;  
                    clearFullScreen(); 
                    seed = Math.random(); 
                    startColor = Math.random() * 360; 
                    pauseAnimation = false; 
                    render()
                }, 2000)
            }
        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

function createImg() { 

    context.rotate(.002)

    for (let i = timeMax; i > 0; i-= .67) {
        
        const size = i;

        let mNoise = Noise(size/333+seed,size/333+seed)*(33*mapNumber(size, 0, timeMax, 1, 0)),
        light = mapNumber(size-40, 0, timeMax, 50, 100);
        context.lineWidth = 1.5
        context.strokeStyle = `hsl(${(size*7)-time*5}, 41%, ${light}%)`
        context.save()
        context.rotate(-mNoise/30)
        if (tiltWindow) context.rotate(Math.PI/2)
            mNoise/=2
            seven_meta_cubes(size, (mNoise)/2)
            seven_meta_cubes(size, (mNoise+Math.PI)/2)
            seven_meta_cubes(size, -(mNoise)/2)
            seven_meta_cubes(size, -(mNoise+Math.PI)/2)
        context.restore()
    }
}

function seven_meta_cubes(s, a) {

    let m = 6.93;

    context.save()

        context.translate(-s*m/4*1.07, 0)
        createRombi({size: s, angle: a})
        context.translate(s*m/4*1.07, 0)
        createRombi({size: s*1.5, angle: a*2})
        context.translate(s*m/4*1.07, 0)
        createRombi({size: s, angle: a})
        
    context.restore()

    context.save()

        context.translate(-s*m/8*1.0714, -s*m*Math.sqrt(3)/8*1.2)
        createRombi({size: s, angle: a})
        context.translate(0, s*3*1.2)
        createRombi({size: s, angle: a})
        
    context.restore()

    context.save()

        context.translate(s*m/8*1.0714, -s*m*Math.sqrt(3)/8*1.2)
        createRombi({size: s, angle: a})
        context.translate(0, s*3*1.2)
        createRombi({size: s, angle: a})
        
    context.restore()

}

function createRombi(rombiObj) {
    const {size, angle} = rombiObj;
    context.save()

    if (angle) context.rotate(angle);
        context.beginPath()
        context.arc(0,0,size,0,Math.PI*2)

    context.save()
        context.beginPath()
        context.moveTo(size/2,0);
        context.lineTo(0,-size)
        context.lineTo(-size/2,0)
        context.lineTo(0,size)
        context.lineTo(size/2,0)
            context.stroke()
    context.restore()

    context.restore()
}


function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};