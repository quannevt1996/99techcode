const sum_to_n_a = (n: number): number => {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b);
};

const sum_to_n_b = (n: number): number => {
  return (function recursive(current: number, target: number): number {
    if (current > target) return 0;
    return current + recursive(current + 1, target);
  })(1, n);
};
const sum_to_n_c = (n: number): number => {
  return (n * (n + 1)) / 2;
};

/**
 * Install: npm i -g typescript@latest
 * Command to compile: tsc solution.ts --target es6
 * Command to run: node solution.js
 */
console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
