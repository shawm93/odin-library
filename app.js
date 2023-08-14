const addForm = document.querySelector(".addForm");
const addBook = document.querySelector(".addBook");
const container = document.querySelector(".container");
const input_form = document.querySelector(".input_form");
const cancel = document.querySelector(".cancel");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const cards = document.querySelector(".cards");
let del_btns = document.querySelectorAll(".del_btn");
let read_btns = document.querySelectorAll(".read_btn");
let card = document.querySelectorAll(".card");

let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = function() {
    //     return (`${title} by ${author}, ${pages} pages, ${read}`);
    // }
}

Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
}

addForm.addEventListener('click', () => {
    console.log('click');
    container.classList.add("display-hidden");
    input_form.classList.remove("display-hidden");
})

cancel.addEventListener('click', () => {
    container.classList.remove("display-hidden");
    input_form.classList.add("display-hidden");
})

addBook.addEventListener('click', () => {
    container.classList.remove("display-hidden");
    input_form.classList.add("display-hidden");
    let del_btn = document.createElement('button');
    let read_btn = document.createElement('button');
    del_btn.textContent = "Delete";
    del_btn.classList.add("del_btn");
    read_btn.textContent = "Not Read";
    read_btn.classList.add("read_btn");
    let card = document.createElement('div');
    let title_h3 = document.createElement('h3');
    let author_p = document.createElement('p');
    let pages_p = document.createElement('p');
    let read_p = document.createElement('p');

    let read = 'finished';
    if (document.querySelector("#no").checked) {
        read = 'not read yet';
        read_btn.textContent = "Read"
    }

    let newBook = new Book(title.value, author.value, pages.value, read);
    newBook.addBookToLibrary();

    card.classList.add('card');
    title_h3.textContent = newBook.title;
    author_p.textContent = `Title: ${newBook.author}`;
    pages_p.textContent = `Pages: ${newBook.pages}`;
    read_p.textContent = `Status: ${newBook.read}`;
    card.appendChild(title_h3);
    card.appendChild(author_p);
    card.appendChild(pages_p);
    card.appendChild(read_p);
    card.appendChild(read_btn);
    card.appendChild(del_btn);
    cards.appendChild(card);

    del_btns = document.querySelectorAll(".del_btn");
    read_btns = document.querySelectorAll(".read_btn");
    card = document.querySelectorAll(".card");

    console.log(del_btns);
    del_btns.forEach(del_btn => del_btn.addEventListener('click', () => {
        console.log('delete');
        Array.from(card).splice(Array.from(del_btns).indexOf(del_btn), Array.from(del_btns).indexOf(del_btn));
        read_btns = document.querySelectorAll(".read_btn");
        del_btns = document.querySelectorAll(".del_btn");
        card = document.querySelectorAll(".card");
    }));
})

