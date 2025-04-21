function handleLogin(event) {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    const loginData = { email, password };
  
    fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            document.getElementById("message").textContent = err.error || "Request failed";
            throw new Error(err.error || "Request failed");
          });
        }
        return res.json();
      })
      .then(data => {
        document.getElementById("message").style.color = "green";
        document.getElementById("message").textContent = data.message || "Login successful!";
        event.target.reset();
      })
      .catch(err => {
        console.error(err);
      });
  }
  