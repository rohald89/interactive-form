// Set focus to the name field on page load
document.querySelector('#name').focus();

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

