const AGE = 60;
const INTEREST_PERCENT = 4.5;
const SENIOR_PERCENT = 5.5;
const BONUS_AGE = 13;

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
    const start = new Date(startDate);
    const end = new Date();

    const diffYear = end.getFullYear() - start.getFullYear();

    if (end.getMonth() < start.getMonth()) {
        return diffYear - 1;
    }
    if (end.getMonth() === start.getMonth() && end.getDate() < start.getDate()) {
        return diffYear - 1;
    }

    return diffYear;
}

function isAccountStartedAfterBonusAge(accountDetails) {
    return durationBetweenDatesInYears(accountDetails.getBirth(), accountDetails.getStartDate()) > BONUS_AGE;
}

function interest(accountDetails) {
    let interest = 0;
    if (isAccountStartedAfterBonusAge(accountDetails)) {
        if (AGE <= accountDetails.getAge()) {
            //interest = (PrincipalAmount * DurationInYears * AnnualInterestRate) / 100
            interest = accountDetails.getBalance()
                    * durationSinceStartDateInYears(accountDetails.getStartDate()) * SENIOR_PERCENT / 100;
        } else {
            interest = accountDetails.getBalance().doubleValue()
                    * durationSinceStartDateInYears(accountDetails.getStartDate()) * INTEREST_PERCENT / 100;
        }
    }
    return interest;
}

function calculateInterest(accountDetails) {
    if (isAccountStartedAfterBonusAge(accountDetails)) {
        return interest(accountDetails);
    } else {
        return 0;
    }
}

module.exports = {
    calculateInterest,
};
