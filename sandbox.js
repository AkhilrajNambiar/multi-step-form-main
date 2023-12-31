// Sidebar
let stepOneLogo = document.querySelector('div.sidebar-step-1 div.sidebar-logo');
let stepTwoLogo = document.querySelector('div.sidebar-step-2 div.sidebar-logo');
let stepThreeLogo = document.querySelector('div.sidebar-step-3 div.sidebar-logo');
let stepFourLogo = document.querySelector('div.sidebar-step-4 div.sidebar-logo');
// Step 1
let step1Section = document.querySelector('div.step-1-section');
let stepOneForm = document.querySelector('form.step-1-form');
let nameField = document.querySelector('input.name-input');
let emailField = document.querySelector('input.email-input');
let phoneField = document.querySelector('input.phone-input');
// Step 2
let step2Section = document.querySelector('div.step-2-section');
let toggler = document.querySelector('div.toggler');
let toggle = document.querySelector('div.toggle');
let planCards = [...document.querySelectorAll('div.plan-card')];
let planPricings = [...document.querySelectorAll('p.plan-pricing')];
let twoMonthsFree = [...document.querySelectorAll('p.two-months-free')];
let monthlyDuration = document.querySelector('p.monthly');
let yearlyDuration = document.querySelector('p.yearly');
let stepTwoForm = document.querySelector('form.step-2-form');
let backToStep1 = document.querySelector('p.back-to-step-1');
// Step 3
let step3Section = document.querySelector('div.step-3-section');
let addOnCards = [...document.querySelectorAll('div.add-on-card')];
let backToStep2 = document.querySelector('p.back-to-step-2');

const emptyGamingPlan = {
    "name": "",
    "email": "",
    "phoneNumber": "",
    "planName": "",
    "planPricing": "",
    "duration": "",
    "addOns": []
};
let gamingPlan = emptyGamingPlan;
let monthlyPricings = ['$9/mo', '$12/mo', '$15/mo'];
let yearlyPricings = ['$90/yr', '$120/yr', '$150/yr'];
let monthlyAddonPricings = ['+$1/mo', '+$2/mo', '+$2/mo'];
let yearlyAddonPricings = ['+$10/yr', '+$20/yr', '+$20/yr'];

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
            stepTwoLogo.classList.remove('active-logo');
            stepThreeLogo.classList.add('active-logo');
            step2Section.style.display = 'none';
            step3Section.style.display = 'block';
            for (let i = 0; i <= 2; i++) {
                let addOn = addOnCards[i];
                let addOnPricing = document.querySelector(`${addOn.tagName}.${addOn.classList[1]} p.add-on-pricing`);
                if (gamingPlan.duration == 'monthly') {
                    addOnPricing.innerText = monthlyAddonPricings[i];
                }
                if (gamingPlan.duration == 'yearly') {
                    addOnPricing.innerText = yearlyAddonPricings[i];
                }
            }
        }
    });
});

backToStep1.addEventListener('click', () => {
    stepTwoLogo.classList.remove('active-logo');
    stepOneLogo.classList.add('active-logo');
    step2Section.style.display = 'none';
    step1Section.style.display = 'block';
});

addOnCards.forEach(addOn => {
    addOn.addEventListener('click', () => {
        var activeCheckbox = document.querySelector(`${addOn.tagName}.${addOn.classList[1]} div.active-checkbox`);
        var defaultCheckbox = document.querySelector(`${addOn.tagName}.${addOn.classList[1]} div.default-checkbox`);
        let added = addOn.classList.toggle('selected-add-on');
        if (added) {
            activeCheckbox.style.display = 'flex';
            defaultCheckbox.style.display = 'none';
        } else {
            activeCheckbox.style.display = 'none';
            defaultCheckbox.style.display = 'flex';
        }
    });
});

step3Section.addEventListener('submit', (event) => {
    event.preventDefault();
    addOnCards.forEach((addOn) => {
        var addOnName = document.querySelector(`${addOn.tagName}.${addOn.classList[1]} div.add-on-data p.add-on-title`);
        var addOnDescription = document.querySelector(`${addOn.tagName}.${addOn.classList[1]} div.add-on-data p.add-on-subtitle`);
        var addOnPricing = document.querySelector(`${addOn.tagName}.${addOn.classList[1]} p.add-on-pricing`);
        if (addOn.classList.contains('selected-add-on')) {
            gamingPlan.addOns.push({
                "name": addOnName.innerText,
                "description": addOnDescription.innerText,
                "pricing": addOnPricing.innerText
            });
        }
    })
});

backToStep2.addEventListener('click', () => {
    stepThreeLogo.classList.remove('active-logo');
    stepTwoLogo.classList.add('active-logo');
    step3Section.style.display = 'none';
    step2Section.style.display = 'block';
});