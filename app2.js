// Storage Controller
const StorageCtrl = (function () {})()

// Item Controller
const ItemCtrl = (function () {
  const Book = function (id, title, author, isRead) {
    this.id = id
    this.title = title
    this.author = author
    this.isRead = isRead
  }

  const library = {
    books: [],
    currentBookIndex: null,
  }

  return {
    addBook: function (title, author, isRead) {
      let id
      if (library.books.length > 0) {
        id = library.books.length
      } else {
        id = 0
      }
      const newBook = new Book(id, title, author, isRead)
      library.books.push(newBook)

      return newBook
    },
    getCurrentBookIndex: function () {
      return library.currentBookIndex
    },
    setCurrentBookIndex: function (index) {
      library.currentBookIndex = index
    },
    deleteBook: function (id) {
      const ids = library.books.map((book) => book.id)
      const index = ids.indexOf(id)
      library.books.splice(index, 1)
    },
    updateBook: function (id) {
      const book = ItemCtrl.getBookById(id)
      book.title = UICtrl.getBookTitle()
      book.author = UICtrl.getAuthor()
      book.isRead = UICtrl.getIsRead()
      return book
    },
    getBooks: function () {
      return library.books
    },
    getBookById: function (id) {
      let found

      library.books.forEach((book) => {
        if (book.id === id) {
          found = book
        }
      })
      return found
    },
    logData: function () {
      return library
    },
  }
})()

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    inputTitle: "#bookInputTitle",
    inputAuthor: "#bookInputAuthor",
    isRead: "#bookIsRead",
    deleteBook: ".deleteBookBtn",
    editBook: ".editBookBtn",
    listGroup: ".list-group",
    submitBtn: "#addBookSubmitBtn",
    updateBtn: "#updateBookSubmitBtn",
  }
  return {
    getSelectors: function () {
      return UISelectors
    },
    getBookTitle: function () {
      return document.querySelector(UISelectors.inputTitle).value
    },
    getAuthor: function () {
      return document.querySelector(UISelectors.inputAuthor).value
    },
    getIsRead: function () {
      return document.querySelector(UISelectors.isRead).checked
    },
    addBookToList: function (book) {
      let li = document.createElement("li")
      li.className = "list-group-item"
      li.id = `item-${book.id}`
      li.innerHTML = `<p class="title">Title: ${book.title}</p>
            <p class="author">Author: ${book.author}</p>
            <p class="isRead">Read: ${book.isRead}</p>
            <button type="button" class="btn btn-success editBookBtn">Edit</button>
            <button type="button" class="btn btn-danger deleteBookBtn">Delete</button>`
      document
        .querySelector(UISelectors.listGroup)
        .insertAdjacentElement("beforeend", li)
    },
    putInInputFields: function (book) {
      document.querySelector(UISelectors.inputTitle).value = book.title
      document.querySelector(UISelectors.inputAuthor).value = book.author
      document.querySelector(UISelectors.isRead).checked = book.isRead
    },
    showUpdateBtn: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline"
    },
    hideUpdateBtn: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "none"
    },
    showAddBtn: function () {
      document.querySelector(UISelectors.submitBtn).style.display = "inline"
    },
    hideAddBtn: function () {
      document.querySelector(UISelectors.submitBtn).style.display = "none"
    },

    showUpdatedBook: function (book) {
      const bookId = `#item-${book.id}`
      const bookToUpdate = document.querySelector(bookId)
      bookToUpdate.querySelector(".title").textContent = `Title: ${book.title}`
      bookToUpdate.querySelector(
        ".author"
      ).textContent = `Author: ${book.author}`
      bookToUpdate.querySelector(".isRead").textContent = `Read: ${book.isRead}`
    },
    showBookList: function () {
      const books = ItemCtrl.getBooks()
      books.forEach((book) => {
        UICtrl.addBookToList(book)
      })
    },
    deleteBookFromList: function (id) {
      const bookId = `#item-${id}`
      const bookToDelete = document.querySelector(bookId)
      bookToDelete.remove()
    },
    clearInput: function () {
      document.querySelector(UISelectors.inputTitle).value = ""
      document.querySelector(UISelectors.inputAuthor).value = ""
      document.querySelector(UISelectors.isRead).checked = false
    },
  }
})()

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  const UISelectors = UICtrl.getSelectors()
  const loadEventListners = function () {
    document
      .querySelector(UISelectors.submitBtn)
      .addEventListener("click", bookAddBtnClicked)

    document
      .querySelector(UISelectors.listGroup)
      .addEventListener("click", editBookBtnClicked)

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", bookUpdateBtnClicked)
  }

  const bookAddBtnClicked = function (e) {
    const bookTitle = UICtrl.getBookTitle()
    const author = UICtrl.getAuthor()
    const isRead = UICtrl.getIsRead()

    if (bookTitle !== "" && author !== "") {
      const newBook = ItemCtrl.addBook(bookTitle, author, isRead)

      UICtrl.addBookToList(newBook)
      UICtrl.clearInput()
    } else {
      alert("Please provide a valid input.")
    }
    e.preventDefault()
  }

  const bookUpdateBtnClicked = function (e) {
    const id = ItemCtrl.getCurrentBookIndex()
    const updatedBook = ItemCtrl.updateBook(id)
    UICtrl.showUpdatedBook(updatedBook)
    UICtrl.hideUpdateBtn()
    UICtrl.showAddBtn()
    UICtrl.clearInput()
    e.preventDefault()
  }

  const editBookBtnClicked = function (e) {
    const bookId = e.target.parentNode.id
    const bookArr = bookId.split("-")
    const id = parseInt(bookArr[1])
    const bookToEdit = ItemCtrl.getBookById(id)
    if (e.target.classList.contains("editBookBtn")) {
      editBook(bookToEdit)
    } else if (e.target.classList.contains("deleteBookBtn")) {
      deleteBook(id)
    }
    e.preventDefault()
  }

  const editBook = function (book) {
    ItemCtrl.setCurrentBookIndex(book.id)
    UICtrl.hideAddBtn()
    UICtrl.showUpdateBtn()
    UICtrl.putInInputFields(book)
  }

  const deleteBook = function (id) {
    const ok = confirm("Do you really want to delete this book?")
    if (ok) {
      ItemCtrl.deleteBook(id)
      UICtrl.deleteBookFromList(id)
    }
  }

  return {
    init: function () {
      loadEventListners()
    },
  }
})(ItemCtrl, UICtrl)

App.init()
