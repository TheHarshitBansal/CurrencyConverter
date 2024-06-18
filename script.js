const fromCountry = document.querySelector(".from select");
const toCountry = document.querySelector(".to select");
const dropDown =  document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector("h4");

for(let select of dropDown){
    for(country in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        if(select.name == "from" && country == "USD"){
            newOption.selected = "selected";
        }
        if(select.name == "to" && country == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    img.alt = currCode;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async ()=>{
    let amount = document.querySelector("input")
    let amtVal = amount.value;
    if(amtVal == " " || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }

    let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCountry.value.toLowerCase()}.json`

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCountry.value.toLowerCase()][toCountry.value.toLowerCase()];
    let finalRate = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCountry.value} = ${finalRate} ${toCountry.value}`
}

window.addEventListener("load", ()=>{
    updateExchangeRate();
})