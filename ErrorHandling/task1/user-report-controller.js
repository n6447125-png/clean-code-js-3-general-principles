const {
    UserDaoNotConfiguredError,
    UserNotFoundError,
    UserHasNoOrdersError,
    WrongOrderAmountError,
} = require('./user-report-errors');

module.exports = class UserReportController {
    constructor() {
        this.userReportBuilder = null;
    }

    getUserTotalOrderAmountView(userId, model) {
        try {
            model.addAttribute('userTotalMessage', this.getUserTotalMessage(userId));

            return 'userTotal';
        } catch (error) {
            if (error instanceof UserDaoNotConfiguredError)
                return 'technicalError';

            throw error;
        }
    }

    getUserTotalMessage(userId) {
        try {
            const amount = this.userReportBuilder.getUserTotalOrderAmount(userId);

            return `User Total: ${amount}$`;
        } catch (error) {
            if (error instanceof UserNotFoundError)
                return 'WARNING: User ID doesn\'t exist.';
            if (error instanceof UserHasNoOrdersError)
                return 'WARNING: User have no submitted orders.';
            if (error instanceof WrongOrderAmountError)
                return 'ERROR: Wrong order amount.';

            throw error;
        }
    }

    getUserReportBuilder() {
        return this.userReportBuilder;
    }

    setUserReportBuilder(userReportBuilder) {
        this.userReportBuilder = userReportBuilder;
    }
}
