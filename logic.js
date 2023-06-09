// Select Elements
const inputElement = document.querySelector('.input');
const outputOperationElement = document.querySelector('.operation .value');
const outputResultElement = document.querySelector('.result .value');
// Select Elements END

// Variables
const OPERATORS = ['+','-','*','/'];
const POWER = 'POWER', FACTORIAL = 'FACTORIAL';
let data = {
    operation : [],
    formula: []
};
// Variables END

// Calculator Buttons
let calculatorBtns = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "invTrigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        symbol : "asin",
        formula : "invTrigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        symbol : "atan",
        formula : "invTrigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "x",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "x!",
        formula : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "-",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];
// Calculator Buttons END

// Create Calculator btns
function createrCalculatorBtns() {
    const btnsPerRow = 8;
    let addedBtns = 0;

    calculatorBtns.forEach( btn => {
        if (addedBtns % btnsPerRow == 0){
            inputElement.innerHTML += `<div class="row"></div>`;
        }

        const row = document.querySelector(".row:last-child");
        row.innerHTML += `<button id="${btn.name}">${btn.symbol}</button>`;

        addedBtns++;
    })
};
createrCalculatorBtns();
// Create Calculator btns END

// RAD and DEG selection
let RADIAN = true;

const radBtn = document.getElementById('rad');
const degBtn = document.getElementById('deg');

radBtn.classList.add('activeAngle')

function angleToggler() {
    radBtn.classList.toggle('activeAngle');
    degBtn.classList.toggle('activeAngle');
}
// RAD and DEG selection END

// Click event listener for all btns
inputElement.addEventListener('click', e => {
    const targetBtn = e.target;

    calculatorBtns.forEach( btn => {
        if( btn.name == targetBtn.id) calculator(btn);
    })
})
// Click event listener END

// Calculator
function calculator(btn) {
    if(btn.type == 'operator'){
        data.operation.push(btn.symbol);
        data.formula.push(btn.formula);

    }else if(btn.type == 'number'){
        data.operation.push(btn.symbol);
        data.formula.push(btn.formula);

    }else if(btn.type == 'trigo_function'){
        data.operation.push(btn.symbol + '(');
        data.formula.push(btn.formula);
    }else if(btn.type == 'math_function'){
        let symbol, formula;
        if(btn.name == 'factorial'){
            symbol = '!';
            formula = btn.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        }else if(btn.name == 'power'){
            symbol = '^(';
            formula = btn.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        }else if(btn.name == 'square'){
            symbol = '^(';
            formula = btn.formula;
            data.operation.push(symbol);
            data.formula.push(formula);

            data.operation.push('2)');
            data.formula.push('2)');
        }else{
            symbol = btn.symbol + '(';
            formula = btn.formula + '(';
            data.operation.push(symbol);
            data.formula.push(formula);
        };
    }else if(btn.type == 'key'){
        if(btn.name == 'clear'){
            data.operation = [];
            data.formula = [];

            updateOutputResult(0);

        }else if(btn.name == 'delete'){
            data.operation.pop();
            data.formula.pop();
        }else if(btn.name == 'rad'){
            RADIAN = true;
            angleToggler()
        }else if(btn.name == 'deg'){
            RADIAN = false;
            angleToggler()
        }
    }else if(btn.type == 'calculate'){
        formulaStr = data.formula.join('');

        // search for factorial and power functions
        let powerSearchResult = search(data.formula, POWER);
        let factorialSearchResult = search(data.formula, FACTORIAL);

        // get power base and replace with the right formula
        const BASES = powerBaseGetter(data.formula,powerSearchResult);
        BASES.forEach(base => {
            let toReplace = base + POWER;
            let replacement = 'Math.pow('+base+',';

            formulaStr = formulaStr.replace(toReplace,replacement);
        })

        // get factorial base and replace with the right formula
        const NUMBERS = factorialNumberGetter(data.formula,factorialSearchResult);
        NUMBERS.forEach(factorial => {
            formulaStr = formulaStr.replace(factorial.toReplace,factorial.replacement);
        })
        console.log(eval(formulaStr));
        // calculate
        let result;
        try{
            result = eval(formulaStr)
        }catch(error){
            if (error instanceof SyntaxError){
                result = 'Syntax Error!';
                updateOutputResult(result);
                return;
            }
        }

        // save result for later use
        ans = result
        data.operation = [result];
        data.formula = [result];

        updateOutputResult(result);
        return;
    }

    updateOutputOperation(data.operation.join(''));
};
// Calculator END

