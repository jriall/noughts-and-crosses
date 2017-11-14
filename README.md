# Noughts and Crosses Game

http://jamesriall.co.uk/noughts-and-crosses/

## The Project

A Noughts and Crosses Game in which the user can play as noughts or crosses against the computer in a series of games with the running scores tracked by session.

![ScreenShot](http://res.cloudinary.com/jamesriall/image/upload/v1469029606/noughts_and_crosses_mock_up_natdsd.png)

## The Logic

Player selects via a modal whether they wish to play as noughts or crosses and their answer results in either "X" or "0" being stored in a variable. Each of the HTML boxes is assigned a number from 1 to 9 (left to right, top to bottom). When a player clicks on on of the boxes, the program first checks against the remainingSquares array to see whether the square has not already been selected and if it hasn't, adds the value of that square to the playerSelection array and removes it from the remainingSquares array.

The computer's selection is made after a setTimeout interval of 700ms for a smoother gameplay experience. On a computer's turn we go throguh the same process as a player's turn, but rather than the selection being made by a player click, it is made by selecting a random number from the remainingSquares array.

After every player or computer turn we use the function checkVictory and victoryConditionsto test whether either computer or player have won the game by selecting three in a row. We also check for a tie. If either of these conditions are true then we display a tie, victory or loss modal to the player, ask them if they want to play again, and increment the relevant scoring tally.

Created in June 2017