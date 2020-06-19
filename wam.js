var mole_interval;
var time_interval;
var time;
var score;
var items = [ 
    ".item1", ".item2", ".item3",
    ".item4", ".item5", ".item6",
    ".item7", ".item8", ".item9" ];
var highscore = 0;

$(document).ready(function(){
    if (localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore');
    } 

    $('#scoreboard').append('<p>your high score: ' + highscore + '</p>');

    $('.button').click(function(){
        $('#score-text').text('score:');
        time = 60; 
        score = 0; 
        $('#timer-val').text("60"); 
        $('#score-val').text("0");
        startTimer(); 
    })
})

$(document).ready(function(){
    $('.item1').click(function(){
        processClick('.item1');
    })
    $('.item2').click(function(){
        processClick('.item2');
    })
    $('.item3').click(function(){
        processClick('.item3');
    })
    $('.item4').click(function(){
        processClick('.item4');
    })
    $('.item5').click(function(){
        processClick('.item5');
    })
    $('.item6').click(function(){
        processClick('.item6');
    })
    $('.item7').click(function(){
        processClick('.item7');
    })
    $('.item8').click(function(){
        processClick('.item8');
    })
    $('.item9').click(function(){
        processClick('.item9');
    })
    
})

function processClick(item) {
    $(item).addClass("no-focus");
    if (!$(item).hasClass("mole")) {return;}
	//if mole, replace with hole and increment score 
	score += 10; 
    $('#score-val').text(score);
	$(item + ' img:last-child').remove(); 
	$(item).append('<img src="hole.png">');
	$(item).removeClass("mole");
}

function startTimer(){
    playGame(); 
    time_interval = setInterval(function() {
        time--;
        if (time <= 0) {
            endGame(); 
            clearInterval(time_interval);
            return;
        }else{
            $('#timer-val').text(time);
            if (time < 10) { $('#timer-val').addClass("countdown")}
        }
    }, 1000);
}

function playGame() {
    mole_interval = setInterval(function() {
        if (time <= 0) { 
			clearInterval(mole_interval);
		} else {
            var rand = Math.floor(Math.random() * 9);
            var item = items[rand];
            if (!$(item).hasClass("mole")){
                $(item + ' img:last-child').remove();
                $(item).append('<img src="mole.png">');
                $(item).addClass("mole");
            } else {
                $(item + ' img:last-child').remove();
                $(item).append('<img src="hole.png">');
                $(item).removeClass("mole");
            }
        }
    }, 500);
}

function endGame(){
    $('#timer-val').text(0);
    $('#score-text').text('final score:');
    $('#timer-val').removeClass('countdown');
    $('#timer-val').addClass('text-style');
    if (score > highscore) { 
        highscore = score; 
        $('#score-text').text('NEW HIGH SCORE');
    }
    window.localStorage.setItem('highscore', highscore);
    for(i=0; i<items.length; i++) {
        if($(items[i]).hasClass("mole")) {
            $(items[i] + ' img:last-child').remove();
            $(items[i]).removeClass("mole");
            $(items[i]).append('<img src="hole.png">');
        }
    }
}