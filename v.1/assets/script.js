const getCodeInput = document.querySelector(".input-code input");
const getCodeBtn = document.querySelector(".input-code button");
const secretBtn = document.querySelector(".secret-btn a");
const secretP = document.querySelector(".secret-btn p");
let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
console.log(width);
if (width < 800) {
    alert("This site doesn't support mobile devices!");
    document.querySelector(".hidden").classList.add("hideElement");
    window.close();
}

getCodeBtn.onclick = () => {
    let theCode = getCodeInput.value;
    if (theCode === "petrichor") {
        secretBtn.classList.add("appear");
        secretBtn.setAttribute('href', "https://defrein.github.io/v.1/assets/mx27082021/ily.html");
        secretP.classList.remove("appear");
    } else if (theCode === "starrysky") {
        secretBtn.classList.add("appear");
        secretBtn.setAttribute('href', "https://defrein.github.io/v.1/assets/qx12092021/hbd.html");
        secretP.classList.remove("appear");
    } else {
        secretP.classList.add("appear");
        secretBtn.classList.remove("appear");
    }
    getCodeInput.value = '';
}