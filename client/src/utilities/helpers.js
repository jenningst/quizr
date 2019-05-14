import React from 'react';
import shortid from 'shortid';

/**
 * objectsAreEqual
 * @param {a} Array Comparison object A
 * @param {b} Array Comparison object B
 * @returns {boolean}
 */
export function objectsAreEqual(a, b) {
  if (Object.keys(a).length === Object.keys(b).length) {
    // check that all items in object a are in object b
    if (a.every(item => b.includes(item))) {
      return true;
    }
  }
  return false;
}

/**
 * arraysAreEqual: Checks
 * @param {a} Array Comparison array A
 * @param {b} Array Comparison array B
 * @returns {boolean}
 */
export function arraysAreEqual(a, b) {
  if (a.length === b.length) {
    // ensure all items in array a are in array b via index
    if (a.every(element => b.includes(element))) {
      return true;
    }
  }
  return false;
}

/**
 * renderSvgPath: Generates paths to render an SVG
 * @param {path} Array Array of path objects
 */
export function renderSvgPath(paths) {
  return (
    paths.map(path => (
      <path
        key={shortid.generate()}
        d={path}
      />
    ))
  );
}
 