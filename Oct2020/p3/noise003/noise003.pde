//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  //seeds for noise algorithm, can be randomized for unique image every render
  float nSeedX1 = 417.3939;
  float nSeedX2 = 777.777;
  float nSeedY1 = 3939.719;
  float nSeedY2 = 3141.5826;
  //width and height of canvas
  int WIDTH =3840;
  int HEIGHT = 2160;
  //tracker for how many frames have elapsed
  int frames = 0;
  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Point[] allPixs = new Point[WIDTH*HEIGHT];

//setup function that runs before render
void setup() {
  //set canvas size
  size(3840,2160); //h: 2160
  //set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);
  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141592 );
  //run function to fill allPixs array
  initalizePixels();
    noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  
  background(0); // reset screen
  loadPixels(); // load pixels needs to be ran to modify pixels array and changePixels()
  
  frames++; //iterate frame tracker
  
  //iterate seed values so animation image moves
  nSeedX1+=.007;
  nSeedY1+=.003;
  nSeedX2+=.007;
  nSeedY2+=.003;

  //itterate through all pixels/Points
  for ( int i = 0; i < allPixs.length; i++) {  

    //get basic info from current pixel    
    int pxNum = allPixs[i].pixelNum;
    int pxlX  = allPixs[i].calcX();
    int pxlY  = allPixs[i].calcY();

    float seedX = 0;
    float seedY = 0;
    if (allPixs[i].quad == 1 || allPixs[i].quad == 4 ) {
      seedX = nSeedX1;
      seedY = nSeedY1;
    } else {
      seedX = nSeedX2;
      seedY = nSeedY2;
    }

    //calculate noise with simplex noise method
    double xNoise = (((pxlX*1.5+100)+seedX)/(111+pxlY))+seedX;
    double yNoise = (((pxlY*1.5+100)+seedY)/(420+pxlX))+seedY;
    double calNoise = noise.noise2(xNoise,yNoise);

    //pixel saturation
    int pxSatur = 87;//int(Math.round(100*calNoise));

    //lightness calculation
    int pxLig = int( 
      Math.abs(
        Math.round( 100*calNoise )) )  - pxlX/50 ;
    
    //pixel hue calculation
    int pxColor = ( int(
      Math.round(
        1080*calNoise))+1080+frames*10
    )%360;
    
    //modify the individual pixel
    pixels[pxNum] = color(pxColor, pxSatur, pxLig);
    
  } 
  
  //update the pixel info
  updatePixels();

  saveFrame("../../../../../../Renders/noise002/img_#####.png");

 
}

void initalizePixels() {
  int count = 0;
  for ( int x = 0; x < WIDTH; x++) {
    for (int y = 0; y < HEIGHT; y++ ) {
      allPixs[count] = new Point(x,y);
      count++;
    }
  }
}
