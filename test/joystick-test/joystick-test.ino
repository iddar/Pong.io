void setup() {
  Serial.begin(9600);
}
 
void loop() { 
  Serial.print("{\"player\": 0 }\n");
  Serial.print("{\"player\": 1 }\n");
  Serial.print("{\"analog\": [0,1023] }\n");
  delay(250);
}

