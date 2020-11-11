

class Star {
 
   private float x;
   private float y;
   private float velocity;
   private float light;
   private float angle;
   
   
   public Star( float originX, float originY) {
     light = 10;
     velocity = random(.01, .03);
     x = originX;
     y = originY;
     
     calculateAngle();
   }
   
   void display() {
     
     float distance = sqrt( pow(x,2) + pow(y,2));
     float maxLen = map( velocity, .01, .03, 50, 250);
     float trailLen = map( distance, 0, maxDistance, 0, maxLen);
     float trailWidth = trailLen/50 + .1;
     println(maxDistance);
     
     fill(light);
     pushMatrix();
     translate(x, y);
     rotate(angle);
     ellipse(0, 0, trailLen, trailWidth);
     popMatrix();
     
     this.updatePos();
   }
   
   void updatePos() {
     
      x *= 1 + velocity;
      y *= 1 + velocity;
      light = light < 255 ? light * (1 + velocity*2) : 255;
      
      if ( x > width/2 || x < -width/2 || y > height/2 || y < -height/2) this.reset();
   }
   
   void reset() {
     
     light = 10;

     float 
       ranAngle = random(100),
       radius = 5,
       randomX1 = (cos(ranAngle) * radius),
       randomY1 = (sin(ranAngle) * radius),
       randomX2 = (cos(ranAngle) * radius * 4),
       randomY2 = (sin(ranAngle) * radius * 4),
       ranNum = random(1, 17);

      x =  (randomX2 * ranNum) + (randomX1 * ranNum) * random(1);
      y =  (randomY2 * ranNum) + (randomY1 * ranNum) * random(5);
   
     calculateAngle();
   }
   
   void calculateAngle() {
   
     float hypotenuse = sqrt( pow(x,2) + pow(y,2));
     
     float trigVal = x / hypotenuse;
     
     float resultAngle = asin(trigVal) + PI/2;
     
     angle = y > 0 ? -resultAngle : resultAngle;
     
     
   }
   
}
