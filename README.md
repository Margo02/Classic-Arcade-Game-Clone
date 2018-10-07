# Frogger Arcade Game Clone

## Game Description
The game is a variation of the classic [Frogger](https://en.wikipedia.org/wiki/Frogger) arcade game. This project is using the HTML5 canvas element and JavaScript canvas APIs.

In this game the goal of the player is to move across the gray bricks towards the water, without colliding into any one of the enemies bugs.The user score's increased by 10 points each time the player reaches the water. The player has 3 lives. The number of lives decrease each time the player collide with enemies.  

## Basic Game functionality
- Use arrow keys to move the player left, right, up and down
- The enemies move at varying speeds on the paved block portion of the game board
- Once the player collides with an enemy, the game is reset and the player moves back to the starting square.
- Score is reset to 0 when collision occurs
- Once the player reaches the water, score is increased by 10 points

## How to run the application
- Download GitHub zip file or clone the repository from Github:
  * zip file

```
 zip file https://github.com/Margo02/Classic-Arcade-Game-Clone.zip
```
   * git clone

```
git clone https://github.com/Margo02/Classic-Arcade-Game-Clone.git

```
- Open a browser window. Find the index.html file in your application's directory. Open the `index.html` file .

## Files description
* `index.html` project's main HTML file.
* `js/engine.js`  defines the canvas and the canvas rendering function for all resources and has not been modified. The engine is provided by Udacity.
* `js/resources.js` contains utility classes. The resources is provided by Udacity and has not been modified.
* `js/app.js` defines enemy and player objects, and code has been modified by me.
* `css/style.css` basic styles for the project.
* `images` images for the project.

## List of Resources
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
* https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
