const path = require('path');

/**
 * Resolve the same mongoose instance used by backend to avoid model buffering
 * on a disconnected duplicate instance.
 */
function getSharedMongoose() {
  try {
    return require(require.resolve('mongoose', {
      paths: [path.join(__dirname, '../../../backend')],
    }));
  } catch (error) {
    return require('mongoose');
  }
}

module.exports = getSharedMongoose();
