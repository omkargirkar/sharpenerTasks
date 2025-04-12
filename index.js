function handleFormSubmit(event) {
  event.preventDefault();
  const bookName = event.target.bookName.value;

  const bookItem = {
    bookName,
    isReturned: false
  };

  fetch("/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookItem)
  })
    .then(res => res.json())
    .then(data => displayOnScreen(data))
    .catch(err => console.log(err));

  event.target.reset();
}

window.addEventListener("DOMContentLoaded", () => {
  fetch("/api/books")
    .then(res => res.json())
    .then(data => {
      data.forEach(bookItem => displayOnScreen(bookItem));
    })
    .catch(err => console.log(err));
});

function displayOnScreen(bookItem) {
  const takenBooks = document.getElementById("takenBooks");
  const returnedBooks = document.getElementById("returnedBooks");

  function addToReturned(bookItem) {
    const li = document.createElement("li");

    const takenDate = new Date(bookItem.takenOn).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });

    const returnDate = new Date(bookItem.returnedOn).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });

    const returnBy = new Date(bookItem.returnBy);
    const returnedOn = new Date(bookItem.returnedOn);
    let fine = 0;

    if (returnedOn > returnBy) {
    const minutesLate = Math.floor((returnedOn - returnBy) / (1000 * 60));
    fine = minutesLate * 10;
    }

    li.innerHTML = `
      Book Name: ${bookItem.bookName}<br>
      <small>Book taken on: ${takenDate}</small><br>
      <small>Returned on: ${returnDate}</small><br>
      <strong>Total Fine Paid: ₹${fine}</strong>
    `;

    returnedBooks.appendChild(li);
  }

  if (!bookItem.isReturned) {
    const li = document.createElement("li");
    const bookInfo = document.createElement("div");

    const takenDate = new Date(bookItem.takenOn).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });

    const returnDate = new Date(bookItem.returnBy).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });

    const now = new Date();
    const returnBy = new Date(bookItem.returnBy);
    let currentFine = 0;
  
    if (now > returnBy) {
        const minutesLate = Math.floor((now - returnBy) / (1000 * 60));
        currentFine = minutesLate * 10;
    }

    bookInfo.innerHTML = `
      ${bookItem.bookName}<br>
      <small>Book taken on: ${takenDate}</small><br>
      <small>Book return date: ${returnDate}</small><br>
      Fine: ₹<span class="fine-amount">${currentFine}</span>
    `;

    const fineSpan = bookInfo.querySelector(".fine-amount");

    const returnBtn = document.createElement("button");
    returnBtn.textContent = "Return Book";
    returnBtn.style.display = "block";

    li.appendChild(bookInfo);
    li.appendChild(returnBtn);
    takenBooks.appendChild(li);

    setInterval(() => {
      const now = new Date();
      const returnBy = new Date(bookItem.returnBy);
      let fine = 0;
  
      if (now > returnBy) {
        const minutesLate = Math.floor((now - returnBy) / (1000 * 60));
        fine = minutesLate * 10;
      }

      fineSpan.textContent = fine;
    }, 60000);

    returnBtn.addEventListener("click", () => {
      const now = new Date();
      const returnBy = new Date(bookItem.returnBy);
      const minutesLate = Math.floor((now - returnBy) / (1000 * 60));
      const fine = minutesLate > 0 ? minutesLate * 10 : 0;
    
      if (fine === 0) {
        // Directly return if no fine
        fetch(`/api/books/${bookItem.id}`, {
          method: "PUT"
        })
          .then(res => res.json())
          .then(updatedBook => {
            takenBooks.removeChild(li);
            addToReturned(updatedBook);
          })
          .catch(err => console.log(err));
      } else {
        // Show pop-up with fine
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "1000";
    
        const popup = document.createElement("div");
        popup.style.backgroundColor = "#fff";
        popup.style.padding = "20px";
        popup.style.borderRadius = "10px";
        popup.style.textAlign = "center";
        popup.innerHTML = `
          <p>Total Fine: ₹${fine}</p>
          <button id="payFineBtn">Pay Fine</button>
        `;
    
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
    
        document.getElementById("payFineBtn").addEventListener("click", () => {
          document.body.removeChild(overlay);
    
          fetch(`/api/books/${bookItem.id}`, {
            method: "PUT"
          })
            .then(res => res.json())
            .then(updatedBook => {
              takenBooks.removeChild(li);
              addToReturned(updatedBook);
            })
            .catch(err => console.log(err));
        });
      }
    });
  } else {
    addToReturned(bookItem);
  }
}
