const InvalidInputException = require('./thirdparty/invalid-input-exception');

const MONTHS_PER_YEAR = 12;
const PERCENT_DIVISOR = 100;

exports.calculateMonthlyPayment = function (principal, termInYears, annualInterestPercent) {
    if (principal < 0 || termInYears <= 0 || annualInterestPercent < 0) {
        throw new InvalidInputException('Negative values are not allowed');
    }

    const annualRate = annualInterestPercent / PERCENT_DIVISOR;
    const termInMonths = termInYears * MONTHS_PER_YEAR;

    if (annualRate === 0) {
        return principal / termInMonths;
    }

    const monthlyRate = annualRate / MONTHS_PER_YEAR;

    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termInMonths));
};
