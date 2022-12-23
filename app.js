const bookTitle = document.querySelector('#bookInputTitle');
const bookAuthor = document.querySelector('#bookInputAuthor');
const bookIsRead = document.querySelector('#bookIsRead');
const listGroup = document.querySelector('.list-group');

const submitBtn = document.querySelector('#addBookSubmitBtn');

submitBtn.addEventListener('click', addBookToLibrary);

let myLibrary = [];

function Book(title = undefined, author = undefined, isRead = false) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
}

function addBookToLibrary(e) {
  const book = new Book(bookTitle.value, bookAuthor.value, bookIsRead.checked);
  myLibrary.push(book);
  addBookToList();
  e.preventDefault();
}

function addBookToList() {
  myLibrary.forEach((book) => {
    listGroup.appendChild(document.ap`
    <li class="list-group-item">
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Read: ${book.isRead}</p>
    </li>
    `);
  });
}
