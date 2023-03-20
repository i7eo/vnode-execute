const rules = require('@unconfig/lint-staged-config/base.js')

module.exports = {
  ...rules,
  '*.{scss,less,html}': ['prettier --write'],
}
