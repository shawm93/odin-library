const addForm = document.querySelector(".addForm");
const addBook = document.querySelector(".addBook");
const container = document.querySelector(".container");
const input_form = document.querySelector(".input_form");
const cancelForm = document.querySelector(".cancel");
const clearAll = document.querySelector(".clearAll");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const cards = document.querySelector(".cards");
const delete_form = document.querySelector(".delete_form");
const no_delete = document.querySelector(".no_delete");
const yes_delete = document.querySelector(".yes_delete");
const clear_form = document.querySelector(".clear_form");
const no_deleteAll = document.querySelector(".no_deleteAll");
const yes_deleteAll = document.querySelector(".yes_deleteAll");
const footer = document.querySelector(".site-footer");

const book_qty = document.querySelector(".book_qty")
const book_complete_qty = document.querySelector(".book_complete_qty")
const book_incomplete_qty = document.querySelector(".book_incomplete_qty")
const page_qty = document.querySelector(".page_qty")
const page_read_qty = document.querySelector(".page_read_qty")

let del_btns = document.querySelectorAll(".del_btn");
let read_btns = document.querySelectorAll(".read_btn");
let read_ps = document.querySelectorAll(".read_p");
let card = document.querySelectorAll(".card");

let myLibrary = [new Book ('sdf', 'sdfsd', '100', 1), 
                new Book ('sdf', 'sdfsd', '100', 0), 
                new Book ('sdf', 'sdfsd', '100', 0),
                new Book ('sdf', 'sdfsd', '100', 0),
                new Book ('sdf', 'sdfsd', '100', 0)]

let index = myLibrary.length - 1

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
}

function displayUI() {
    book_qty.textContent = myLibrary.length;
    book_complete_qty.textContent = 0;
    book_incomplete_qty.textContent = 0;
    page_qty.textContent = 0;
    page_read_qty.textContent = 0;
    index = myLibrary.length - 1;
    cards.innerHTML = ``;
    myLibrary.forEach((book) => {
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
        read_p.classList.add("read_p");

        let read = 'finished';

        if (book.read == 0) {
            read = 'not read yet';
            read_btn.textContent = "Read"
            book_incomplete_qty.textContent = Number(book_incomplete_qty.textContent) + 1
            page_read_qty.textContent = Number(page_read_qty.textContent) - Number(book.pages);
        }

        card.classList.add('card');
        title_h3.textContent = book.title;
        author_p.textContent = `Author: ${book.author}`;
        pages_p.textContent = `Pages: ${book.pages}`;
        read_p.textContent = `Status: ${read}`;

        page_qty.textContent = Number(page_qty.textContent) + Number(book.pages);

        card.appendChild(title_h3);
        card.appendChild(author_p);
        card.appendChild(pages_p);
        card.appendChild(read_p);
        card.appendChild(read_btn);
        card.appendChild(del_btn);
        cards.appendChild(card);
    })
    
    page_read_qty.textContent = Number(page_read_qty.textContent) + Number(page_qty.textContent);
    book_complete_qty.textContent = book_qty.textContent - book_incomplete_qty.textContent;
    del_btns = document.querySelectorAll(".del_btn");
    read_btns = document.querySelectorAll(".read_btn");
    read_ps = document.querySelectorAll(".read_p");
    card = document.querySelectorAll(".card");

    del_btns.forEach(del_btn => del_btn.addEventListener('click', () => {
        container.classList.add("display-hidden");
        delete_form.classList.remove("display-hidden");
        index = Array.from(del_btns).indexOf(del_btn);
        read_btns = document.querySelectorAll(".read_btn");
        del_btns = document.querySelectorAll(".del_btn");
        card = document.querySelectorAll(".card");
    }));

    read_btns.forEach(read_btn => read_btn.addEventListener('click', () => {
        index = Array.from(read_btns).indexOf(read_btn);
        if (myLibrary[index].read == 0) {
            myLibrary[index].read = 1
            read_btn.textContent = `Not Read`
            read_ps[index].textContent =  `Status: finished`
            book_incomplete_qty.textContent = Number(book_incomplete_qty.textContent) - 1
            book_complete_qty.textContent = Number(book_complete_qty.textContent) + 1
            page_read_qty.textContent = Number(page_read_qty.textContent) + Number(myLibrary[index].pages);
        } else {
            myLibrary[index].read = 0
            read_btn.textContent = `Read`
            read_ps[index].textContent =  `Status: not read yet`
            book_incomplete_qty.textContent = Number(book_incomplete_qty.textContent) + 1
            book_complete_qty.textContent = Number(book_complete_qty.textContent) - 1
            page_read_qty.textContent = Number(page_read_qty.textContent) - Number(myLibrary[index].pages);
        }
        index = myLibrary.length - 1
    }));
}

const resetForm = () => {
    if (document.querySelector("#no").checked) {
        document.querySelector("#no").checked = false;
        document.querySelector("#yes").checked = true;
    }

    title.value = ``;
    author.value = ``; 
    pages.value = ``;
}

displayUI();

addForm.addEventListener('click', () => {
    container.classList.add("display-hidden");
    input_form.classList.remove("display-hidden");
})

clearAll.addEventListener('click', () => {
    container.classList.add("display-hidden");
    footer.classList.add("display-hidden");
    clear_form.classList.remove("display-hidden");
})

cancelForm.addEventListener('click', () => {
    container.classList.remove("display-hidden");
    footer.classList.remove("display-hidden");
    input_form.classList.add("display-hidden");
    resetForm();
})

no_delete.addEventListener('click', () => {
    container.classList.remove("display-hidden");
    footer.classList.remove("display-hidden");
    delete_form.classList.add("display-hidden");
    index = myLibrary.length - 1;
})

yes_delete.addEventListener('click', () => {
    container.classList.remove("display-hidden");
    footer.classList.remove("display-hidden");
    delete_form.classList.add("display-hidden");
    myLibrary = myLibrary.slice(0, index).concat(myLibrary.slice(index+1));
    displayUI();
})

no_deleteAll.addEventListener('click', () => {
    container.classList.remove("display-hidden");
    footer.classList.remove("display-hidden");
    clear_form.classList.add("display-hidden");
    index = myLibrary.length - 1;
})

yes_deleteAll.addEventListener('click', () => {
    container.classList.remove("display-hidden");
    footer.classList.remove("display-hidden");
    clear_form.classList.add("display-hidden");
    myLibrary = [];
    displayUI();
})

addBook.addEventListener('click', () => {
    if (title.value == `` || author.value == `` || pages.value == ``) {
        alert("Incomplete infos")
    } else {
        container.classList.remove("display-hidden");
        input_form.classList.add("display-hidden");

        let read_value = document.querySelector("#no").checked ? 0 : 1;

        let newBook = new Book(title.value, author.value, pages.value, read_value);
        newBook.addBookToLibrary();

        resetForm();

        displayUI();
    }
})