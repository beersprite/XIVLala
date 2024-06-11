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

var streakCounter = 0;
var correct = false;
var timeLimit = 0;
var timeoutEnabled = false;
var timeoutHandle;

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
    imageElement.classList.add('rounded-circle');
    imageElement.style = 'width: 150px; height: 150px; object-fit: cover; object-position: centered';
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

var nextButton = document.getElementById('next');
function resetButtonStyles() {
    const answerButtons = document.querySelectorAll('.answer-button');
    console.log(answerButtons)
    answerButtons.forEach((button) => {
        button.className = 'btn btn-outline-warning btn-lg answer-button';
        console.log(button)
    });
}

nextButton.onclick = () => {
    nextPrompt();
}

function nextPrompt() {
    correct = false;
    resetButtonStyles();
    startTimerIfEnabled();
    randomPrompt = getRandomPrompt();
    renderImages(randomPrompt);
    console.log(randomPrompt);
}

var answerButtons = document.getElementById('answerButtons');
answerButtons.onclick = (e) => {
    let userAnswer = e.target.id;

    console.log(randomPrompt.correct_answer)
    console.log('user clicou em',userAnswer)
    if (!userAnswer || userAnswer === "answerButtons") return;
    else if (userAnswer === randomPrompt.correct_answer) {
        document.getElementById(userAnswer).className = 'btn btn-success btn-lg answer-button';
        streakCounter++;
        correct = true;
    }
    else {
        e.target.className = 'btn btn-danger btn-lg answer-button';
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
    if (!correct) {
        streakCounter = 0;
        let streak = document.getElementById('streak');
        streak.innerText = `Streak: ${streakCounter}`;

        alert("Time out - You died");
    }
}