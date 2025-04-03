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
const submitDialogButton = document.querySelector(".submit-dialog-button");
const addBookForm = document.querySelector("#add-book-form");

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

closeDialogIcon.addEventListener("click", () => {
  addBookDialog.close();
});

submitDialogButton.addEventListener("click", (event) => {
  // Prevent page refresh and sending items to the server
  event.preventDefault();
  addBookToLibrary();
  addBookForm.reset();
  addBookDialog.close();
});

window.addEventListener("load", () => {
  renderLibrary();
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

// Defining a function to add a book to the library from a new Book object
function addBookToLibrary() {
  // Set a new randomId for each book to ensure each book has a unique identifier to prevent issues when books are removed or rearanged
  const randomId = crypto.randomUUID();

  // Obtain the values from the form given and create a new Book Object
  const newBookTitle = document.querySelector("#book-title").value;
  const newBookAuthor = document.querySelector("#book-author").value;
  const newBookPages = document.querySelector("#book-pages").value;
  const newBookHasRead = document.querySelector("#book-read").checked;

  console.log(newBookHasRead);
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
    booksContainer.innerHTML += `<div class="book">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <p class="book-pages">${book.pages} pages</p>
          <div class="button-container">
            <button class="have-read-button">Have Read</button>
            <img
              src="assets/logos/delete.svg"
              alt="Delete Book"
              class="remove-book"
            />
          </div>
        </div>`;
  }
}
