const calculateDifferenceInDays = (startDay, endDate) => {
  return Math.floor((Date.parse(endDate) - Date.parse(startDay)) / 86400000);
};

module.exports = calculateDifferenceInDays;
