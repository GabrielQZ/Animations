
boolean isLatteral = false;

final float speed = 1;

final int maxStarCount = 5000;
final int startingTotal = (int) ( (float) maxStarCount * (float) .44);
  
int totalStars = 0;
  
Star[] stars;
  
class SpaceRender {

  
  
  void starGenesis() { //width, height
     
       Star[] startingStars = new Star[maxStarCount];
     
       for ( int i = 0; i < startingTotal; i++ ) {
         
         float oX = (float) (random(width) - width/2);
         float oY = (float) (random(height) - height/2);
         float oZ = random(-width*1.5, width*1.5);
         
         startingStars[i] = new Star( oX, oY, oZ );
         
       }
       
       totalStars = startingTotal;
   
       stars = startingStars;
  };
  
  void displayStars() {
     
    for (int i = 0; i < totalStars; i++) {
      Star s = stars[i];
      s.display();
    }
  }

  
}
