function throwInvalid(invalidWhatName, value, validator) {
  if (!validator || !validator(value)) {
    throw new Error(`Invalid ${invalidWhatName}:\n  ${value}`);
  }
}

module.exports = {
  throwInvalid
};
