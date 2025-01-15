const sum_to_n_a = (n) => {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b);
};
const sum_to_n_b = (n) => {
    return (function recursive(current, target) {
        if (current > target)
            return 0; // Base case: stop when current exceeds target
        return current + recursive(current + 1, target); // Add current and recurse with current + 1
    })(1, n);
};
const sum_to_n_c = (n) => {
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
