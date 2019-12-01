let clockContainer;
let audioKnockOnDoor;

function bindControls() {
    let countTo = new Date(clock.dataset.date).getTime();
    clockContainer = document.getElementById("clock");
    countdown(clockContainer, countTo);

    audioKnockOnDoor = document.getElementById("bonken"); 
}


function getTimeLeft(to) {
    return ((to - new Date().getTime()) / 1000 | 0)
}

function countdownOver(interval, element) {
    clearInterval(interval);
    audioKnockOnDoor.play();

    setTimeout(function() {
        window.location.href = "poem.html";
    }, 7000);
}

function countdown(element, to) {
    let timeLeft = getTimeLeft(to)
    if (timeLeft >= 0) {
        interval = setInterval(()=>{
            let timeLeft = getTimeLeft(to)
            if (timeLeft < 0) {
                countdownOver(interval, element)
                return
            }
            const seconds = ((timeLeft % 60) + '').padStart(2, '0')
            const minutes = (((timeLeft / 60) | 0) % 60 + '').padStart(2, '0')
            const hours = ((timeLeft / 60 / 60 | 0) % 24 + '')
            const days = ((timeLeft / 60 / 60 / 24 | 0) + '')
            let times = [
                {
                    number : days,
                    text : `Day${days!=1?'s':''}`
                },
                {
                    number : hours,
                    text : `:`
                },
                {
                    number : minutes,
                    text : `:`
                },
                {
                    number : seconds,
                    text : `:`
                },
            ]

            if (days > 0) {
                element.innerHTML = `${days} days<br />${hours}:${minutes}:${seconds}`;
            }
            else {
                element.innerHTML = `${hours}:${minutes}:${seconds}`;
            }
        }, 1000)
    }
}
