function handleFormSubmit(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  const user = { username, email, password };

  fetch("/user/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Signup successful!');
      event.target.reset();
    })
    .catch(err => {
      console.error(err);
      alert('Something went wrong. Please try again.');
    });
}
