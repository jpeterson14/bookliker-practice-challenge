const BOOKS_URL = "http://localhost:3000/books"
const USERS_URL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", () => {
    getBooks()
}) 

const getBooks = () => {
    fetch(BOOKS_URL)
    .then(response => response.json())
    .then(books => {
        books.forEach(book => renderBook(book))
    })
}
const renderBook = (book) => {
    const bookTitle = document.createElement("li")
    
    bookTitle.innerText = book.title
    
    const bookListParent = document.querySelector('#list')
    
    bookListParent.appendChild(bookTitle)
    
    bookTitle.addEventListener('click', (e) => {
        showMoreInfo(book)
    })
}
    const showMoreInfo = (book) => {
        const bookImage = document.createElement('img')
        bookImage.src = book.img_url
        
        const bookTitle = document.createElement('h3')
        bookTitle.innerText = book.title
        
        const subTitle = document.createElement('h3')
        subTitle.innerText = book.subtitle
        
        const authorTitle = document.createElement('h3')
        authorTitle.innerText = book.author

        const bookDesc = document.createElement('p')
        bookDesc.innerText = book.description

        const bookLikers = document.createElement('ul')
        book.users.forEach(user => {
            const likerItem = document.createElement('li')
            likerItem.innerText = user.username
            bookLikers.appendChild(likerItem)
            
        })
        const likeBtn = document.createElement('button')
        likeBtn.innerText = 'LIKE'
        likeBtn.addEventListener('click', (e) => {
            likeABook(e,book)
        })

        const bookInfoPanel = document.querySelector('#show-panel')
        bookInfoPanel.innerHtml = ""
        
        bookInfoPanel.appendChild(bookImage)
        bookInfoPanel.appendChild(bookTitle)
        bookInfoPanel.appendChild(subTitle)
        bookInfoPanel.appendChild(authorTitle)
        bookInfoPanel.appendChild(bookDesc)
        bookInfoPanel.appendChild(bookLikers)
        bookInfoPanel.appendChild(likeBtn)
    }
    const likeABook = (e,book) => {
        const userListParent = e.target.parentElement.querySelector('ul')
        const likerItem = document.createElement('li')
            likerItem.innerText = "pouros"
            userListParent.appendChild(likerItem)

        const likers = [...book.users,{"id":1, "username":"pouros"}]
    console.log(likers)
        fetch(`http://localhost:3000/books/${book.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ users: likers })
        }).then(response => response.json())
        .then(data => console.log(data))
    }

