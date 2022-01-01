const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const creditCardField = document.querySelector('#cc-num');
const zipField = document.querySelector('#zip');
const ccvField = document.querySelector('#cvv');

const nameTest = /^[a-zA-Z\s]+$/i;
const emailTest = /^[^@]+@[^@.]+\.[a-z]+$/i;
const creditCardTest = /^\d{13,16}$/;
const zipTest = /^\d{5}$/;
const ccvTest = /^\d{3}$/;


// Set focus to the name field on page load
nameField.focus();

// Make Other field visible if the user selects Other from the title dropdown
document.querySelector('#title').addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        document.querySelector('#other-job-role').style.display = 'block';
    } else {
        document.querySelector('#other-job-role').style.display = 'none';
    }
});

// Hide color options if the user selects a t-shirt design that doesn't match the design theme
document.querySelector('#design').addEventListener('change', (e) => {
        const options = document.querySelectorAll('[data-theme]');
        options.forEach(option => {
            if(option.getAttribute('data-theme') === e.target.value) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
        document.querySelector('#color option').selected = true;
});

// Calculate and update the total cost of the checked activities
document.querySelector('.activities-box').addEventListener('change', (e) => {
    const activities = document.querySelectorAll('[data-cost]');
    let total = 0;
    activities.forEach(activity => {
        if(activity.checked) {
            total += parseInt(activity.getAttribute('data-cost'));
        }
    });
    document.querySelector('#activities-cost').innerHTML = `Total: $${total}`;
    validateActivities()
});

// Disable conflicting activities
const checkboxes = document.querySelectorAll('[data-day-and-time]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const dayAndTime = checkbox.getAttribute('data-day-and-time');
        const conflictingActivities = document.querySelectorAll(`[data-day-and-time="${dayAndTime}"]`);
        conflictingActivities.forEach(conflictingActivity => {
            if (e.target.checked && conflictingActivity !== e.target) {
                conflictingActivity.disabled = true;
            } else {
                conflictingActivity.disabled = false;
            }
        });
    });
});

// Make the activities section accessible to keyboard users by adding a visible focus state to the label
document.querySelectorAll('[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    });
    checkbox.addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    });
});

// Update payment section based on the selected payment method
document.querySelector('#payment').addEventListener('change', (e) => {
    const paymentOptions = document.querySelectorAll('#payment option');
    paymentOptions.forEach(option => {
        if (option.value === e.target.value) {
            document.querySelector(`#${option.value}`).style.display = 'block';
        } else {
            document.querySelector(`#${option.value}`).style.display = 'none';
        }
    });
});

// Validate the form
document.querySelector('form').addEventListener('submit', (e) => {
    validateInput(nameField, nameTest);
    validateInput(emailField, emailTest);
    validateActivities();
    validateInput(creditCardField, creditCardTest);
    validateInput(zipField, zipTest);
    validateInput(ccvField, ccvTest);
    if(document.querySelectorAll('.not-valid').length > 0) {
        e.preventDefault();
    }
});

function validateInput(input, regex) {
    console.log(input.closest('.credit-card'))
    if(input.closest('.credit-card')?.style.display === 'none') {
        input.classList.remove('error');
        input.closest('.label').className = '';
        input.nextElementSibling.style.display = 'none';
    } else if (regex.test(input.value)) {
        input.closest('label').className = 'valid'; // Add icon to label
        input.nextElementSibling.style.display = 'none'; // Hide error message
        input.classList.remove('error'); // Remove error class from input
    } else {
        input.closest('label').className = 'not-valid';
        input.nextElementSibling.style.display = 'block';
        input.classList.add('error');
    }
}

function validateActivities() {
    const activities = document.querySelectorAll('[type="checkbox"]:checked');
    if(activities.length) {
        document.querySelector('.activities').className = 'activities valid';
        document.querySelector('.activities-hint').style.display = 'none';
    } else {
        document.querySelector('.activities').className = 'activities not-valid';
        document.querySelector('.activities-hint').style.display = 'block';
    }
}