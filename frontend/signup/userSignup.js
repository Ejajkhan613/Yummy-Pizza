

let signupform = document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = document.querySelector("#username");
    let email = document.querySelector("#email");
    let mobile = document.querySelector("#mobile");
    let password = document.querySelector("#password");


    if (username.value != "" && email.value != "" && mobile.value != "" && password.value != "") {
        let flag = true;
        for (let a = 0; a < username.value.length; a++) {
            if (username.value[a] == " ") {
                flag = false
            }
        }
        if (flag == false) {
            shownotif("Username should not contain space");
        } else {
            let obj = {
                "username": username.value,
                "email": email.value,
                "mobile": mobile.value,
                "password": password.value
            }

            try {
                let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/users/register", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(obj)
                });
                let res = await fetching.json();

                shownotif(res[0].message);

                if (res.length == 2) {
                    localStorage.setItem("username", res[1].username);
                    localStorage.setItem("Access_Token", res[1].Access_Token)
                    setTimeout(() => {
                        window.location.href = "../index.html"
                    }, 2000);
                }

            } catch (error) {
                shownotif("Something went wrong")
            }
        }
    } else {
        shownotif("Please fill all the details")
    }
});



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