const err = (message, status) => {
    // console.log(message)
    const e = new Error(message);

    if (status) {
        e.statusCode = status;
    }

    // console.log("queee =>", e)
    return e;
}

module.exports = err;