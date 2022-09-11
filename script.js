// //adding all that is typed to the display:
// let display = document.getElementById('display');
// let result = document.getElementById('result');
// let buttons = Array.from(document.getElementsByClassName('button'));

// buttons.map( button => {
//     button.addEventListener('click', (e) =>{
        
//         switch(e.target.innerText){
//             case 'CE':
//                 display.innerText = "";
//                 result.innerText = "";
//                 break;
//         // handling the point-button press (the point-keypress is handled below)
//             case '.':
//                 if (display.textContent.includes('.')){
//                     display.textContent += ''
//                       }else{
//                         display.textContent += '.'
//                       }
//                 break;
//                    case '=':
//                     operate();
//                     break;
//                       case '²√x' :
//                         squared();
//                         break;
//                     case 'x³':
//                         // create function
//                         break;
//                     case 'x²':
//                         // create function

//                         break;
//                     case '%':
//                         // create function

//                         break;
//                         // create function

//                     case '+/-':
//                         // create function

//                         break;
                        
//                         case '1/x':
//                         // create function
//                         break;
//                     case '+':
//                         add();
//                         break;
//                         case '-':
//                             subtract();
//                             break;
//                             case 'x':
//                                 multiply();
//                                 break;
//                                 case '÷':
//                                     divide();
//                                     break;


//             default:
//                 display.innerText += e.target.innerText;
//         }
//         // console.log(display.innerText);
       
//     });
// });
// //creating a backspace button 
// let element = document.getElementById("backspace");

// backspace.addEventListener('click', (e)=>{
//     display.innerText = display.innerText.slice(0, -1);

// });
// // adding a key press listener for backspace and Escape: 

// document.onkeydown = function(evt) {
//     evt = evt || window.event;
//     let isEscape = false;
//     if ("key" in evt) {
//         isEscape = (evt.key === "Escape" || evt.key === "Backspace");
//     } else {
//         isEscape = (evt.keyCode === 27);
//     }
//     if (isEscape) {
//         display.innerText = display.innerText.slice(0, -1);
//     }
// };


// window.addEventListener('keydown', handleKeyboardInput)
// function handleKeyboardInput(e) {
//     if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
//     if (e.key === '.') appendPoint()
//     // if (e.key === '=' || e.key === 'Enter') evaluate()
//     // if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
//     //   convertOperator(e.key)
//   }
//   function appendNumber(number) {
//         display.textContent += number
//   }

//   // handling the point-keypress
//   function appendPoint() {
//    // if there is already a '.', skip: 
//    if (display.textContent.includes('.')){
//     display.textContent += ''
//       }else{
//         display.textContent += '.'
//       }
//    }
 
//    function add(a, b) {
// result.innerText = 'add';

//     return a + b;
// }

// function subtract(a, b) {
// result.innerText = 'sub';

//     return a - b;
// }

// function multiply(a, b) {
// result.innerText = 'mult';

//     return a * b;
// }

// function divide(a, b) {
// result.innerText = 'div';

//     return a / b;
// }
// function squared(a,b){
// result.innerText = 'squared';
// return a ^ (-1/2);

// }
// function operate(){
// result.innerText = 'operate';
// }



// // following a tutorial from here (some points were already coveredy above, like using the keyboard for the numbers and backspace)



class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })