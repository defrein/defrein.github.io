---
title: "VIDEF — Voice-Controlled Object Tracking Robot"
subtitle: "Say the color. Let the robot find it."
summary: "A Raspberry Pi robot that combines Indonesian voice commands, OpenCV color tracking, and motor control to find and follow a colored object."
order: 7
categories: ["robotics", "ai"]
label: "VOICE INTERACTION + COMPUTER VISION"
color: "cyan-soft"
technologies: ["Raspberry Pi", "Python", "OpenCV", "Speech Recognition", "GPIO"]
isPhoto: true
draft: false
link: "https://github.com/defrein/videf-object-detection-and-voice-recognition-robot"
linkLabel: "View source"
images:
  - src: "images/projects/showcase/videf-robot.webp"
    alt: "VIDEF robot with its wheeled chassis, control buttons, and onboard electronics."
    caption: "Original photograph from Portfolio v3, supplied for this project."
  - src: "images/projects/showcase/videf-robot-build.webp"
    alt: "VIDEF object tracking robot hardware prototype."
    caption: "Another view of the original robot prototype."
---

## The idea

VIDEF connects a spoken request with a physical action. A user names the color of a ball in Indonesian, and the robot uses camera feedback to locate and move toward the matching object.

## The implementation

- Recognizes Indonesian speech and interprets color-based commands such as “cari bola”.
- Uses OpenCV HSV color segmentation, image filtering, and contours to locate the target in the camera frame.
- Translates target position into forward, backward, left, right, and stop commands for the motors.
- Coordinates microphone input, spoken feedback, physical buttons, status LEDs, and Raspberry Pi GPIO.

## The prototype

The photos show the original robot hardware. This is a color-based tracking prototype; its speech interface uses an external recognition service. The portfolio presents the implementation and physical build, rather than a newly repeated hardware test.
