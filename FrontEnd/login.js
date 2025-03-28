//
// je fais une fonction pour le login et verifier les infos
//
async function loginAuthentification() {
    const loginForm = document.querySelector(".login__form");
    
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const url = "http://localhost:5678/api/users/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            if(!response.ok) {
                throw new Error("Cannot reach data");
            }
            const json = await response.json();
            const token = json.token;
            localStorage.setItem("token", token);

            window.location.href = "index.html";

        } catch (error) {
            console.error(error.message);
            
            const loginInput = document.querySelectorAll(".login__form input");
            loginInput.forEach(input => {
                if(input.type !== "submit") {
                    input.classList.add("login__form__input--error");
                }
        });
        }
    });
}

loginAuthentification();