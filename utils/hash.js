const bcrypt = require('bcrypt');

const generateHash = async (password) => {
    const hash = await bcrypt.hash(password, 10);

    return hash;
}

const compareHash = async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

module.exports = {
    generateHash,
    compareHash
}