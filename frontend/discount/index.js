let products = document.querySelector("#products");
let renderArea = document.querySelector(".renderArea");
let ind_item = document.querySelector(".ind-item");

let Access_Token = localStorage.getItem("Access_Token") || "";


// Show UserName
function showUsername() {
    let showname = document.querySelector("#username");
    let name = localStorage.getItem("username");
    showname.innerHTML = name;
}
showUsername();






// Fetching Product Data
if (localStorage.getItem("username") != null || localStorage.getItem("username") != undefined) {
    fetchData();
} else {
    document.getElementById("LoadingDataDiv").style.display = "none";
    shownotif("Please Login first");
}
async function fetchData() {
    try {
        let fetching = await fetch("https://pizzabackend-rdbu.onrender.com/discount/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = await fetching.json();
        if (data.discount.length == 0) {
            document.getElementById("showLogo").style.display = "block";
            document.getElementById("showNoDiscounts").style.display = "block";
            document.getElementById("LoadingDataDiv").style.display = "none";
        } else {
            document.getElementById("showLogo").style.display = "none";
            document.getElementById("LoadingDataDiv").style.display = "none";
            showAllDiscounts(data.discount);
        }
    } catch (error) {
        shownotif("Something Went Wrong, Try Again");
        document.getElementById("showLogo").style.display = "block";
        document.getElementById("showNoDiscounts").style.display = "none";
        document.getElementById("LoadingDataDiv").style.display = "none";
    }
};


// Template
function showAllDiscounts(data) {
    let renderProductArea = document.querySelector(".renderArea");
    renderProductArea.innerHTML = "";
    renderProductArea.innerHTML = `
        ${data.map((item) => {
        return `<div class="ind_item_box">
                        <div class="textArea">
                            <span for="">NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <p>${item.name}</p>
                            <br />
                            <span for="">DISCOUNT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <p>&#8377; ${item.price}</p>
                            <br />
                            <button id="copyButton" onclick="copyText('${item.name}')">Copy Discount Coupon</button>
                        </div>
                    </div>`;
    }).join("")}
    `;
};




// Text copy function
function copyText(name) {
    const text = `${name}`;
    navigator.clipboard.writeText(text)
        .then(() => shownotif("Discount Copied"))
        .catch(err => console.error('Error copying text: ', err));
};





// Notification System
function shownotif(data) {
    if (data == undefined) {
        data = "Error";
        let notify = document.querySelector("#notification>h2");
        setTimeout(() => {
            document.getElementById("notification").style.display = "none";
            notify.innerText = ""
        }, 3000);
        document.getElementById("notification").style.display = "block";
        notify.innerText = data;
    } else {
        let notify = document.querySelector("#notification>h2");
        setTimeout(() => {
            document.getElementById("notification").style.display = "none";
            notify.innerText = ""
        }, 2000);
        document.getElementById("notification").style.display = "block";
        notify.innerText = data;
    }
}