function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
}

export default isOutdated;
