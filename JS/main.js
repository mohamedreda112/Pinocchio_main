document.addEventListener("scroll" , ()=> {
  let stikyHeader = document.querySelector(".stikyHeader");
  if (window.scrollY > 0) {
    stikyHeader.classList.add("scrollde")
  }else {
    stikyHeader.classList.remove("scrollde")
  }
})
// console.log(stikyHeader)

let allLinks = document.querySelectorAll(".navlinks .mainlinks li a");
let btn = document.querySelector(".btn");
let navLinks = document.querySelector(".navlinks");

btn.addEventListener("click" , function() {
  btn.classList.contains("change") ? btn.classList.remove("change") : btn.classList.add("change");
  navLinks.classList.toggle("open")
})

document.addEventListener("click" , (e)=> {
  if (!navLinks.contains(e.target) && !btn.contains(e.target)) {
    navLinks.classList.remove("open")
    .btn.classList.remove("change")
  }
})

allLinks.forEach((link)=> {
  link.addEventListener("click", function() {
    document.querySelector(".active")?.classList.remove("active");
    this.classList.add("active");
    navLinks.classList.remove("open");
    btn.classList.remove("change");
  })
})

// Create Cards
let mainDiv = document.querySelector(".cards");
let carticon = document.querySelector(".cart");
let quantity = document.querySelector(".quantity")
let shop = document.querySelector(".shop")
let body = document.querySelector("body")
let newCart = document.querySelector(".newCart")
let newList = document.querySelector(".newlist")
let total = document.querySelector(".total")
let listCards = []

let products = [
  {
    id: 1,
    name: "Sofa",
    image: "../IMGS/sofa-1.jpg",
    price: 400,
  },
  {
    id: 2,
    name: "Bed",
    image: "../IMGS/bed-1.jpg",
    price: 700,
  },
  {
    id: 3,
    name: "Chair",
    image: "../IMGS/chair-1.jpg",
    price: 80,
  },
  {
    id: 4,
    name: "NightStand",
    image: "../IMGS/nightstand-1.jpg",
    price: 60,
  },
  {
    id: 5,
    name: "Sofa",
    image: "../IMGS/sofa-2.jpg",
    price: 480,
  },
  {
    id: 6,
    name: "Bed",
    image: "../IMGS/bed-2.jpg",
    price: 1000,
  },
  {
    id: 7,
    name: "Chair",
    image: "../IMGS/chair-2.jpg",
    price: 120,
  },
  {
    id: 8,
    name: "NightStand",
    image: "../IMGS/nightstand-2.jpg",
    price: 100,
  },
  {
    id: 9,
    name: "Sofa",
    image: "../IMGS/sofa-3.jpg",
    price: 510,
  },
  {
    id: 10,
    name: "Bed",
    image: "../IMGS/bed-3.jpg",
    price: 1140,
  },
  {
    id: 11,
    name: "Chair",
    image: "../IMGS/chair-3.jpg",
    price: 60,
  },
  {
    id: 12,
    name: "NightStand",
    image: "../IMGS/nightstand-3.jpg",
    price: 90,
  },
];

function showProducts() {
  products.forEach((value, key) => {
    let card = document.createElement("div");
    card.classList.add("card", "hide",value.name.toLowerCase());
    card.innerHTML = `
    <img src="IMGS/${value.image}" alt="photo"/>
    <div class="info">
      <h3>${value.name}</h3>
      <div class="subInfo">
        <span>$${value.price}</span>
        <i onClick="addToCart(${key})" class="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
    `;
    mainDiv.appendChild(card)
  })
}
showProducts()

// Add to Card
function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = {...products[key], quantity: 1};
    // console.log("mohamed")
  }else {
    // console.log("ahmed")
    listCards[key].quantity++;
  }
  reloadCard()
}
function changeQuantity(key, newQuantity) {
  if (newQuantity >= 0) {
    listCards[key].quantity = newQuantity;
    reloadCard()
  }
}

function reloadCard() {
  newList.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice += value.price * value.quantity ;
    count += value.quantity;
    if (value != null) {
      let newCard = document.createElement("div");
      newCard.className = "new-card"
      newCard.innerHTML = `
      <div class="up-info">
        <img src="IMGS/${value.image}"/>
        <div class="btns">
        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        <div class="count">${value.quantity}</div>
        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
        </div>
      </div>
      <div class="down-info">
        <h3>${value.name}</h3>
        <span>${value.price}</span>
      </div>
      <div calss="pay-method">
        <h5>You Can Pay With:</h5>
        <div>
          <img src="IMGS/paypal.png" alt="Photo"/>
          <img src="IMGS/visa.png" alt="Photo"/>
        </div>
      </div>
      <div class="clear" onclick="clearIt(${key})">X</div>
      `;
      newList.appendChild(newCard)
    }
  })
  total.innerHTML = `$${totalPrice}`;
  quantity.innerText = count;
}

carticon.addEventListener("click", ()=> {
  let overlay = document.createElement("div")
  overlay.className ="overlay";
  let popUp = document.createElement("div");
  popUp.className = "pop-up";
  let closeBtn = document.createElement("div");
  closeBtn.className = "close-btn";
  closeBtn.innerText = "X";
  popUp.appendChild(newCart);
  newCart.style.display = "block";
  popUp.appendChild(closeBtn);
  shop.appendChild(popUp);
  body.appendChild(overlay)
})

function clearIt(key) {
  listCards.splice(key, 1)
  reloadCard();
}

document.addEventListener("click", function(e) {
  if (e.target.className === "close-btn") {
    document.querySelector(".pop-up").remove();
    document.querySelector(".overlay").remove();
  }
})

function filterProduct(value) {
  let btns = document.querySelectorAll(".btns .button-value");
  btns.forEach((btn) => {
    if (value.toUpperCase() == btn.innerText.toUpperCase()) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  let allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    if (value.toLowerCase() == "all") {
      card.classList.remove("hide");
    } else if (card.classList.contains(value.toLowerCase())) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}
window.onload = () => {
  filterProduct("all");
}


let year = document.getElementById("year");
let currentYear = new Date().getFullYear();
year.innerHTML = currentYear;