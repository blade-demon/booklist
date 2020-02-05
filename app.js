// Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
	const list = document.getElementById("book-list");
	const row = document.createElement("tr");
	row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
	list.appendChild(row);
};

UI.prototype.showAlert = function(message, className) {
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
};

UI.prototype.clearFields = function() {
	document.getElementById("title").value = "";
	document.getElementById("author").value = "";
	document.getElementById("isbn").value = "";
};

UI.prototype.deleteBook = function(target) {
	if (target.className === "delete") {
		target.parentElement.parentElement.remove();
	}
};

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
		ui.clearFields();
	}
});

// Event listener
document.getElementById("book-list").addEventListener("click", function(e) {
	const ui = new UI();
	ui.deleteBook(e.target);
	ui.showAlert("Book Removed!", "success");
	e.preventDefault();
});
