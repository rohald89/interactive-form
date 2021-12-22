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

document.querySelector('.activities-box').addEventListener('change', () => {
    // Calculate and update the total cost of the checked activities
    const activities = document.querySelectorAll('[data-cost]');
    let total = 0;
    activities.forEach(activity => {
        if(activity.checked) {
            total += parseInt(activity.getAttribute('data-cost'));
        }
    });
    document.querySelector('#activities-cost').innerHTML = `Total: $${total}`;

    // TODO: Disable conflicting activities
    const checkboxes = document.querySelectorAll('[data-day-and-time]');
     
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

