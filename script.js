// Defining a myLibrary array which contains the library objects
const myLibrary = [];
const booksContainer = document.querySelector(".books-container");

window.addEventListener("load", () => {
  addBookToLibrary("Dune", "Frank Herbert", 650, false);
  addBookToLibrary(
    "Harry Potter and The Prisoner of Azkaban",
    "J.K Rowling",
    320,
    false
  );
  addBookToLibrary("Gone Girl", "Gilian Flynn", 400, false);

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
function addBookToLibrary(title, author, pages, haveRead) {
  // Set a new randomId for each book to ensure each book has a unique identifier to prevent issues when books are removed or rearanged
  const randomId = crypto.randomUUID();
  const newBook = new Book(randomId, title, author, pages, haveRead);
  myLibrary.push(newBook);
}

// Function used to display the book objects from the myLbrary array
function renderLibrary() {
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
