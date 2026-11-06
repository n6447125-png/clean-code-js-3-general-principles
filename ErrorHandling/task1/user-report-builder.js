const {
    UserDaoNotConfiguredError,
    UserNotFoundError,
    UserHasNoOrdersError,
    WrongOrderAmountError,
} = require('./user-report-errors');

module.exports = class UserReportBuilder {
    constructor() {
        this.userDao = null;
    }

    getUserTotalOrderAmount(userId) {
        if (this.userDao === null)
            throw new UserDaoNotConfiguredError();

        const user = this.userDao.getUser(userId);
        if (user === null)
            throw new UserNotFoundError();

        const orders = user.getAllOrders();

        if (!orders.length)
            throw new UserHasNoOrdersError();

        let sum = 0;
        for (let order of orders) {
            if (order.isSubmitted()) {
                sum += this.getValidOrderTotal(order);
            }
        }

        return sum;
    }

    getValidOrderTotal(order) {
        const total = order.total();
        if (total < 0)
            throw new WrongOrderAmountError();

        return total;
    }

    getUserDao() {
        return this.userDao;
    }

    setUserDao(userDao) {
        this.userDao = userDao;
    }
}
