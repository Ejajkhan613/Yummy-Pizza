document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    let firstname = document.querySelector("#first_name");
    let lastname = document.querySelector("#last_name");
    let house = document.querySelector("#house_no");
    let street = document.querySelector("#street_no");
    let pincode = document.querySelector("#pincode");
    let locality = document.querySelector("#locality");
    let username = localStorage.getItem("username");

    if (firstname.value != "" && lastname.value != "" && house.value != "" && street.value != "" && pincode.value != "" && locality.value != "") {
        if (username != null) {
            try {
                let obj = {
                    "username": username,
                    "first_name": firstname.value,
                    "last_name": lastname.value,
                    "house_no": house.value,
                    "street_no": street.value,
                    "pincode": pincode.value,
                    "locality": locality.value
                }



                let sending = await fetch("https://pizzabackend-rdbu.onrender.com/address/add", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(obj)
                });
                let res = await sending.json();
                shownotif(res[0].message);
                if(res[0].message == "Address Saved"){
                    window.location.href = "../index.html";
                }
            } catch (error) {
                shownotif("Error while Saving the Address")
            }
        } else {
            shownotif("Not Authorized");
        }
    } else {
        shownotif("Please fill all the details");
    }
})



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
        }, 3000);
        document.getElementById("notification").style.display = "block";
        notify.innerText = data;
    }
}