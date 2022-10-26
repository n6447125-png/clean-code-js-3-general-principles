const InvalidInputException = require('./thirdparty/invalid-input-exception');

/**
 * Returns calculated monthly payment amount
 * @param {number} p - Principal amount
 * @param {number} t - Term of mortgage in years
 * @param {number} r - Rate of interest
 * @returns {number} - Monthly payment amount
 */
exports.calculateMonthlyPayment = function (p, t, r) {
    //cannot have negative loanAmount, term duration and rate of interest
    if (p < 0 || t <= 0 || r < 0) {
        throw new InvalidInputException('Negative values are not allowed');
    }

    // Convert interest rate into a decimal - eg. 6.5% = 0.065
    r /= 100;

    // convert term in years to term in months
    const tim = t * 12;

    //for zero interest rates
    if(r===0) return  p/tim;

    // convert into monthly rate
    const m = r / 12;

    // Calculate the monthly payment
    // The Math.pow() method is used calculate values raised to a power
    const monthlyPayment = (p * m) / (1 - Math.pow(1 + m, -tim));

    return monthlyPayment;
}
