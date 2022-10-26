module.exports = class UserReportController {
    constructor() {
        this.userReportBuilder = null;
    }

    getUserTotalOrderAmountView(userId, model) {
        const totalMessage = this.getUserTotalMessage(userId);
        if (totalMessage === null)
            return 'technicalError';

        model.addAttribute('userTotalMessage', totalMessage);

        return 'userTotal';
    }

    getUserTotalMessage(userId) {
        const amount = this.userReportBuilder.getUserTotalOrderAmount(userId);

        if (amount == null)
            return null;

        if (amount === -1)
            return 'WARNING: User ID doesn\'t exist.';
        if (amount === -2)
            return 'WARNING: User have no submitted orders.';
        if (amount === -3)
            return 'ERROR: Wrong order amount.';

        return `User Total: ${amount}$`;
    }

    getUserReportBuilder() {
        return this.userReportBuilder;
    }

    setUserReportBuilder(userReportBuilder) {
        this.userReportBuilder = userReportBuilder;
    }
}
