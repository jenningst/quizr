import React, { useState } from 'react';
import shortid from 'shortid';

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

// Renders path elements for an svg
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
 