module.exports.findFnWith = (capabilities) => {
  if (!capabilities) {
    throw new Error('no capabilities have been provided');
  }

  return () => {};
};
