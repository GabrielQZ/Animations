let showCircles = true,
    angleShift = false,
    colorSwitch = 0,

    spaceSize = 100,

    colorSelect1 = [323, 180, 64],
    colorSelect2 = [300, 133, 32];;

document.addEventListener('keydown', userInputEvent, false);

function userInputEvent(input) {

    switch (input.code) {

        case "ShiftLeft":
        case "ShiftRight":

            angleShift = !angleShift;

            break;
        case "Space":

            showCircles = !showCircles;

            break;

        case "KeyC":

            console.log(colorSwitch);
            

            colorSwitch = colorSwitch < 3 ? colorSwitch+1 : 0;

            break;

        case "Comma":
        case "ArrowLeft":

            spaceSize = spaceSize > 2 ? spaceSize - 1 : 2;

            break;

        case "Period":
        case "ArrowRight":

            spaceSize++

            break;
    
        default:
            break;
    }
    
}

let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 30,

      time = 0;

        render()

      function render() {

          frames *= 1.0314

           time++

          let changeSize = frames;

          clearFullScreen()
  
          createFractal(frames)          

        // return
          setTimeout(window.requestAnimationFrame, 20, render)

      }


    function createTri(size, oX, oY, flipped) {

        context.save()

        if (flipped) {
            context.rotate(Math.PI)
            context.translate(0, -( Math.sqrt(3) * size))

            
        }

        if (showCircles) {
            context.beginPath()
        context.arc(0,0, size, 0, Math.PI*2)
        context.stroke()
        }
        

        context.beginPath()

        context.translate(oX, oY)

        context.beginPath()

        context.moveTo(0,0)
        context.rotate(Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.stroke()

        context.restore()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createFractal(size) {

        context.lineWidth = 2;

        context.save();

        context.translate(width/2, height/2);

        if (angleShift) {
            context.rotate(Math.PI/6)
        }

        for (let i = 0; i < 6; i++) {

            let triSize = width + size, count = 0;

            context.save()

            while (triSize > spaceSize) {

                if (triSize < width+1000) {

                    switch (colorSwitch) {
                        case 0:

                            context.strokeStyle =`hsl(0, 0%, ${triSize/4.2}%)`
                            
                            break;
                        case 1:

                            context.strokeStyle = `hsl(${time + triSize/23 + 155}, 100%, ${triSize/100 + 42}%)`
                            
                            break;
                        case 2:

                            context.strokeStyle = `hsl(${colorSelect1[Math.floor(count%3)]}, 100%, ${triSize/42 + 67}%)`
                            
                            break;
                        case 3:

                            context.strokeStyle = `hsl(${colorSelect2[Math.floor(count%3)]}, 100%, ${triSize/42 + 67}%)`
                            
                            break;
                    }

                    createTri(triSize,0,0);

                    createTri(triSize/2, 0, 0, true)
                }

                count++
                triSize/=2
            }

            context.restore()
            
            context.rotate(Math.PI/3)
            
        }


        
        context.restore();
    }

