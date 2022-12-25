let form = document.querySelector('form');

// Income Tax
const incomeTax = function() {
    let taxableIncome = document.getElementById('input').value;
    let incomeTax = 0;

    if (taxableIncome > 18200 && taxableIncome <= 45000) {
        incomeTax += (taxableIncome - 18200) * 0.19;
    } else if (taxableIncome > 45000 && taxableIncome <= 120000) {
        incomeTax += 5092 + (taxableIncome - 45000) * 0.325;
    } else if (taxableIncome > 120000 && taxableIncome <= 180000) {
        incomeTax += 29467 + (taxableIncome - 120000) * 0.37;
    } else if (taxableIncome > 180000) {
        incomeTax += 51667 + (taxableIncome - 180000) * 0.45;
    }

    return incomeTax;
}

// Medicare Levy
const medicareLevy = function() {
    let taxableIncome = document.getElementById('input').value;
    let medicareLevy = 0;
    
    if (taxableIncome > 23365 && taxableIncome < 29207) {
        medicareLevy += (taxableIncome - 23365) * (0.02 * ((taxableIncome - 23365) / 5842));
    } else if (taxableIncome >= 29207) {
        medicareLevy += taxableIncome * 0.02;
    }

    return medicareLevy;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let incomeTaxString = incomeTax().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('income-tax').innerHTML = 'Your income tax payable for 2022/23 is estimated to be $' + incomeTaxString;

    let medicareLevyString = medicareLevy().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('medicare-levy').innerHTML = 'You will pay $' + medicareLevyString + ' in medicare levy';

    let totalTax = incomeTax() + medicareLevy();
    document.getElementById('total').innerHTML = 'Total = $' + totalTax;
});