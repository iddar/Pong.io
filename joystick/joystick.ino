int pot1;
int pot2;

int pot1Last = 0;
int pot2Last = 0;

void setup() {
  Serial.begin(9600);
  attachInterrupt(0, player1, RISING);
  attachInterrupt(1, player2, RISING);
}
 
void loop() { 
  pot1 = map(analogRead(A0),1023,820,0,100);
  pot2 = map(analogRead(A1),815,1023,0,100);
  if(pot1 != pot1Last || pot2 != pot2Last){
    Serial.print("{\"analog\":[");
    Serial.print( pot1 );
    Serial.print(",");
    Serial.print( pot2 );
    Serial.print("]}\n");
    pot1Last = pot1;
    pot2Last = pot2;
  }
  delay(10);
}

void player1() {
  Serial.print("{\"player\": 0 }\n");
}

void player2(){
  Serial.print("{\"player\": 1 }\n");
}
