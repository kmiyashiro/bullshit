'use strict';

module.exports = {
  copyArrayOfArrays(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      result[i] = arr[i].slice();
    }

    return result;
  },

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  },
};
