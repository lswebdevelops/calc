//adding all that is typed to the display:
let display = document.getElementById('display');
let result = document.getElementById('result');
let buttons = Array.from(document.getElementsByClassName('button'));

buttons.map( button => {
    button.addEventListener('click', (e) =>{
        switch(e.target.innerText){
            case 'CE':
                display.innerText = "";
                result.innerText = "";
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});
//creating a backspace button 
let element = document.getElementById("backspace");

backspace.addEventListener('click', (e)=>{
    display.innerText = display.innerText.slice(0, -1);

});
// adding a key press listener for backspace and Escape: 

document.onkeydown = function(evt) {
    evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Backspace");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        display.innerText = display.innerText.slice(0, -1);
    }
};
// adding a key press listener for each digit: [0-9] 

