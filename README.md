This project I will be creating a Wordle Game using HTML/CSS and Javasript.

The game will allow us to play against only one word "FAVOR" but we will design in a way that the game can easily be extended for other words that a user may be asked to guess.

When the game starts the user is presented with a grid of six rows with 5 boxes in each row. The objective of the game is for the user to guess the word the application has chosen, which in our case is FAVOR. Words can only be 5 letters long.

Initially a "Guess" button is disabled. Once a player enters 5 letters, the button is enabled. If the user removes a character, which they can to change, then the Guess button is disabled again. 

When a player types a letter, it appears in upper case within a box in the currently active row. At the start, the first row is active. If a user presses any key other than a letter, the keystrokes are ignored.

When a user clicks on the "Guess" button the currently active row becomes inactive and any further input by the user will not affect the details on that row. The next row becomes active unless the user has completed all six rows or has won the game.

Once the "Guess" button is clicked, each box in the currently active row changes to a green, yellow, or gray color. It is green if the entered letter is in the exact location as it appears in the word to be guessed. It will be yellow if the letter appears in a different position. It will be gray if the letter is not present in the word to be guessed.

For example, given the word FAVOR, if the user enters RAPID, then the five boxes will have the colors Yellow, Green, GRAY, GRAY, GRAY, respectively.

If the user enters the next guess as MAYOR, the colors will be Gray, Green, Gray, Green, Green, respectively, in the second row.

Once the player wins they can't enter any more guess and will have to quit the game.

If the player guesses on the first try, display "Amazing". If the player guesses on the second try, display "Splendid". If they guess on a third try, display "Awesome". Win on any other tries, display "Yay". If the user fails to guess after six tries, display "It was FAVOR, better luck next time". Of course, if the word being guessed is something other than FAVOR, it will appears instead on that display line.
