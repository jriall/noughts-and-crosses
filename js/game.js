$(document).ready(function() {

  //Declare variables for whether player is noughts or crosses. By default player is X
  var player = "X";
  var computer = "O";

  //Declare variables for the scorecard of session history.
  var playerHistory = 0;
  var computerHistory = 0;
  var ties = 0;

  //declare variables for storing arrays for each game - player selection and
  //computer selection corrspond to which tiles they've chosen.
  //Remaining squares corresponds to the tiles yet to be chosen (square 1 is top right
  //and 9 is bottom left)
  var playerSelection = [];
  var computerSelection = [];
  var remainingSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  //If player selects noughts, change the selection variables then close the selection
  //modal once user selection is made.
  $("#noughts").click(function() {
    player = "O";
    computer = "X";
  });
  $(function() {
    $('#player-selection-modal').modal('toggle');
  });

  //declare a victory function - becomes true when either computer or player fulfil the conditions
  // - i.e. their selection array contains any of the combination of squares needed for a win.
  function victoryConditions(arr) {
    return ((arr.indexOf(1) >= 0 && arr.indexOf(2) >= 0 && arr.indexOf(3) >= 0) || (arr.indexOf(4) >= 0 && arr.indexOf(5) >= 0 && arr.indexOf(6) >= 0) || (arr.indexOf(7) >= 0 && arr.indexOf(8) >= 0 && arr.indexOf(9) >= 0) || (arr.indexOf(1) >= 0 && arr.indexOf(4) >= 0 && arr.indexOf(7) >= 0) || (arr.indexOf(2) >= 0 && arr.indexOf(5) >= 0 && arr.indexOf(8) >= 0) || (arr.indexOf(3) >= 0 && arr.indexOf(6) >= 0 && arr.indexOf(9) >= 0) || (arr.indexOf(1) >= 0 && arr.indexOf(5) >= 0 && arr.indexOf(9) >= 0) || (arr.indexOf(3) >= 0 && arr.indexOf(5) >= 0 && arr.indexOf(7) >= 0));
  }

  //function checks after each turn whether player or computer has met the victory
  //conditions. If they have then we show the corresponding modal (victory or loss),
  //add one to the relevant scorecard and display the updated score on the screen.
  function checkVictory() {
    if (victoryConditions(playerSelection) === true) {
      $('#victory-modal').modal('show');
      playerHistory++;
      $("#player-score").html("Player Score: " + playerHistory)
    } else if (victoryConditions(computerSelection) === true) {
      $('#loss-modal').modal('show');
      computerHistory++;
      $("#computer-score").html("Computer Score: " + computerHistory)
    }
  }

  //player selection of square - on click, first check if square is still in remaining
  // squares array - if it is, do nothing, if it isn't then remove that number from
  //numbers remaining array and add to player selection array. Finally, render the player
  //selection (nought or cross) into that box. Then run victory condition.
  //We also check for ties - if no one has won then we show the ties modal, add one
  //to the ties scorecard and update the display. We don't need to check for ties after
  //the computer's turn because player always goes first so will always pick last.

  $(".col-xs-4").click(function playerTurn() {
    var currentSelection = parseInt($(this).attr("value"));
    if (remainingSquares.indexOf(currentSelection) >= 0) {
      $("#" + currentSelection).html(player);
      playerSelection.push(currentSelection);
      var index = remainingSquares.indexOf(currentSelection);
      remainingSquares.splice(index, 1);
    }
    if (victoryConditions(playerSelection) === true) {
      checkVictory();
    } else {
      setTimeout(computerTurn, 700);
    }
    if (remainingSquares.length === 0 && victoryConditions(playerSelection) !== true && victoryConditions(computerSelection) !== true) {
      $('#tie-modal').modal('show');
      ties++;
      $("#ties").html("Ties: " + ties);
    }
  });

  //for the computers turn, we generate a random number between 1 and 9. Then we check whether
  //that box has already been selected. If it hasn't then this is the computers selection
  //and we deal with it in the same way as a player turn. If the computer's selected box has
  //already been chosen then we run the function again (until computer selects a free box).

  function computerTurn() {
    var computerChoice = Math.floor(Math.random() * 9) + 1;
    if (remainingSquares.indexOf(computerChoice) >= 0) {
      $("#" + computerChoice).html(computer);
      computerSelection.push(computerChoice);
      var index = remainingSquares.indexOf(computerChoice);
      remainingSquares.splice(index, 1);
      if (victoryConditions(computerSelection) === true) {
        checkVictory();
      }
    } else {
      computerTurn();
    }
  }

  //play again button displays whenever we have a win, loss or tie and once clicked it resets the game.
  $(".play-again-button").click(function gameReset() {
    playerSelection = [];
    computerSelection = [];
    remainingSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $(".col-xs-4").html("");
  });

});
