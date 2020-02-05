// Book constructor
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		const list = document.getElementById("book-list");
		const row = document.createElement("tr");
		row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
		list.appendChild(row);
	}

	showAlert(message, className) {
		const div = document.createElement("div");
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		// Get parent
		const container = document.querySelector(".container");
		// Get form
		const form = document.querySelector("#book-form");
		// Insert alert
		container.insertBefore(div, form);
		// Timeout after 3sec
		setTimeout(function() {
			document.querySelector(".alert").remove();
		}, 3000);
	}

	clearFields() {
		document.getElementById("title").value = "";
		document.getElementById("author").value = "";
		document.getElementById("isbn").value = "";
	}

	deleteBook(target) {
		if (target.className === "delete") {
			target.parentElement.parentElement.remove();
		}
	}
}

class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}
		return books;
	}

	static displayBooks(book) {
		const books = Store.getBooks();
		console.log(books);
		books.forEach(function(book) {
			const ui = new UI();
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem("books", JSON.stringify(books));
	}

	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach(function(book, index) {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem("books", JSON.stringify(books));
	}
}

document.addEventListener("DOMContentLoaded", Store.displayBooks());

// Event listener
document.getElementById("book-form").addEventListener("submit", function(e) {
	e.preventDefault();

	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const isbn = document.getElementById("isbn").value;

	const book = new Book(title, author, isbn);
	const ui = new UI();

	if (title === "" || author === "" || isbn === "") {
		ui.showAlert("Please fill in all fields", "error");
	} else {
		ui.addBookToList(book);
		ui.showAlert("Book Added!", "success");
		Store.addBook(book);
		ui.clearFields();
	}
});

// Event listener
document.getElementById("book-list").addEventListener("click", function(e) {
	const ui = new UI();
	ui.deleteBook(e.target);
	ui.showAlert("Book Removed!", "success");
	// Delete element by isbn
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	e.preventDefault();
});
