// When the page loads, get the existing quotes from the db and hand them to the renderQuotes function
document.addEventListener('DOMContentLoaded', getQuotes)
const quoteForm = document.getElementById('new-quote-form');

function getQuotes(){
    fetch ('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    .then(data => {
        renderQuotes(data)
    })
}

// Receives an array of quotes, and for each element within the array, create a list item with two buttons, and add it to the DOM
function renderQuotes(data){
    for (each of data) {
    let li = document.createElement('li');
    li.className = 'quote-card';

    let p = document.createElement('p');
    p.innerText = each.quote;
    p.className = 'mb-0';

    let footer = document.createElement('p');
    footer.innerText = `${each.author}`;
    footer.className = 'blockquote-footer'
    footer.style.fontFamily = "Verdana";
    footer.style.textAlign = 'right'

    let button1 = document.createElement('button')
    button1.className = 'btn-success';
    button1.innerHTML = 'Like'
    let button2 = document.createElement('button')
    button2.className = 'btn-danger';
    button2.innerHTML = 'Delete'

    li.append(p,footer, button1, button2)
    let quoteList = document.getElementById('quote-list')
    quoteList.append(li)
    }
}

// When someone clicks on the like button, increase the number by 1. and update the display without reloading the page
document.getElementsByClassName('btn-success').addEventListener('click', increaseLikes)

function increaseLikes(e){
    e.preventDefault()
    let likeCount = parseInt(e.target.innerText)++

    fetch('http://localhost:3000/likes'),{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
            body: JSON.stringify({
                "likes": likeCount
            })
        }
        .then(res => res.json())
        .then((like))
    }

// When someone clicks on the delete button, delete the quote 

// When someone submits a new quote, add that quote to the list without reloading the page (use pessimistic rendering, so you'll have to send the quote to the db first: https://medium.com/@whosale/optimistic-and-pessimistic-ui-rendering-approaches-bc49d1298cc0)
document.addEventListener('submit', addQuotes(e));
function addQuotes(e){
    e.preventDefault()
    fetch('http://localhost:3000/quotes?_embed=likes'), {
        method: "POST",
        headers:
         {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
        "new-quote": e.target.name.value,
        "author": e.target.author.value,
        "likes": 0
      })
    }
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
}