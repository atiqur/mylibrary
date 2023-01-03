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
    currentItem: null,
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
    getBooks: function () {
      return library.books
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
    listGroup: ".list-group",
    submitBtn: "#addBookSubmitBtn",
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
      li.innerHTML = `<p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Read: ${book.isRead}</p>
            <button type="button" class="btn btn-success" id="editBookBtn">Edit</button>
            <button type="button" class="btn btn-danger" id="deleteBookBtn">Delete</button>`
      document
        .querySelector(UISelectors.listGroup)
        .insertAdjacentElement("beforeend", li)
    },
    showBookList: function (books) {
      books.forEach((book) => {
        UICtrl.addBookToList(book)
      })
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
  const loadEventListners = function () {
    const UISelectors = UICtrl.getSelectors()
    document
      .querySelector(UISelectors.submitBtn)
      .addEventListener("click", bookAddBtn)
  }

  const bookAddBtn = function (e) {
    const bookTitle = UICtrl.getBookTitle()
    const author = UICtrl.getAuthor()
    const isRead = UICtrl.getIsRead()

    if (bookTitle !== "" && author !== "") {
      const newBook = ItemCtrl.addBook(bookTitle, author, isRead)

      UICtrl.addBookToList(newBook)
      UICtrl.clearInput()
    }
    e.preventDefault()
  }

  return {
    init: function () {
      loadEventListners()
    },
  }
})(ItemCtrl, UICtrl)

App.init()
