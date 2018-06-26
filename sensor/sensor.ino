/*
  HC-SR04 NewPing Iteration Demonstration
  HC-SR04-NewPing-Iteration.ino
  Demonstrates using Iteration function of NewPing Library for HC-SR04 Ultrasonic Range Finder
  Displays results on Serial Monitor

  DroneBot Workshop 2017
  http://dronebotworkshop.com
*/

// This uses Serial Monitor to display Range Finder distance readings

// Include NewPing Library
#include "NewPing.h"

// Hook up HC-SR04 with Trig to Arduino Pin 10, Echo to Arduino pin 13
// Maximum Distance is 400 cm

#define TRIGGER_PIN  11
#define ECHO_PIN     12
#define MAX_DISTANCE 400
 
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

float duration, distance;

//int iterations = 3;

void setup() {
  Serial.begin (9600);
}

void loop() {
   
  duration = sonar.ping();
  
  // Determine distance from duration
  // Use 343 metres per second as speed of sound
  
  distance = (duration / 2) * 0.0344;
  
  // Send results to Serial Monitor
//  Serial.print("Distance = ");
  if (distance >= 400) {
    Serial.println("Too far");
  }
//  if (distance <= 2) {
//    Serial.println("Too close");
//    }
  else {
    Serial.println(distance);
//    Serial.println(" cm");
//    delay(500);
  }
  delay(500);
}
