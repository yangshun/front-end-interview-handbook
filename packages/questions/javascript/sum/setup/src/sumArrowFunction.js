const sum = (a) => (b) => b !== undefined ? sum(a + b) : a;
export default sum;
