let displayList = document.getElementById("display-list");

let template_display = `
    <div class="display">
        <div class="top"></div>
        <div class="right"></div>
        <div class="right right_bottom"></div>
        <div class="bottom"></div>
        <div class="left"></div>
        <div class="left left_bottom"></div>
        <div class="middle"></div>
    </div>`;

const printDisplay = (number, color="black") => {
    displayList.innerText = number;
};

// const printSingleDigit( digit) => {


// }


export default printDisplay;