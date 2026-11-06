const SENIOR_AGE = 60;
const INTEREST_PERCENT = 4.5;
const SENIOR_PERCENT = 5.5;
const BONUS_AGE = 13;
const PERCENT_DIVISOR = 100;

function durationBetweenDatesInYears(from, to) {
    const start = new Date(from);
    const end = new Date(to);

    const diffYear = end.getFullYear() - start.getFullYear();

    if (end.getMonth() < start.getMonth()) {
        return diffYear - 1;
    }
    if (end.getMonth() === start.getMonth() && end.getDate() < start.getDate()) {
        return diffYear - 1;
    }

    return diffYear;
}

function durationSinceStartDateInYears(startDate) {
    return durationBetweenDatesInYears(startDate, new Date());
}

function isAccountStartedAfterBonusAge(accountDetails) {
    return durationBetweenDatesInYears(accountDetails.getBirth(), accountDetails.getStartDate()) > BONUS_AGE;
}

function interestPercent(accountDetails) {
    return accountDetails.getAge() >= SENIOR_AGE ? SENIOR_PERCENT : INTEREST_PERCENT;
}

function interest(accountDetails) {
    const years = durationSinceStartDateInYears(accountDetails.getStartDate());

    return accountDetails.getBalance() * years * interestPercent(accountDetails) / PERCENT_DIVISOR;
}

function calculateInterest(accountDetails) {
    if (isAccountStartedAfterBonusAge(accountDetails)) {
        return interest(accountDetails);
    }

    return 0;
}

module.exports = {
    calculateInterest,
};
