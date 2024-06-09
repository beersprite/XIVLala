var prompts = [
    {
        hole_direction: 'front',
        steps: 'V',
        rotation: 'CCW',
        correct_answer: 'left'
    },
    // {
    //     prompt: 'O hallowed moon, take fire and scorch my foes!',
    //     a: ['lunar_dynamo', 'thermiotic_beam']
    // },
    // {
    //     prompt: 'O hallowed moon, shine you the iron path!',
    //     a: ['lunar_dynamo', 'iron_chariot']
    // },
    // {
    //     prompt: 'Blazing path, lead me to iron rule!',
    //     a: ['thermiotic_beam', 'iron_chariot']
    // },
    // {
    //     prompt: 'Take fire, O hallowed moon!',
    //     a: ['thermiotic_beam', 'lunar_dynamo']
    // },
    // {
    //     prompt: 'From on high I descend, the iron path to call!',
    //     a: ['ravens_dive', 'iron_chariot']
    // },
    // {
    //     prompt: 'From on high I descend, the iron path to walk!',
    //     a: ['ravens_dive', 'iron_chariot']
    // },
    // {
    //     prompt: 'From on high I descend, the hallowed moon to call!',
    //     a: ['ravens_dive', 'lunar_dynamo']
    // },
    // {
    //     prompt: "Fleeting light! 'Neath the red moon, scorch you the earth!",
    //     a: ['dalamud_dive', 'thermiotic_beam']
    // },
    // {
    //     prompt: 'Fleeting light! Amid a rain of stars, exalt you the red moon!',
    //     a: ['meteor_stream', 'dalamud_dive']
    // },
]

var ANSWERS = ['lunar_dynamo', 'thermiotic_beam', 'iron_chariot', 'ravens_dive', 'dalamud_dive', 'meteor_stream'];
var answer = [];
var inputAnswer = [];
var numCorrect = 0; // yeah yeah this naming is confusing
var correct = false;
var lastPrompt = 0;
var timeLimit = 0;
var timeoutEnabled = false;
var timeoutHandle;
// var wrong = 0;

let prompt = document.getElementById('prompt');
let n = Math.floor(Math.random() * prompts.length);
prompt.innerText = prompts[n].prompt;
answer = prompts[n].a;

var nextButton = document.getElementById('next');
nextButton.onclick = () => {
    correct = false;
    startTimerIfEnabled();

    let prompt = document.getElementById('prompt');

    prompt.className = 'd-inline';
    ANSWERS.forEach((a) => {
        console.log(a);
        let answerButton = document.getElementById(a);
        answerButton.className = 'btn btn-primary';
    });

    let n = 1 + Math.floor(Math.random() * (prompts.length-1));
    n = (lastPrompt + n) % prompts.length;
    lastPrompt = n;
    prompt.innerText = prompts[n].prompt;
    answer = prompts[n].a;
    inputAnswer = [];
}

var answerButtons = document.getElementById('answerButtons');
answerButtons.onclick = (e) => {
    if(e.target.id === 'answerButtons') {return;}
    console.log(e.target.id);
    let a = e.target.id;

    if(a === answer[inputAnswer.length]) {
        document.getElementById(a).className = 'btn btn-success';
        inputAnswer.push(a);

        ANSWERS.forEach((a) => {
            let answerButton = document.getElementById(a);
            a.className = 'btn btn-primary';
        });

        if(inputAnswer.length >= 2) {
            let prompt = document.getElementById('prompt');
            prompt.className = 'd-inline bg-success';

            numCorrect+=1
            correct = true;
        }
    } else {
        e.target.className = 'btn btn-danger';
        numCorrect = 0;
    }
    let streak = document.getElementById('streak');
    streak.innerText = `Streak: ${numCorrect}`;
}

function timerEnableToggled(checkbox)
{
    if(checkbox.checked == true) {
        document.getElementById("timeLimitInput").removeAttribute("disabled");
        timeoutEnabled = true;
        startTimerIfEnabled();
    } else {
        document.getElementById("timeLimitInput").setAttribute("disabled", "disabled");
        timeoutEnabled = false;
        resetTimer();
    }
}

function startTimerIfEnabled() {
    // Reset timer so that users don't fail twice
    resetTimer();

    if (timeoutEnabled) {
        timeLimit = parseInt(document.getElementById('timeLimitInput').value);
        timeoutHandle = setTimeout(failure, timeLimit * 1000);
    }
}

function resetTimer() {
    if (timeoutHandle != null) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
    }
}

function failure() {
    if (correct === false) {
        numCorrect = 0;
        let streak = document.getElementById('streak');
        streak.innerText = `Streak: ${numCorrect}`;

        alert("Time out - You died");
    }
}