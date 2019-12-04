let clockContainer;
let audioKnockOnDoor;
let startContainer;
let startButton;
let startTimeInput;
let interval;

function bindControls() {
    startContainer = document.getElementById("startContainer");
    clockContainer = document.getElementById("clock");
    startTimeInput = document.getElementById("startTimeInput");
    audioKnockOnDoor = document.getElementById("bonken"); 

    clockContainer.style.display = 'none';

    startButton = document.getElementById("startTimerButton");
    startButton.addEventListener("click", handleStartTimerClick);

    const now = new Date();
    const seconds = 10;
    let start = new Date(now.getTime() + (seconds * 1000));
    startTimeInput.value = getFormattedDateTime(start);
}

function getFormattedDateTime(t) {
    const year = t.getFullYear();
    const month = leadingZero(t.getMonth() + 1);
    const day = leadingZero(t.getDate());
    const hours = leadingZero(t.getHours());
    const minutes = leadingZero(t.getMinutes());
    const seconds = leadingZero(t.getSeconds());
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function leadingZero(number) {
    return number.toString().padStart(2, "0");
}

function handleStartTimerClick() {
    if (interval != null) {
        clearInterval(interval);
    }

    let countTo = new Date(startTimeInput.value).getTime();

    startContainer.style.display = 'none';
    clockContainer.style.display = 'block';

    countdown(clockContainer, countTo);
}

function getTimeLeft(to) {
    return ((to - new Date().getTime()) / 1000 | 0)
}

function formatClock(timeLeft) {
    const seconds = ((timeLeft % 60) + '').padStart(2, '0');
    const minutes = (((timeLeft / 60) | 0) % 60 + '').padStart(2, '0');
    const hours = ((timeLeft / 60 / 60 | 0) % 24 + '');
    const days = ((timeLeft / 60 / 60 / 24 | 0) + '');

    if (days > 0) {
        return `${days} days<br />${hours}:${minutes}:${seconds}`;
    }
    else {
        return `${hours}:${minutes}:${seconds}`;
    }
}

function countdown(element, to) {
    let timeLeft = getTimeLeft(to);
    if (timeLeft >= 0) {
        interval = setInterval(()=>{
            let timeLeft = getTimeLeft(to);

            if (timeLeft < 0) {
                clearInterval(interval);

                clockContainer.classList.add("hidden");

                setTimeout(function() {
                    audioKnockOnDoor.play();
                }, 2000)

                setTimeout(function() {
                    window.location.href = "poem.html";
                }, 7500);
                
                return;
            }

            element.innerHTML = formatClock(timeLeft);
        }, 1000);
    }
    else {
        element.innerHTML = 'Time has expired';
    }
}
