let calculateButton = document.querySelector('button');

const taxPayable = function() {
    let taxableIncome = document.getElementById('input').value;
    let incomeTax;

    if (taxableIncome <= 18200) {
        incomeTax = 0;
    } else if (taxableIncome > 18200 && taxableIncome <= 45000) {
        incomeTax = (input - 18200) * 0.19;
    } else if (taxableIncome > 45000 && taxableIncome <= 120000) {
        incomeTax = 5092 + (taxableIncome - 45000) * 0.325;
    } else if (taxableIncome > 120000 && taxableIncome <= 180000) {
        incomeTax = 29467 + (taxableIncome - 120000) * 0.37;
    } else if (taxableIncome > 180000) {
        incomeTax = 51667 + (taxableIncome - 180000) * 0.45;
    }

    return incomeTax;
}

const addResponse = function() {
    let response = document.createElement('p');
    response.innerHTML = 'Your income tax payable for 2022/23 is estimated to be $' + taxPayable();
    document.querySelector('body').appendChild(response);
}

calculateButton.addEventListener('click', addResponse);