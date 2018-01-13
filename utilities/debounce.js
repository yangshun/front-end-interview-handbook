const debounce = (fn, time) => {
    let timerId;
    return function(...args) {
        const functionCall = () => fn.apply(this, args);
        clearTimeout(timerId);
        timerId = setTimeout(functionCall, time);
    };
};
