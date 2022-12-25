// Storage controller

// Item controller
const ItemCtrl = (function () {
  function Book(title, author, isRead) {
    this.title = title
    this.author = author
    this.isRead = isRead
  }
  const library = []
  return {
    addBook: function (book) {
      const newBook = new Book(
        book.bookTitle.value,
        book.bookAuthor.value,
        book.bookIsRead.checked
      )
      library.push(newBook)
    },
    getLibrary: function () {
      return library
    },
  }
})()

// UI controller
const UICtrl = (function () {
  const bookTitle = document.querySelector("#bookInputTitle")
  const bookAuthor = document.querySelector("#bookInputAuthor")
  const bookIsRead = document.querySelector("#bookIsRead")
  const listGroup = document.querySelector(".list-group")
  const submitBtn = document.querySelector("#addBookSubmitBtn")

  return {
    book: {
      bookTitle,
      bookAuthor,
      bookIsRead,
    },
    listGroup,
    submitBtn,
    showBookList: function (library) {
      let li = ""
      library.forEach((book) => {
        li += `
          <li class="list-group-item">
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Read: ${book.isRead}</p>
            <button type="button" class="btn btn-success" id="editBookBtn">Edit</button>
            <button type="button" class="btn btn-danger" id="deleteBookBtn">Delete</button>
          </li>
          `
      })
      listGroup.innerHTML = li
    },
  }
})()

// App controller
const App = (function (ItemCtrl, UICtrl) {
  let book = UICtrl.book
  UICtrl.submitBtn.addEventListener("click", submitBtnClicked)

  function submitBtnClicked(e) {
    ItemCtrl.addBook(book)
    UICtrl.showBookList(ItemCtrl.getLibrary())
    e.preventDefault()
  }
})(ItemCtrl, UICtrl)
