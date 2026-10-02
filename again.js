const typingText = document.querySelector(".typing-text p")
const input = document.querySelector(".input")
const Mistake = document.querySelector(".mistakes span b")
const timeTag = document.querySelector(".time span b")
const cpmTag = document.querySelector(".CPM span")
const wpmTag = document.querySelector(".WPM span")
const Button = document.querySelector("button")

let Index = 0;
let mistakes = 0;
let is_typing = false;
let timer;
maxtime = 60
timeleft = maxtime

function randomPara() {
    const randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = ""
    paragraphs[randIndex].split("").forEach(text => {
        const span = document.createElement("span")
        span.textContent = text
        typingText.appendChild(span)

    });
    document.addEventListener("keypress", () => input.focus())
    document.addEventListener("click",()=> input.focus())
    typingText.querySelectorAll("span")[0].classList.add("active")

}
function inittyping() {
    const characters = typingText.querySelectorAll("span")
    const typeChar = input.value.split("")[Index]
    if (timeleft > 0 && Index < characters.length - 1) {
        if (!is_typing) {

            timer = setInterval(timeinit, 1000)
            is_typing = true
        }
        if (typeChar == null && Index > 0) {
            Index--
            if (characters[Index].classList.contains("incorrect")) {
                mistakes--
            }
            characters[Index].classList.remove("correct")
            characters[Index].classList.remove("incorrect")

        } else {

            if (characters[Index].textContent === typeChar) {
                characters[Index].classList.add("correct")

            } else {
                mistakes++
                characters[Index].classList.add("incorrect")
            }
            Index++
        }
        Mistake.textContent = mistakes
        let words = Index - mistakes
        cpmTag.textContent = words
        let wpm = Math.round((((Index - mistakes) / 5) / (maxtime - timeleft)) * 60)
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.textContent = wpm
        characters.forEach(span => span.classList.remove("active"))
        characters[Index].classList.add("active")

    } else {
        input.value = ""
        clearInterval(timer)

    }


}

function timeinit() {
    if (timeleft > 0) {
        timeleft--
        timeTag.textContent = timeleft


    } else {
        clearInterval(timer)
    }

}

function reset() {
    randomPara()
    input.value = ""
    wpmTag.textContent = 0
    cpmTag.textContent = 0
    timeleft = maxtime
    timeTag.textContent = timeleft
    Index = 0;
    mistakes = 0;
    is_typing = false;
    Mistake.textContent = mistakes
    clearInterval(timer)
    





}
randomPara()


input.addEventListener("input", inittyping)
Button.addEventListener("click", reset)

