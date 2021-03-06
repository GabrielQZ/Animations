
// single line commentflskafolsdk

window.onload = function() {
  const canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

   context.translate(width / 2, height /2);
    // context.rotate(.5)

    let p0 = {
                x: 0, y: -321
            },
        p1 = {
                x: 278, y: 160
            },
        p2 = {
                x: -278, y: 160
            };

let time = 0,
    distortion = .51;
    x = 0,
    scale = 0,
    timeSwitch = true;

    //rendering function loop
    window.requestAnimationFrame(function spin() {
         
        // context.rotate(Math.PI / 1.00);

        context.save()


        for (let i = 0; i < 4; i++) {
            fractal(p0, p1, p2, 2);

            
            
        }     
        context.restore()

        // context.rotate(Math.PI / 1000);

        time_keeping()

        console.log(time);
        
        setTimeout(window.requestAnimationFrame, 10, (spin));  

    })  

    function time_keeping() {

        if (time < 100 && timeSwitch) {

            distortion += .001;
            scale++
            time++

        } else if (time >= 100) {

            distortion = 1.51;
            timeSwitch = false
            time = 99;

        } else if (time < 0) {
            clear()

            distortion = .999;
            timeSwitch = true
            time = 10;
            
        } else if (time < 100 && !timeSwitch) {

            distortion -= .5
            scale--
            time--

        } 
        
    }

    //clear screen function
    function clear() { 
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }

    //create simple triangle
    function drawTri(p0, p1, p2) {

        context.beginPath(); 
        context.moveTo(p0.x * scale, p0.y * scale);
        context.lineTo(p1.x / scale, p1.y / scale);
        context.lineTo(p2.x / scale, p2.y / scale);
        context.fillStyle = 'hsl(' + (time * 13.3) + ', 100%, 60%)';
        context.fill(); 
        
    } 


    //recursive fractal function that can make triangluar fractal
    function fractal(p0, p1, p2, lim){
        if(lim > 0){
            
            // (1 + (Math.random() * 1));
            var pA = {
                    x: (p0.x + p1.x) / distortion,
                    y: (p0.y + p1.y) / distortion
                },
                pB = {
                    x: (p1.x + p2.x) / distortion,
                    y: (p1.y + p2.y) / distortion
                }, 
                pC = {
                    x: (p2.x + p0.x) / distortion,
                    y: (p2.y + p0.y) / distortion
                };
                fractal(p0, pA, pC, lim - 1);
                fractal(pA, p1, pB, lim - 1);
                fractal(pC, pB, p2, lim - 1);

            } 
            else {
            (drawTri(p0, p1, p2));
            }
    }

}




