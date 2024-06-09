var prompts = [
    {
        hole_direction: 'front',
        steps: 'III',
        rotation: 'CW',
        correct_answer: 'left'
    },
    {
        hole_direction: 'front',
        steps: 'V',
        rotation: 'CW',
        correct_answer: 'right'
    },
    {
        hole_direction: 'front',
        steps: 'III',
        rotation: 'CCW',
        correct_answer: 'right'
    },
    {
        hole_direction: 'front',
        steps: 'V',
        rotation: 'CCW',
        correct_answer: 'left'
    },
    {
        hole_direction: 'right',
        steps: 'III',
        rotation: 'CW',
        correct_answer: 'front'
    },
    {
        hole_direction: 'right',
        steps: 'V',
        rotation: 'CW',
        correct_answer: 'back'
    },
    {
        hole_direction: 'right',
        steps: 'III',
        rotation: 'CCW',
        correct_answer: 'back'
    },
    {
        hole_direction: 'right',
        steps: 'V',
        rotation: 'CCW',
        correct_answer: 'front'
    },
    {
        hole_direction: 'back',
        steps: 'III',
        rotation: 'CW',
        correct_answer: 'right'
    },
    {
        hole_direction: 'back',
        steps: 'V',
        rotation: 'CW',
        correct_answer: 'left'
    },
    {
        hole_direction: 'back',
        steps: 'III',
        rotation: 'CCW',
        correct_answer: 'left'
    },
    {
        hole_direction: 'back',
        steps: 'V',
        rotation: 'CCW',
        correct_answer: 'right'
    },
    {
        hole_direction: 'left',
        steps: 'III',
        rotation: 'CW',
        correct_answer: 'back'
    },
    {
        hole_direction: 'left',
        steps: 'V',
        rotation: 'CW',
        correct_answer: 'front'
    },
    {
        hole_direction: 'left',
        steps: 'III',
        rotation: 'CCW',
        correct_answer: 'front'
    },
    {
        hole_direction: 'left',
        steps: 'V',
        rotation: 'CCW',
        correct_answer: 'back'
    }
];
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
// ]

//var ANSWERS = ['lunar_dynamo', 'thermiotic_beam', 'iron_chariot', 'ravens_dive', 'dalamud_dive', 'meteor_stream'];
// var ANSWERS = ['left', 'right', 'front', 'back'];
// var answer = [];
// var inputAnswer = [];
var streakCounter = 0;
var correct = false;
// var lastPrompt = 0;
var timeLimit = 0;
var timeoutEnabled = false;
var timeoutHandle;
// var wrong = 0;

function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
}

function renderHoleDirectionImage(prompt, div) {
    let imageSrc = '';
    switch (prompt.hole_direction) {
        case 'front':
            imageSrc = 'assets/015369_hr1.png';
            break;
        case 'right':
            imageSrc = 'assets/015939_hr1.png';
            break;
        case 'left':
            imageSrc = 'assets/015940_hr1.png';
            break;
        case 'back':
            imageSrc = 'assets/015941_hr1.png';
            break;
        default:
            imageSrc = '';
    }

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.classList.add('m-3');
    div.appendChild(imageElement);
}

function renderStepsImage(prompt, div) { // not used at the moment, but may b
    let imageSrc = '';
    switch (prompt.steps) {
        case 'III':
            imageSrc = 'assets/016748_hr1.png';
            break;
        case 'V':
            imageSrc = 'assets/016747_hr1.png';
            break;
        default:
            imageSrc = '';
    }

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.classList.add('m-3');
    div.appendChild(imageElement);
}

function renderRotationImage(prompt, div) {
    let imageSrc = '';
    switch (prompt.rotation) {
        case 'CW':
            imageSrc = 'assets/CW.png';
            break;
        case 'CCW':
            imageSrc = 'assets/CCW.png';
            break;
        default:
            imageSrc = '';
    }

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.classList.add('m-3');
    div.appendChild(imageElement);
}

function renderImages(prompt) {
    const imagesContainer = document.getElementById('images-container');
    imagesContainer.innerHTML = '';
    renderHoleDirectionImage(prompt, imagesContainer);
    renderStepsImage(prompt, imagesContainer);
    renderRotationImage(prompt, imagesContainer);

}

let randomPrompt = getRandomPrompt();
renderImages(randomPrompt);
//
// let prompt = document.getElementById('prompt');
// let n = Math.floor(Math.random() * prompts.length);
// prompt.innerText = prompts[n].prompt;
// answer = prompts[n].a;
var nextButton = document.getElementById('next');

function resetButtonStyles() {
const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach((a) => {
        a.className = 'btn btn-primary';
    });
}
nextButton.onclick = () => {
    correct = false;
    resetButtonStyles();
    startTimerIfEnabled();
    randomPrompt = getRandomPrompt();
    renderImages(randomPrompt);
    console.log(randomPrompt);
}
//
//
// var nextButton = document.getElementById('next');
// nextButton.onclick = () => {
//     correct = false;
//     startTimerIfEnabled();
//
//     let prompt = document.getElementById('prompt');
//
//     prompt.className = 'd-inline';
//     ANSWERS.forEach((a) => {
//         console.log(a);
//         let answerButton = document.getElementById(a);
//         answerButton.className = 'btn btn-primary';
//     });
//
//     let n = 1 + Math.floor(Math.random() * (prompts.length-1));
//     n = (lastPrompt + n) % prompts.length;
//     lastPrompt = n;
//     prompt.innerText = prompts[n].prompt;
//     answer = prompts[n].a;
//     inputAnswer = [];
// }

var answerButtons = document.getElementById('answerButtons');
answerButtons.onclick = (e) => {
    if (e.target.id === 'answerButtons') return;
    console.log(e.target.id);

    let userAnswer = e.target.id;

    if (userAnswer === prompt.answer) {
        document.getElementById(userAnswer).className = 'btn btn-success';
        streakCounter++;
        correct = true;
    }
    else {
        e.target.className = 'btn btn-danger';
        streakCounter = 0;
    }
    let streak = document.getElementById('streak');
    streak.innerText = `Streak: ${streakCounter}`;
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
        streakCounter = 0;
        let streak = document.getElementById('streak');
        streak.innerText = `Streak: ${streakCounter}`;

        alert("Time out - You died");
    }
}