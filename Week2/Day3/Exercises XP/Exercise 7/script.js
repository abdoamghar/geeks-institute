const allBooks = [
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
        alreadyRead: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        alreadyRead: false
    }
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
    const bookDiv = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Written by ${book.author}`;

    const image = document.createElement("img");
    image.src = book.image;
    image.style.width = "100px";

    if (book.alreadyRead) {
        title.style.color = "red";
        author.style.color = "red";
    }

    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(image);

    section.appendChild(bookDiv);
});