// Defining a myLibrary array which contains the library objects
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

const booksContainer = document.querySelector(".books-container");
const addBookButton = document.querySelector(".add-book-button");
const addBookDialog = document.querySelector(".add-book-dialog");
const closeDialogIcon = document.querySelector(".close-dialog-icon");
const addBookForm = document.querySelector("#add-book-form");

// Displat the books when the page loads
window.addEventListener("load", () => {
  renderLibrary();
});

// Add event listeners when the user wants to show or hide the dialog
addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});
closeDialogIcon.addEventListener("click", () => {
  addBookDialog.close();
});

addBookForm.addEventListener("submit", (event) => {
  // Prevent page refresh and sending items to the server
  event.preventDefault();

  // Add the book to the myLibrary array of Book objects
  addBookToLibrary();

  // Clear the form and close the dialog
  addBookForm.reset();
  addBookDialog.close();
});

// Defining a function which defines the book object
function Book(id, title, author, pages, haveRead) {
  // Throw error if constructors are not called with new
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

// Method for the book to toggle the read status from the given read data
Book.prototype.toggleReadStatus = function (readStatus) {
  this.haveRead = readStatus ? false : true;

  // Render the library to change the DOM
  renderLibrary();
};

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
      book.toggleReadStatus(book.haveRead);
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
      const removeBookObjectIndex = myLibrary.forEach(
        (book) => book.id === removeBookElementId
      );
      myLibrary.splice(removeBookObjectIndex, 1);

      // Remove the book from the DOM
      removeBookElement.remove();
    });

    bookButtonContainer.appendChild(haveReadButton);
    bookButtonContainer.appendChild(removeBookIcon);
    bookElement.appendChild(bookButtonContainer);

    booksContainer.appendChild(bookElement);
  }
}
