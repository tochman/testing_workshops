const path = require('path');
const synpressPath = path.join(process.cwd(), '/synpress');

module.exports = {
  extends: `${synpressPath}/.eslintrc.js`,
};