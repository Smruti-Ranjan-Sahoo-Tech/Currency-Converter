let input = document.querySelector("#input");
let swap = document.querySelector("#swap");
let cheak = document.querySelector("#cheak");
let leftValue = document.querySelector(".imgSelFrom select");
let rightValue = document.querySelector(".imgSelTo select");
let CountryPrice;
let now = new Date();
let fetchURL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_7zSoCBHZb6CsFEIGUoqe7XTNvY86m5ac7cCmmirr";
console.log(now);

let FTSelect = document.querySelectorAll(".FT select");
for (const select of FTSelect) {
    for (const code in countryList) {
        let newOption = document.createElement("option");
        newOption.text = code;
        newOption.value = code;
        select.append(newOption);
        if (select.name == "FromSelect" && code == "USD") {
            newOption.selected = "selected";
        }
        if (select.name == "ToSelect" && code == "INR") {
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) => {
        changeFlag(evt.target);
        leftRightValueChange(select);
    });
}

let changeFlag = (e) => {
    let img = e.previousElementSibling;
    img.src = `https://flagsapi.com/${countryList[e.value]}/flat/64.png`;
};

cheak.addEventListener("click", () => {
    fetchNow();
});

async function fetchNow() {
    try {
        let cheakVal = await fetch(fetchURL);
        let chValJson = await cheakVal.json();
        CountryPrice = await chValJson.data;
        console.log(CountryPrice);
        resultCheak(); // Call the function to calculate the result
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function resultCheak() {
    let leftPrice = CountryPrice[leftValue.value];
    let rightPrice = CountryPrice[rightValue.value];
        let amount = parseFloat(input.value);
        let result = (amount * rightPrice) / leftPrice;
        console.log(`Converted amount: ${result}`);
        document.getElementById("msg").textContent = `${amount} ${leftValue.value} = ${result} ${rightValue.value}`;
        // Optionally display this result somewhere in the UI
        let list = document.getElementById("list");
        inAllCurrencyToggle(list);
    
}

function inAllCurrencyToggle(list) {
    list.innerHTML = ''; // Clear previous list
    for (const allCur in countryList) {
        let leftPrice = CountryPrice[leftValue.value];
        let rightPrice = CountryPrice[allCur];

        let newLi = document.createElement("li");

        let amount = parseFloat(input.value);
        let result = (amount * rightPrice) / leftPrice;
        newLi.textContent = `${amount} ${leftValue.value} = ${result} ${allCur}`;
        list.append(newLi); // Add result to the list
        
    }
}

function leftRightValueChange(val) {
    if (val.name == "ToSelect") {
        rightValue = val;
    } else if (val.name == "FromSelect") {
        leftValue = val;
    }
}
function toggleMenu() {
    let leftContaner = document.querySelector(".leftContaner");
    let rightContaner = document.querySelector(".contaner");
    leftContaner.classList.toggle("toggle");
    rightContaner.classList.toggle("toggleCont");
    let list = document.getElementById("list");
    inAllCurrencyToggle(list);

}