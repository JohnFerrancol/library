const booksContainer = document.querySelector(".books-container");
const readingGoal = document.querySelector(".books-read");

class ReadingProgress {
  // Define a private variable to keep track of the books read
  #booksRead = 2;
  constructor(readingGoal) {
    this.readingGoal = readingGoal;
  }

  // Define the method used to increment or decrement the reading counter
  updateProgress(addOrRemove) {
    if (addOrRemove === "add") {
      this.#booksRead++;
    } else {
      this.#booksRead--;
    }
    this.updateReadingProgressUI();
  }

  // Define the method to change the reading goal from the form
  changeGoal(newGoal) {
    // Change the Goal
    this.readingGoal = newGoal;
    this.updateReadingProgressUI();
  }

  // Define the method to update the UI when the reading progress changes
  updateReadingProgressUI() {
    readingGoal.textContent = `${this.#booksRead}/${
      this.readingGoal
    } book(s) read`;

    // Handle errors to avoid overflowing the progress bar by only updating the progress bar when it is not full
    if (this.#booksRead <= this.readingGoal) {
      updateProgressBar(this.#booksRead / this.readingGoal);
    }
  }
}

const readingProgress = new ReadingProgress(25);

class Book {
  constructor(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  // Define a method to toggle the read status of the book
  toggleReadStatus() {
    // Toggle the read status and update the read progress
    this.haveRead = !this.haveRead;
    readingProgress.updateProgress(this.haveRead ? "add" : "remove");

    // Render the library to change the DOM
    renderLibrary();
  }
}

// Defining a myLibrary array which contains the library objects
// Preload 4 Book objects to alloww users to see the layout and the reading progress
const myLibrary = [
  new Book(crypto.randomUUID(), "Dune", "Frank Herbert", 650, true),
  new Book(
    crypto.randomUUID(),
    "Harry Potter and the Prisoner of Azkaban",
    "J.K. Rowling",
    320,
    false
  ),
  new Book(crypto.randomUUID(), "Gone Girl", "Gilian Flynn", 480, true),
  new Book(crypto.randomUUID(), "Misery", "Stephen King", 300, false),
];

// Display the books and change the progress bar when the page loads
window.addEventListener("load", () => {
  updateProgressBar(2 / 25);
  renderLibrary();
});

// Add event listeners when the user wants to open a dialog
const headerButtonContainer = document.querySelector(
  "header .button-container"
);
headerButtonContainer.addEventListener("click", (event) => {
  // Obtain the dialog class when the button is pressed in the header and show the dialog
  let getDialogClass = event.target.dataset.dialog;
  document.querySelector(`.${getDialogClass}`).showModal();
});

// Add event listeners when the user wants to close a dialog
const closeDialog = document.querySelectorAll(".close-dialog-icon");
closeDialog.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    // Obtain the dialog class when the icon is pressed in the header and close the dialog
    let getDialogClass = event.target.dataset.dialog;
    document.querySelector(`.${getDialogClass}`).close();
  });
});

// Add event listeners when the user wants to submit a form
const submitForms = document.querySelectorAll("form");
submitForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    // Prevent page refresh and sending items to the server
    event.preventDefault();

    let targetId = event.target.id;
    if (targetId === "add-book-form") {
      // Add the new book to the library by running the function
      addBookToLibrary();
    } else if (targetId === "change-goal-form") {
      // Change the new goal from the form submitted
      const newGoal = document.querySelector("#change-goal").value;
      readingProgress.changeGoal(newGoal);
    }

    // Reset the form and close the modal
    form.reset();
    let getDialogClass = event.target.dataset.dialog;
    const dialogToClose = document.querySelector(`.${getDialogClass}`);
    dialogToClose.close();
  });
});

// Defining a function to add a book to the library from a new Book object
function addBookToLibrary() {
  // Set a new randomId for each book to ensure each book has a unique identifier to prevent issues when books are removed or rearanged
  const randomId = crypto.randomUUID();

  // Obtain the values from the form given and create a new Book Object
  const newBookTitle = document.querySelector("#book-title").value;
  const newBookAuthor = document.querySelector("#book-author").value;
  const newBookPages = document.querySelector("#book-pages").value;
  const newBookHasRead = document.querySelector("#book-read").checked;

  const newBook = new Book(
    randomId,
    newBookTitle,
    newBookAuthor,
    newBookPages,
    newBookHasRead
  );

  if (newBookHasRead === true) {
    readingProgress.updateProgress("add");
  }

  // Add to the library Array
  myLibrary.push(newBook);
  renderLibrary();
}

// Function used to display the book objects from the myLbrary array
function renderLibrary() {
  // If the user is adding a book or changing a read status, remove all books from the container
  booksContainer.innerHTML = "";

  // Iterate over the loop and addd an instance of a book element to the book container
  for (const book of myLibrary) {
    // Create book element which contains the book contents
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.dataset.id = book.id;

    // Create a book title, author and pages elements
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;
    bookElement.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = book.author;
    bookElement.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.classList.add("book-pages");
    bookPages.textContent = `${book.pages} pages`;
    bookElement.appendChild(bookPages);

    // Create a button container which allows users to change the read status and remove the books
    const bookButtonContainer = document.createElement("div");
    bookButtonContainer.classList.add("button-container");

    // Creating the button to change the read status of the books
    const haveReadButton = document.createElement("button");
    haveReadButton.textContent = book.haveRead ? "Read" : "Not Read";
    haveReadButton.classList.toggle(book.haveRead ? "read" : "not-read");
    haveReadButton.classList.add("have-read-button");

    // Add the event listener where it calls the read status prototype to toggle with the read status
    haveReadButton.addEventListener("click", () => {
      book.toggleReadStatus();
    });

    // Creating the button to remove the book from the library
    const removeBookIcon = document.createElement("img");
    removeBookIcon.src = "assets/logos/delete.svg";
    removeBookIcon.alt = "Delete Book";
    removeBookIcon.classList.add("remove-book-icon");

    // Add Event Listener to remove the book element from the container and the book object from sthe array
    removeBookIcon.addEventListener("click", () => {
      // Find the ancestor element with the class of book
      const removeBookElement = removeBookIcon.closest(".book");

      // Obtain the id of the book
      const removeBookElementId = removeBookElement.dataset.id;

      // Find the index of the book object in the myLibrary array to splice it
      const removeBookObjectIndex = myLibrary.findIndex(
        (book) => book.id === removeBookElementId
      );
      myLibrary.splice(removeBookObjectIndex, 1);

      // Remove the book from the DOM
      removeBookElement.remove();

      if (book.haveRead === true) {
        readingProgress.updateProgress("remove");
      }
    });

    bookButtonContainer.appendChild(haveReadButton);
    bookButtonContainer.appendChild(removeBookIcon);
    bookElement.appendChild(bookButtonContainer);

    booksContainer.appendChild(bookElement);
  }
}

// Update the progress bar
function updateProgressBar(progressPercentage) {
  const progressBar = document.querySelector(".progress-bar");
  const barStatus = document.querySelector(".bar-status");

  // Calculate the width of the bar-status as a percentage of the progress-bar's width
  const progressWidth = progressPercentage * progressBar.offsetWidth;

  // Set the width of .bar-status based on the progress
  barStatus.style.width = `${progressWidth}px`; // Set in pixels
}
