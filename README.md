# ROCK | PAPER | SCISSORS
*(real hand edition)*

![ROCKPAPERSCISSORS](https://user-images.githubusercontent.com/97133099/153731169-586b100f-1701-4ba6-8147-e74233e56b31.gif)

As a form of practice I've added very unnecessary controls to a really simple game.

You can play a classic rock/paper/scissors against computer by actually forming the figures with the in-game hand.

## Info
- pure javascript
- the graphics are just divs with css styles (+ auto generated svg lines for adjustable fingers)
- grab the fingertips to move the fingers around
- the game recognizes:
  - PAPER: when all the fingers are protruded and slightly spread apart
  - ROCK: when all the fingers are inside the palm
  - SCISSORS: when index and middle fingers are protruded and slightly spread apart while ring and pinky are inside the palm (thumb position doesn't affect the recognition)
- there is a comfortable error margin so that the player doesn't have to be too accurate when positioning the fingers, however deformed figures won't pass
- there are limitations on fingers' movement (so that you can't break those virtual fingers while playing)
- opponent's moves are random generated
- hands' position adjusts with different screen sizes
- in case of buggy graphics just reload the page (svg behaviour seems to be quite unexpected from time to time when it's dynamically generated and moved around)
- might not work well on small mobile screens (it's hard to fit movable fingers in such small space)
