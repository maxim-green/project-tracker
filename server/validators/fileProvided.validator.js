

module.exports = (value, {req}) => {
  if (!req.files) throw new Error('One or more files is required')
  return true
};
