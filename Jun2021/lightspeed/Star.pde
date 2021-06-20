
int ghostOffset = 1;
float ghostRes = .1;
class Star {
 
   private float x;
   private float y;
   private float velocity;
   private float light;
   private float angleZ;
   private float angleY;
   private float z;
   
   public Star( float originX, float originY, float originZ) {
     light = 100;
     velocity = random(.02, .047);
     x = originX;
     y = originY;
     z = originZ;
     
     if (isLatteral) 
       calculateAnglesLatteralExpansion();
     else
       calculateAnglesCenterExpansion();
   }
   
   void display() {
     
     float distance = pow( pow(x,2) + pow(y,2) + pow(z,2), (float)1/3);
     float maxLen = map( velocity, .01, .03, 100, 2500);
     float trailLen = map( distance, 0, maxDistance, 0, maxLen);
     float trailWidth = trailLen/111 + .34;
     
     //if (isTestingStars) {
     //  if (abs(z) < abs(x)) {
          
     //    fill(327, 100, 100);
     //  } else {
     //    //return
     //    fill(360);
     //  }
     //} else {
     
     //  fill(light);
     
     //}
     
     noStroke();
     
     
     
     for ( float i = .1; i < ghostOffset; i += ghostRes ) {
       
       pushMatrix();

         translate(x*(1+i/100), y*(1+i/100), z*(1+i/100));
         
         rotateY(angleY);
         rotateZ(angleZ);
         fill( (distance*5 + i) % 360, map(light,0,350,77,0), light);
         ellipse(0, 0, trailLen+i/10, trailWidth+i);
       popMatrix();
       
     }
           
     pushMatrix();
       translate(x, y, z);
       ellipse(0, 0, trailLen/10, trailWidth*5);
     popMatrix(); 
     
     if (!isTestingStars) {
      if (isLatteral) 
        this.updatePosLatteral();
      else
        this.updatePosCenter();
     
     }
     //calculateAnglesCenterExpansion();
   }
   
   void updatePosCenter() {
     
      x *= 1 + velocity * speed;
      y *= 1 + velocity * speed;
      z *= 1 + velocity * speed;
      light = light < 350 ? light * (1 + velocity*7.7) : 350;
      
      if ( z > width*10 || z < -width*10  || y > height*10 || y < -height*10 || x > width*10 || x < -width*10 ) this.reset();
   }
   
   void updatePosLatteral() {
     
      z += ((1+velocity) * speed * 37) + y/1000 + x/1000;
      if (velocity < .03) velocity+=speed/2222;
      light = light < 255 ? light * (1 + velocity*2) : 255;
      
      if ( z > width*1.5 || z < -width*1.5  || y > height*10 || y < -height*10 || x > width*10 || x < -width*10 ) this.reset();
   }
   
   void reset() {
     
     light = 7;

     float 
       ranAngle = random(100),
       radius = isLatteral ? 5 :25,
       randomX1 = (cos(ranAngle) * radius),
       randomY1 = (sin(ranAngle) * radius),
       randomX2 = (cos(ranAngle) * radius * 4),
       randomY2 = (sin(ranAngle) * radius * 4),
       ranNum = random(1, 17);

      x =  (randomX2 * ranNum) + (randomX1 * ranNum) * random(1);
      y =  (randomY2 * ranNum) + (randomY1 * ranNum) * random(5);
      z =  isLatteral ? random(-2000, -1000) : random(-500, 500);
      velocity = random(.01, .025);
     
     if (isLatteral) 
       calculateAnglesLatteralExpansion();
     else
       calculateAnglesCenterExpansion();
   }
   
   void calculateAnglesCenterExpansion() {
     
     if ((abs(z) < abs(x))) {
       float hypoZ = sqrt( pow(x,2) + pow(y,2));// + pow(z,2)
       float trigValZ = y/hypoZ; // 
       float resultAngleZ = asin(trigValZ); //acos atan asin
       
       angleZ = resultAngleZ;
     } else {
       float hypoZ = sqrt( pow(z,2) + pow(y,2));// + pow(z,2)
       float trigValZ = y/hypoZ; // 
       float resultAngleZ = asin(trigValZ); //acos atan asin
       
       angleZ = resultAngleZ;

     }
     
     //----------------------------------------------------------------
     
     float hypoY = sqrt( pow(x,2) + pow(z,2));// + pow(z,2)
     float trigValY = x/hypoY; // 
     float resultAngleY = asin(trigValY) - PI/2; //acos atan asin
     
     if (z>=0) resultAngleY = -resultAngleY;
     angleY = -resultAngleY;
     
   }
      
   void calculateAnglesLatteralExpansion() {
   
     float hypoZ = sqrt( pow(x,2) + pow(y,2));// + pow(z,2)
     
     float trigVal = x / hypoZ;
     
     float resultAngleZ = asin(trigVal) + PI/2;
     
     angleZ = y >= 0 ? -resultAngleZ : resultAngleZ;

     //----------------------------------------------------------
        
     float hypoY = sqrt( pow(x,2) + pow(z,2));// + pow(z,2)
     
     trigVal = x/x/y/hypoY; 
     
     float resultAngleY = asin(trigVal) + PI/2;
     
     if (z>=0) resultAngleY = -resultAngleY;
     
     if (x<=0) resultAngleY = -resultAngleY;
     
     angleY = resultAngleY;
   }
   
}
