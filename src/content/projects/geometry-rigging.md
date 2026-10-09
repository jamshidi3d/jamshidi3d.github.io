---
title: Geometry-based rigging (Khosrobot)
date: 2018-09-09
theme: Rigging and animation
blurb: "Mechanical rigging driven by calculus and geometry, made for an AR project."
tags: [animation, tech-art, modeling]
tools: [Python, Blender, Unity]
visibility: video
image: /media/img/khosrobot.webp
video: /media/video/khosrobot.mp4
summary: "A precise and fast kind of rigging, fairly hard to implement, made for an AR project. It suits mechanical rigs best, since they are built from pseudo-primitive shapes, but it also works for organic characters with some approximation."
idea: "The rig applies calculus and geometric algorithms. The main wheel of the character rolls precisely on its bottom surface and never enters it; the surface has its own controller and can be transformed separately. The Newton-Raphson method solves the corresponding equations. The teeth push each other aside on collision using simple calculations. The rotation of the elbow hinges and the telescoping arms come from a set of 3D-geometry equations, and some linear algebra drives the crown, eyes and hands. Because such rigs are low-level and fast, they export easily to game engines and run well on mobile platforms."
related: [physirig, character-rig, tps-animation-system]
problem: "A mechanical character for an AR project needed a rig that was precise, fast and easy to export to engines and mobile platforms."
result: "A low-level, fast rig that exports easily to game engines and runs on mobile platforms."
role: "Built the rig myself."
---
