Math.uniqueID = () => {
  return Math.random().toString(36).substr(2);
};

module.exports = function () {
  return Math.uniqueID();
}
