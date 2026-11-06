class UserDaoNotConfiguredError extends Error {}

class UserNotFoundError extends Error {}

class UserHasNoOrdersError extends Error {}

class WrongOrderAmountError extends Error {}

module.exports = {
    UserDaoNotConfiguredError,
    UserNotFoundError,
    UserHasNoOrdersError,
    WrongOrderAmountError,
};
