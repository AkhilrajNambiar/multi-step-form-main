let stepOneForm = document.querySelector('form.step-1-form');
let nameField = document.querySelector('input.name-input');
let emailField = document.querySelector('input.email-input');
let phoneField = document.querySelector('input.phone-input');
const emptyGamingPlan = {
    "name": "",
    "email": "",
    "phoneNumber": ""
};
let gamingPlan = emptyGamingPlan;

let toggleInputState = (isError, element, errorQuerySelector) => {
    if (isError) {
        element.classList.remove("default-state");
        element.classList.add("error-state");
        var errorLabel = document.querySelector(errorQuerySelector);
        errorLabel.style.display = "block";
    } else {
        element.classList.remove("error-state");
        element.classList.add("default-state");
        var errorLabel = document.querySelector(errorQuerySelector);
        errorLabel.style.display = "none";
    }
}

stepOneForm.addEventListener('submit', (event) => {
    event.preventDefault();
    var isAnyFieldEmpty = false;
    if (emailField.value == "") {
        toggleInputState(true, emailField, 'div.email-section p.error-label');
        isAnyFieldEmpty = true;
    } else {
        toggleInputState(false, emailField, 'div.email-section p.error-label');
    }
    if (nameField.value == "") {
        toggleInputState(true, nameField, 'div.name-section p.error-label');
        isAnyFieldEmpty = true;
    } else {
        toggleInputState(false, nameField, 'div.name-section p.error-label');
    }
    if (phoneField.value == "") {
        toggleInputState(true, phoneField, 'div.phone-section p.error-label');
        isAnyFieldEmpty = true;
    } else {
        toggleInputState(false, phoneField, 'div.phone-section p.error-label');
    }
    if (!isAnyFieldEmpty) {
        gamingPlan.name = nameField.value;
        gamingPlan.email = emailField.value;
        gamingPlan.phoneNumber = phoneField.value;
    }
});