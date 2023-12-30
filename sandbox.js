let stepOneLogo = document.querySelector('div.sidebar-step-1 div.sidebar-logo');
let stepTwoLogo = document.querySelector('div.sidebar-step-2 div.sidebar-logo');
let stepThreeLogo = document.querySelector('div.sidebar-step-3 div.sidebar-logo');
let stepFourLogo = document.querySelector('div.sidebar-step-4 div.sidebar-logo');
let step1Section = document.querySelector('div.step-1-section');
let step2Section = document.querySelector('div.step-2-section');
let stepOneForm = document.querySelector('form.step-1-form');
let nameField = document.querySelector('input.name-input');
let emailField = document.querySelector('input.email-input');
let phoneField = document.querySelector('input.phone-input');
let toggler = document.querySelector('div.toggler');
let toggle = document.querySelector('div.toggle');
let planCards = [...document.querySelectorAll('div.plan-card')];
let planPricings = [...document.querySelectorAll('p.plan-pricing')];
let twoMonthsFree = [...document.querySelectorAll('p.two-months-free')];
let monthlyDuration = document.querySelector('p.monthly');
let yearlyDuration = document.querySelector('p.yearly');
let stepTwoForm = document.querySelector('form.step-2-form');
let backToStep1 = document.querySelector('p.back-to-step-1');
const emptyGamingPlan = {
    "name": "",
    "email": "",
    "phoneNumber": "",
    "planName": "",
    "planPricing": "",
    "duration": ""
};
let gamingPlan = emptyGamingPlan;
let monthlyPricings = ['$9/mo', '$12/mo', '$15/mo'];
let yearlyPricings = ['$90/yr', '$120/yr', '$150/yr'];

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
        stepOneLogo.classList.remove('active-logo');
        stepTwoLogo.classList.add('active-logo');
        step1Section.style.display = 'none';
        step2Section.style.display = 'block';
    }
});

planCards.forEach((card) => {
    card.addEventListener('click', () => {
        planCards.forEach((plan) => {
            plan.classList.remove('selected-plan');
        });
        card.classList.add('selected-plan');
    });
});

toggler.addEventListener('click', () => {
    toggle.classList.toggle('selected-left');
    toggle.classList.toggle('selected-right');
    if (toggle.classList.contains('selected-left')) {
        for (let i = 0; i <= 2; i++) {
            planPricings[i].innerText = monthlyPricings[i];
        }
        twoMonthsFree.forEach((element) => {
            element.style.display = 'none';
        });
        monthlyDuration.classList.add('selected-duration');
        yearlyDuration.classList.remove('selected-duration');
    }
    if (toggle.classList.contains('selected-right')) {
        for (let i = 0; i <= 2; i++) {
            planPricings[i].innerText = yearlyPricings[i];
        }
        twoMonthsFree.forEach((element) => {
            element.style.display = 'block';
        });
        yearlyDuration.classList.add('selected-duration');
        monthlyDuration.classList.remove('selected-duration');
    }
});

stepTwoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    planCards.forEach((plan) => {
        if (plan.classList.contains('selected-plan')) {
            var planName = document.querySelector(`${plan.tagName.toLowerCase()}.selected-plan div.plan-data p.plan-name`);
            var planPricing = document.querySelector(`${plan.tagName.toLowerCase()}.selected-plan div.plan-data p.plan-pricing`);
            gamingPlan.planName = planName.innerText;
            gamingPlan.planPricing = planPricing.innerText;
            if (toggle.classList.contains('selected-left')) {
                gamingPlan.duration = 'monthly';
            }
            if (toggle.classList.contains('selected-right')) {
                gamingPlan.duration = 'yearly';
            }
        }
    });
});

backToStep1.addEventListener('click', () => {
    stepTwoLogo.classList.remove('active-logo');
    stepOneLogo.classList.add('active-logo');
    step2Section.style.display = 'none';
    step1Section.style.display = 'block';
})