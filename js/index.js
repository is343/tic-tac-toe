"use strict";

var button1 = $('#1p');
var button2 = $('#2p');
var h1 = $('h1');
var x = $('#x');
var o = $('#o');
var r = $('#reset');
var f = $('.field');
var p = $('.players');
var grid = {};
var round = 0;
// var onePlayer;
var xPlayer;
var notGameOver = false;
var blink;
var winningGrid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function addButtonListeners() {
    // button1.on('click', function() {
    //     onePlayer = true;
    //     toggleHidden('first');
    //     toggleHidden('second');

    // });
    // button2.on('click', function() {
    //     onePlayer = false;
    //     toggleHidden('first');
    //     toggleHidden('second');
    // });
    x.on('click', function() {
        xPlayer = true;
        p.toggleClass('hidden');
        f.toggleClass('hidden');
        r.removeClass('hidden');
    });
    o.on('click', function() {
        xPlayer = false;
        p.toggleClass('hidden');
        f.toggleClass('hidden');
        r.removeClass('hidden');
        compPlay();
    });
    r.on('click', function() {
        reset();
    });
}

// when someone wins
function removeFieldListeners() {
    $('td').off();
}

function addFieldListeners() {
    $('td').on("click", function() {
        play($(this).attr('id'));
    });
}

function toggleHidden(str) {
    $("." + str).toggleClass("hidden");
}

// player turn
function play(whichBox) {
    // if not empty space, do nothing
    if (grid[whichBox] != null) {
        return;
    }
    round++;
    if (xPlayer) {
        var draw = "X";
        xPlayer = false;
    } else {
        var draw = "O";
        xPlayer = true;
    }
    grid[whichBox] = draw;
    $('#' + whichBox).text(draw);
    // check if game over
    if (endGame()) {
        return;
    }
    compPlay();
}

// computer
function compPlay() {
    round++;
    if (xPlayer) {
        var draw = "X";
        xPlayer = false;
    } else {
        var draw = "O";
        xPlayer = true;
    }
    // picking a valid space
    var rand = Math.floor(Math.random() * (9 - 1 + 1) + 1);
    while (grid[rand] != null) {
        rand = Math.floor(Math.random() * (9 - 1 + 1) + 1);
    }
    grid[rand] = draw;
    $('#' + rand).text(draw);
    // check if game over
    if (endGame()) {
        return;
    }
}

function endGame() {
    // checking if winning grid is present
    for (var i = 0; i < winningGrid.length; i++) {
        if (grid[winningGrid[i][0]] != null && grid[winningGrid[i][0]] === grid[winningGrid[i][1]] && grid[winningGrid[i][1]] === grid[winningGrid[i][2]]) {
            blink = setInterval(function() {
                h1.toggleClass('blink');
            }, 500);
            h1.text((grid[winningGrid[i][0]] + ' wins!'));
            removeFieldListeners();
            r.addClass('hidden');
            setTimeout(reset, 3000);
            return true;
        }
    }
    if (round >= 9) {
        f.toggleClass('blink');
        blink = setInterval(function() {
            f.toggleClass('blink');
        }, 500);
        h1.text('Draw!');
        removeFieldListeners();
        r.addClass('hidden');
        setTimeout(reset, 3000);
        return true;
    }
    return false;
}

function reset() {
    // reset variables
    xPlayer = undefined;
    round = 0;
    grid = {};
    // hide and unhide things
    p.toggleClass('hidden');
    f.toggleClass('hidden');
    r.addClass('hidden');
    // stop blinking
    clearInterval(blink);
    h1.removeClass('blink');
    f.removeClass('blink');
    // reset header
    h1.text('Tic Tac Toe');
    // reset playing field
    for (var i = 1; i <= 9; i++) {
        $('#' + i).text('');
    }
    addFieldListeners();
}

$(document).ready(function() {
    addButtonListeners();
    addFieldListeners();
});