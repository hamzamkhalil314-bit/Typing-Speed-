const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".input");
const mistakeTag = document.querySelector(".mistakes span b");
const cpmTag = document.querySelector(".CPM span");
const wpmTag = document.querySelector(".WPM span");
const time = document.querySelector(".time span b");
const Button = document.querySelector("button");

let Index = 0;
let mistakes = 0;
let value = false;
let timer;

const maxTime = 60;
let timeLeft = maxTime;


// Random paragraph
function randomParagraph() {

    const randIndex = Math.floor(Math.random() * paragraphs.length);

    typingText.innerHTML = "";

    paragraphs[randIndex].split("").forEach(text => {

        const span = document.createElement("span");

        span.textContent = text;

        typingText.appendChild(span);
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
}


// Typing function
function inittyping() {

    const characters = typingText.querySelectorAll("span");
    const typechar = input.value.split("");

    // Start timer only once
    if (!value) {

        timer = setInterval(timeinit, 1000);

        value = true;
    }


    // Backspace
    if (typechar.length < Index) {

        Index--;

        if (characters[Index].classList.contains("incorrect")) {
            mistakes--;
        }

        characters[Index].classList.remove("correct");
        characters[Index].classList.remove("incorrect");
    }

    // New character typed
    else if (typechar.length > Index) {

        if (characters[Index].textContent === typechar[Index]) {

            characters[Index].classList.add("correct");

        } else {

            mistakes++;

            characters[Index].classList.add("incorrect");
        }

        Index++;
    }


    // Active character
    characters.forEach(span => {
        span.classList.remove("active");
    });


    if (Index < characters.length) {
        characters[Index].classList.add("active");
    }


    // Calculate CPM & WPM
    const time_used = maxTime - timeLeft;

    if (time_used > 0) {

        let cpm = Math.round(((Index - mistakes) / time_used) * 60);

        let wpm = Math.round(
            (((Index - mistakes) / 5) / time_used) * 60
        );

        cpm = cpm < 0 || !isFinite(cpm) ? 0 : cpm;

        wpm = wpm < 0 || !isFinite(wpm) ? 0 : wpm;

        cpmTag.textContent = cpm;
        wpmTag.textContent = wpm;
    }


    mistakeTag.textContent = mistakes;


    // Paragraph completed
    if (Index >= characters.length) {

        clearInterval(timer);

        input.value = "";
    }
}


// Timer
function timeinit() {

    if (timeLeft > 0) {

        timeLeft--;

        time.textContent = timeLeft;

    } else {

        clearInterval(timer);

        input.value = "";

        input.blur();
    }
}


// Try Again button
function btninIt() {

    clearInterval(timer);

    randomParagraph();

    input.value = "";

    Index = 0;
    mistakes = 0;

    value = false;

    timeLeft = maxTime;

    time.textContent = timeLeft;

    wpmTag.textContent = 0;
    cpmTag.textContent = 0;
    mistakeTag.textContent = 0;

    input.focus();
}


// Button
Button.addEventListener("click", btninIt);


// Typing
input.addEventListener("input", inittyping);


// Focus input
document.addEventListener("keydown", () => {
    input.focus();
});

document.addEventListener("click", () => {
    input.focus();
});


// First paragraph
randomParagraph();