// Power base getter
function powerBaseGetter(formula,powerSearchResult) {
    let powerBases = []; // save all bases in the same array

    powerSearchResult.forEach(powerIndex => {
        let base = []; // current base

        let parenthesisCount = 0;

        let previousIndex = powerIndex - 1;

        while(previousIndex >= 0) {

            if(formula[previousIndex] == '(') parenthesisCount--;
            if(formula[previousIndex] == ')') parenthesisCount++;

            let isOperator = false;
            OPERATORS.forEach( OPERATOR => {
                if(formula[previousIndex] == OPERATOR) isOperator = true;
            });

            let isPower = formula[previousIndex] == POWER;

            if((isOperator && parenthesisCount == 0) || isPower) break;

            base.unshift(formula[previousIndex]);
            previousIndex--;
        }

        powerBases.push(base.join(''));
    })

    return powerBases;
}
// Power base getter END

// Factorial number getter
function factorialNumberGetter(formula,factorialSearchResult) {
    let numbers = []; // save all the numbers in the same array
    let factorialSequence = 0;

    factorialSearchResult.forEach(factorialIndex => {
        let number = []; // current factorial number

        let nextIndex = factorialIndex + 1;
        let nextInput = formula[nextIndex];

        if(nextInput == FACTORIAL) {
            factorialSequence += 1;
            return
        }

        // if there was a factorial sequence, we need to get the index of the very first factorial function
        let firstFactorialIndex = factorialIndex - factorialSequence;

        //then to get the number right before it
        let previousIndex = firstFactorialIndex - 1;
        let parenthesisCount = 0;

        while(previousIndex >= 0) {

            if(formula[previousIndex] == '(') parenthesisCount--;
            if(formula[previousIndex] == ')') parenthesisCount++;

            let isOperator = false;
            OPERATORS.forEach( OPERATOR => {
                if(formula[previousIndex] == OPERATOR) isOperator = true;
            });

            if(isOperator && parenthesisCount == 0) break;

            number.unshift(formula[previousIndex]);
            previousIndex--;
        }

        let numberStr = number.join('');
        const factorial = 'factorial(', closeParenthesis = ')';
        let times = factorialSequence + 1;

        let toReplace = numberStr + FACTORIAL.repeat(times);
        let replacement = factorial.repeat(times) + numberStr + closeParenthesis.repeat(times);

        numbers.push({
            toReplace : toReplace,
            replacement : replacement
        })

        // reset factorialSequence
        factorialSequence = 0;
    })
    
    return numbers;
}
// Factorial number getter END

// Search and array
function search(array,keyword) {
    let searchResult = [];

    array.forEach( (element,index) => {
        if(element == keyword) searchResult.push(index);
    })
    return searchResult;
}
// Search and array END

// Update output
function updateOutputOperation(operation) {
    outputOperationElement.innerHTML = operation;
};
function updateOutputResult(result) {
    outputResultElement.innerHTML = result;
};
// Update output END

// Factorial function
function factorial(number){
    if (number % 1 != 0) return gamma(number + 1);
    if(number === 0 || number === 1) return 1;

    let result = 1;
    for(let i = 1; i <= number; i++ ){
        result *= i;
        if (result === Infinity) return Infinity;
    }
    return result;
}
// Factorial function ENd

// Trigonometric functions
function trigo(callback,angle) {
    if(!RADIAN){
        angle = angle * Math.PI/180;
    }
    return callback(angle);
}
function invTrigo(callback,value) {
    let angle = callback(value);

    if(!RADIAN){
        angle = angle * 180/Math.PI;
    }
    return angle;
}
// Trigonometric functions END

// GAMMA FUNCTINON
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
};



