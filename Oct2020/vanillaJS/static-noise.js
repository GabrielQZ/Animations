
const Noise = toxi.math.noise.simplexNoise.noise;
let seed1 = Math.random()*100;
let seed2 = Math.random()*100;

console.log(`seed 1: ${seed1}\nseed 2: ${seed2}\n`);

// alert('CONTROLS\nPress E to adjust object orientation\nPress S to toggle frame screen clear\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = height/6,

      timeForward = true,

      strokeW = 1,

      speed = .045,

      clearScreen = true,
      
      pauseAnimation = false,

      viewWidth = 1,
      viewHeight = width/2;

context.strokeStyle = 'white';
context.fillStyle = 'white';

context.lineWidth = strokeW;

canvas.style = `display: block;
                position: static;
                top: 0px;
                left: 0px;
                // cursor: none;
                margin:auto;
                background-color: black`;

document.body.style = `margin: 0`;

document.body.appendChild(canvas)

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
        case 'ArrowUp':
            speed = speed < 1 ? speed+.1 : 1;
        break;
        case "ArrowDown":
            speed = speed > .2 ? speed-.1 : .2;
    }

    
    
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/4, height/2)   
    context.rotate(Math.PI/2)

//ANIMAITON CYCLE

        render()

        function render() {

        if (timeForward && time < timeMax) {
            time+=speed
            // console.log('time++', time);
        } else if (timeForward && time >= timeMax) {

            
            time = 1.1
            seed1 = Math.random()*100
            seed2 = Math.random()*100
            // setTimeout(()=>{timeForward = false;}, 100)

        }

        // if(clearScreen) clearFullScreen()
        context.save()
        context.translate(-time*3.5+20,-viewHeight/2)
        createImg(time, 1)
        context.translate((time*4-20)*3.5/2,0)
        createImg(time, 2)

        context.restore()

        // return

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame,  0, render)
        }

      }

function createImg(s, num) { 

    // let mNoise = Noise(seed,seed+.1)*1;
    
    // context.save()

    s = -s;


    // context.translate(width/2-viewWidth/2,height/2-viewHeight/2)

    const pixSize = 1,
          nRes = time,
          transX = nRes == 77 ? s/30 : 0,
          seed = num === 1 ? seed1 : seed2;
    let xCount = 0;
    context.lineWidth = pixSize;

    for (let x = 0; x < viewWidth; x+=pixSize) {
        // console.log(x);
        let yCount = 0;

        for (let y = 0; y < viewHeight; y+=pixSize) {

          const offX = (mapNumber(nRes, 12+(time*Math.abs(x/100))/1.4, timeMax, 0, width*2)/nRes/4.2)+transX*9,
                offY = (mapNumber(nRes, (1+time/400)*(1+y*x/time*.1), timeMax, 0, height*2)/nRes/1.2),
                noiseX = ((xCount*10)/(nRes*3))+offX+seed,
                noiseY = ((yCount*10)/(nRes*19.7))+offY+seed,
                divid = time < 40 ? time : 40,
                light = ((Math.abs((Noise(noiseX, noiseY)*divid )) % divid)+(nRes/1.37)+5)-y/14;

            if (light > 1) {
                const color = (Math.abs((Noise(noiseX, noiseY)*divid ) % 10)*divid)+s*3-88;
                context.strokeStyle = `hsl(${color}, 40%, ${light}%)`; //Math.random()*100

               
                // console.log(x, y);
                context.beginPath()
                    context.moveTo(x,y)
                    context.lineTo(x+pixSize,y)
                    
                    context.moveTo(x,-y)
                    context.lineTo(x+pixSize,-y)
                context.stroke()
                
            }

            yCount++
            
        }

        xCount++
        
    }

    // context.restore()


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