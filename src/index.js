function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // simple
    if ([...expr].length === 3) {
        let y = Number([...expr][2]);
        let x = Number([...expr][0]);

        if ([...expr][1] === "+") {
            return x + y;
        } else if ([...expr][1] === "-") {
            return x - y;
        } else if ([...expr][1] === "*") {
            return x * y;
        } else if ([...expr][1] === "/") {
            return x / y;
        }
    }

    // brackets
    let sub1 = [];
    let sub2 = [];
    for (let i = 0; i < [...expr].length; i++) {
        if ([...expr][i] === "(") { sub1.push([...expr][i]); }
        else if ([...expr][i] === ")") { sub2.push([...expr][i]); }
        }
    if (sub1.length !== sub2.length) { throw Error("ExpressionError: Brackets must be paired"); }

    let data = expr.split(" ");
    let numberList = [];
    let operatorList = [];
    let priority = {"+": 1, "-": 1, "*": 2, "/": 2, "(": 0};

    //Calculate
    for (let i = 0; i < data.length; i++) {
        if (Number.isInteger(parseInt(data[i]))) {
            numberList.push(data[i]);

        } else if (data[i] === "(" || data[i] === ")") {
            if (data[i] === "(") {
                operatorList.push(data[i]);
            } else if (data[i] === ")") {

                while (operatorList[operatorList.length-1] !== "(") {
                    let y = Number(numberList.pop());
                    let x = Number(numberList.pop());
                    if (operatorList[operatorList.length-1] === "+") {
                        numberList.push(x + y);
                        operatorList.pop();
                    } else if (operatorList[operatorList.length-1] === "-") {
                        numberList.push(x - y);
                        operatorList.pop();
                    } else if (operatorList[operatorList.length-1] === "*") {
                        numberList.push(x * y);
                        operatorList.pop();
                    } else if (operatorList[operatorList.length-1] === "/") {
                        if (y === 0) {throw Error("TypeError: Division by zero.")}
                        numberList.push(x / y);
                        operatorList.pop();
                    }
                }
                operatorList.pop();
            }

        } else if (data[i] === "+" || data[i] === "-" || data[i] === "*" || data[i] === "/") {

            if (operatorList.toString() === "" || priority[data[i]] > priority[operatorList[operatorList.length-1]]) {
                operatorList.push(data[i]);
            } else {

                while (priority[data[i]] <= priority[operatorList[operatorList.length-1]]) {
                    let bottomOperator = operatorList[operatorList.length -1];
                    let y = Number(numberList.pop());
                    let x = Number(numberList.pop());

                    if (bottomOperator === "+") {
                        numberList.push(x + y);
                        operatorList.pop();
                    } else if (bottomOperator === "-") {
                        numberList.push(x - y);
                        operatorList.pop();
                    } else if (bottomOperator === "*") {
                        numberList.push(x * y);
                        operatorList.pop();
                    } else if (bottomOperator === "/") {
                        if (y === 0) {throw Error("TypeError: Division by zero.")}
                        numberList.push(x / y);
                        operatorList.pop();
                    }
                }
                operatorList.push(data[i]);
            }
        }
    }

    let iterations = operatorList.length;

    for (let i = 0; i < iterations; i++) {
        let y = Number(numberList.pop());
        let x = Number(numberList.pop());
        let currentOperator = operatorList.pop();

        if (currentOperator === "+") {
            numberList.push(x + y);
        } else if (currentOperator === "-") {
            numberList.push(x - y);
        } else if (currentOperator === "*") {
            numberList.push(x * y);
        } else if (currentOperator === "/") {
            numberList.push(x / y);
            if (y === 0) {throw Error("TypeError: Division by zero.")}
        }
    }
    return numberList[0];
}

module.exports = {
    expressionCalculator
};
