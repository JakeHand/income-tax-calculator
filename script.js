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

    return Math.round(incomeTax * 100) / 100;
}

// Low Income Tax Offset
const lito = function() {
    let taxableIncome = document.getElementById('input').value;
    let lito = 0;
    
    if (taxableIncome > 0 && taxableIncome <= 37500) {
        lito = 700;
    } else if (taxableIncome > 37500 && taxableIncome <= 45000) {
        lito = 700 - ((taxableIncome - 37500) * 0.05);
    } else if (taxableIncome > 45000 && taxableIncome <= 66667) {
        lito = 325 - ((taxableIncome - 45000) * 0.015);
    }

    return Math.round(lito * 100) / 100;
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

    return Math.round(medicareLevy * 100) / 100;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Income Tax Payable
    let incomeTaxString = incomeTax().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('income-tax').innerHTML = 'Income tax payable: $' + incomeTaxString;

    // Low Income Tax Offset
    let litoString = lito().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('lito').innerHTML = 'Low income tax offset: $' + litoString;

    // Income tax after subtracting tax offsets
    let incomeLito = incomeTax() - lito();
    let incomeLitoString = incomeLito.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (incomeLito < 0) {
        incomeLito = 0;
        document.getElementById('income-lito').innerHTML = 'Income tax liability after subtracting tax offsets: $0';
    } else {
        document.getElementById('income-lito').innerHTML = 'Income tax liability after subtracting tax offsets: $' + incomeLitoString;
    }

    // Medicare Levy Payable
    let medicareLevyString = medicareLevy().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('medicare-levy').innerHTML = 'Medicare levy payable: $' + medicareLevyString;

    // Total Tax Payable
    let totalTax = incomeLito + medicareLevy();
    totalTax = totalTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('total').innerHTML = 'Total tax liability: $' + totalTax;
});