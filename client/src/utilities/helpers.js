// Helper method, Compares two arrays for equality
export function objectsAreEqual(a, b) {
  if (a.length === b.length) {
    // go through each response
    if (a.every(item => b.includes(item))) {
      return true;
    }
  }
  return false;
}
 