// TODO: Use npm to try and properly import this stuff
// hisssssss

export class FactorsUtil {

  // Returns whether or not a number is a square
  // NOTE: This could have precision issues at very high values
  static isSquare(n) {
    if (n < 0) {
      return false;
    }
  
    return Number.isInteger(Math.sqrt(n));
  }
  
  // Returns whether or not a number is a cube
  // NOTE: This could have precision issues at very high values
  static isCube(n) {
    if (n < 0) {
      return false;
    }
  
    return Number.isInteger(Math.cbrt(n));
  }
  
  // Returns whether or not a number is a power of two
  static isPowerOfTwo(n) {
    if (n == 0) {
      return false;
    }
  
    // Bit twiddling
    // e.g.) 4
    // 0100 & 0011 == 0
    return (n & (n - 1)) == 0;
  }
  
  // Returns whether or not a number is a step squad
  // i.e.) Sum of all positive integers from 1...k
  // Formula by ChatGPT soooooo... 2/23/2023
  static isStepSquad(n) {
    let height = (Math.sqrt(8 * n + 1) - 1) / 2;
  
    return Number.isInteger(height) &&
      (height * (height + 1) / 2 === n);
  }
}