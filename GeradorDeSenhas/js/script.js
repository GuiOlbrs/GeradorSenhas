const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
coppyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input")
passIndicator = document.querySelector(".pass-indicator")
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.*+-#@<>"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => {
        if(option.checked){
            if(option.checked !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id]; 
            }else if(option.id === "spaces"){
                staticPassword += ` ${staticPassword} `;
            }else{
                excludeDuplicate = true;
            }    
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){
           if (!randomPassword.contains(randomChar) || randomChar == " "){
            randomPassword += randomChar;
           } else {
                i --;
            } 
        } else{
            randomPassword += randomChar;
        }
    }
   
    passwordInput.value = randomPassword;
}

const updatePassIndicator = () =>{
    passIndicator.id = lengthSlider.value <= 8 ? "fraca" : lengthSlider.value <= 16 ? "media" : "forte";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const coppyPassword = () => {
    
    navigator.clipboard.writeText(passwordInput.value);
    coppyIcon.innerText = "check";
    setTimeout(() => {
        coppyIcon.innerHTML = "copy_all";
    }, 1500)
}

coppyIcon.addEventListener("click", coppyPassword)
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

