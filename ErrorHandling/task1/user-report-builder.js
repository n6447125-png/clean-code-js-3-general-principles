module.exports = class UserReportBuilder {
    constructor() {
        this.userDao = null;
    }

    getUserTotalOrderAmount(userId) {
        if (this.userDao === null)
            return null;

        const user = this.userDao.getUser(userId);
        if (user === null)
            return -1;

        const orders = user.getAllOrders();

        if (!orders.length)
            return -2;

        let sum = 0;
        for (let order of orders) {
            if (order.isSubmitted()) {
                const total = order.total();
                if (total < 0)
                    return -3;
                sum += total;
            }
        }

        return sum;
    }

    getUserDao() {
        return this.userDao;
    }

    setUserDao(userDao) {
        this.userDao = userDao;
    }
}
