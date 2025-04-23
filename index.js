function handleAddExpense(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expense = { amount, description, category };

    fetch('/expense/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense)
    })
        .then(res => res.json())
        .then(data => displayOnScreen(data))
        .catch(err => console.log(err));

    event.target.reset();
}

window.addEventListener("DOMContentLoaded", () => {
    fetch("/expense/get")
      .then(res => res.json())
      .then(data => {
        data.forEach(todo => displayOnScreen(todo));
      })
      .catch(err => console.log(err));
  })
  
  function displayOnScreen(obj) {
      const parentElement = document.getElementById('expenseList');
      const childElement = document.createElement('li');
      childElement.id = obj.description;
      childElement.textContent = `${obj.amount} - ${obj.category} - ${obj.description}`;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Expense';
  
      childElement.appendChild(deleteButton);

      deleteButton.addEventListener("click", ()=>{
        fetch(`/expense/delete/${obj.id}`,{
            method:"DELETE"
        })
        .then(()=>parentElement.removeChild(childElement))
        .catch(err=>console.log(err));
      });

      parentElement.appendChild(childElement);
  }
