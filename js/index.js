const userNameInput = document.getElementById("userName");
const emailInput = document.getElementById("Email");
const passwordInput = document.getElementById("Password");
const loginError = document.getElementById("loginAlert");
const dataContainer = localStorage.getItem("inputs") ? JSON.parse(localStorage.getItem("inputs")) : [];
const logOutBtn = document.getElementById("logOutBtn");
const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");

const userNameAlert = document.getElementById("userNameAlert");
const emailAlert = document.getElementById("emailAlert");
const passwordAlert = document.getElementById("passwordAlert");
const emailAlertRegistered = document.getElementById("emailAlertRegistered");
const signUpSuccessMessage = document.getElementById("signUpSuccessMessage");

function clearAlertsClasses() {
    userNameAlert.classList.replace("d-block", "d-none");
    emailAlert.classList.replace("d-block", "d-none");
    passwordAlert.classList.replace("d-block", "d-none");
}

function clearFormAndValidation() {
    userNameInput.classList.remove("is-valid", "is-invalid");
    emailInput.classList.remove("is-valid", "is-invalid");
    passwordInput.classList.remove("is-valid", "is-invalid");

    userNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    clearAlertsClasses();
}

function signUpValues() {
    if (validateInputs(userNameInput) && validateInputs(emailInput) && validateInputs(passwordInput)) {
        var inputs = {
            name: userNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        };

        var existingEmails = dataContainer.map(function (input) {
            return input.email;

        });

        if (existingEmails.includes(inputs.email)) {
            emailAlertRegistered.classList.remove("d-none");
            emailInput.classList.add("is-invalid");
            return;
            
        }

        dataContainer.push(inputs);
        localStorage.setItem("inputs", JSON.stringify(dataContainer));
        clearAlertsClasses();
        signUpSuccessMessage.classList.add("text-success", "fw-bold", "bg-light");
        signUpSuccessMessage.innerHTML = "You have successfully signed up! You can log in now.";
        signUpSuccessMessage.classList.remove("d-none");
        clearFormAndValidation();
        emailAlertRegistered.classList.add('d-none')

    }
}

function signInValues() {
    var inputsLogin = {
        emailLogin: emailLogin.value,
        passwordLogin: passwordLogin.value,
    };

    const storedData = JSON.parse(localStorage.getItem("inputs"));
    let isValid = false;

    storedData.forEach((data) => {
        if (data.email === inputsLogin.emailLogin && data.password === inputsLogin.passwordLogin) {
            isValid = true;
        }
    });

    if (isValid) {
        emailLogin.value = "";
        passwordLogin.value = "";
        window.location.href = "home.html";
    } else {
        loginError.classList.remove("d-none");
    }
}

var welcomeMessage = localStorage.getItem("inputs");
if (welcomeMessage) {
    var userData = JSON.parse(welcomeMessage);
    var latestUser = userData.pop();
    var userName = latestUser.name;
    document.getElementById("welcomeMessage").innerHTML = `Welcome  ${userName}  You are now logged in.`;
}

function logOut() {
    window.location.href = "index.html";
}

function validateInputs(element) {
    const regex = {
        userName: /^[A-Z][A-Za-z]{4,15}$/,
        Email: /^[a-zA-Z._%+-/d]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
        Password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{8,20}$/,
    };

    const alertElement = getAlertElement(element.id);

    const isValid = regex[element.id].test(element.value);

    if (isValid) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        alertElement.classList.replace("d-block", "d-none");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        alertElement.classList.replace("d-none", "d-block");
    }

    return isValid;
}

function getAlertElement(id) {
    switch (id) {
        case "userName":
            return document.getElementById("userNameAlert");
        case "Email":
            return document.getElementById("emailAlert");
        case "Password":
            return document.getElementById("passwordAlert");
        default:
            return null;
    }
}