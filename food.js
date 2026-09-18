let foods=[{image:"./images/pizaapepperoni.jpg",
            name:"Pizaa with Pepperoni",
            icon  :"🍕",
            category: "pizaa",
            price:250},
            {image:"./images/cheesepizza.jpg",
            name:"Pizaa with Cheese",
            icon  :"🍕",
            category: "pizaa",
            price:450},
           {image:"./images/Chocolateberrypizaa.jpg",
            name:"Pizaa with Chocolateberry",
            icon  :"🍕",
            category: "pizaa",
            price:350},
          {image:"./images/Margheritapizza.jpg",
            name:"Pizaa with Margherita",
            category: "pizaa",
            icon  :"🍕",
            category: "pizaa",
            price:400},
        {image:"./images/ChacoPizaa.jpg",
            icon  :"🍕",
            name:"Chaco Pizaa",
            category: "pizaa",
            price:300},
             {image:"./images/topings.jpg",
            name:"Variety Topings",
            icon  :"🍕",
            category: "pizaa",
            price:500},
            {
        name: "Classic Burger",
        price: 150,
        image: "./images/classic-burger.jpg",
        category: "burger",
        icon  :"🍔"
    },
    {
        name: "Cheese Burger",
        price: 180,
        image: "./images/cheese-burger.jpg",
        category: "burger",
        icon  :"🍔"
    },
    {
        name: "Chicken Burger",
        price: 200,
        image: "./images/chicken-burger.jpg",
        category: "burger",
        icon  :"🍔"
    },
    {
        name: "Double Patty Burger",
        price: 250,
        image: "./images/double-burger.jpg",
        category: "burger",
        icon  :"🍔"
    },
    {
        name: "Veggie Burger",
        price: 160,
        image: "./images/veg-burger.jpg",
        category: "burger",
        icon  :"🍔"
    },
    {
        name: "Spicy Burger",
        price: 190,
        image: "./images/spicy-burger.jpg",
        category: "burger",
        icon  :"🍔"
    },
    {
    name: "Classic French Fries",
    price: 100,
    image: "./images/classic-fries.jpg",
    category: "fries",
    icon: "🍟"
},
{
    name: "Cheese Fries",
    price: 150,
    image: "./images/cheese-fries.jpg",
    category: "fries",
    icon: "🍟"
},
{
    name: "Peri Peri Fries",
    price: 140,
    image: "./images/peri-peri-fries.jpg",
  category: "fries",
    icon: "🍟"
},
{
    name: "Loaded Fries",
    price: 180,
    image: "./images/loaded-fries.jpg",
    category: "fries",
    icon: "🍟"
},
{
    name: "Masala Fries",
    price: 130,
    image: "./images/masala-fries.jpg",
    icon: "🍟",
   category: "fries"
}
]
let cards = document.getElementById("cards")
const chatToggle = document.getElementById("chatToggle");
const chatContainer = document.querySelector(".chat-container");
const closeChat = document.getElementById("closeChat");
let isChatOpen = false;

chatToggle.addEventListener("click", function () {

    if (isChatOpen) {

        chatContainer.style.display = "none";
        isChatOpen = false;

    } else {

        chatContainer.style.display = "flex";
        isChatOpen = true;

    }

});


closeChat.addEventListener("click", function () {
    chatContainer.style.display = "none";
});
function displayCards(foodList = foods){
    let display = "";
 foodList.forEach((food,index)=>{
display+=`<div class="card">
     <img  class="cardImg" src="${food.image}">
       <div class="cardContent">
     <p>${food.name}<br><span style="color:grey;font-size:15px;">⏱ 14-20 min</span></p>
     <p style="color:green">₹${food.price}</p>
     <p style="color:orange">
⭐ 4.8
</p>
     <button type="submit" class="add" onclick="addToCart(${index})">Add</button>
</div>
</div>`
});
cards.innerHTML=display;
}
displayCards();
let carttext=document.getElementById("carttext");
let cart=[];
       function addToCart(index){
       
            let existingItem = cart.find(
        item => item.name === foods[index].name
    );

    if(existingItem){
        existingItem.quantity++;
    }
    else{
        cart.push({
            icon:foods[index].icon,
            name: foods[index].name,
            price: foods[index].price,
            quantity: 1
        });
    }

    displayItems();
}
function increaseQty(index){
    cart[index].quantity++;
    displayItems();
}   

function decreaseQty(index){

    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }
    else{
        cart.splice(index,1);
    }

    displayItems();
}
function displayItems(){
let totalAmount=0;
 let list=document.getElementById("list")
  list.innerHTML = "";
  if(cart.length===0)
  {
list.innerHTML=`<li class="empty-cart">🛒 Your cart is empty<br>

Start adding delicious pizzas!</li>`;
  }
  else{
 cart.forEach((food,index)=>{
 let li=document.createElement("li");
 li.classList.add("cart-item")
 li.innerHTML=`<span>
  ${food.icon}<strong>${food.name}</strong> 
    - ₹${food.price}<br><br>
   <strong>Qty</strong>
<button onclick="decreaseQty(${index})">[-]</button>

    <strong>${food.quantity}</strong>

    <button id="qty" onclick="increaseQty(${index})">[+]</button>
</span><button id="qty" onclick="removeFromCart(${index})">Remove</button>`;
 list.appendChild(li);
 totalAmount=totalAmount+(food.price*food.quantity);
 });
}
 document.getElementById("total").textContent = totalAmount;
}
function removeFromCart(index)
{
cart.splice(index,1)
displayItems();
}
function clearCart()
{
    cart=[];
    displayItems();
}
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty 🛒");
        return;
    }
let totalAmount = 0; 
cart.forEach(function(item) {
     totalAmount += item.price * item.quantity; }); 
     localStorage.setItem("orderTotal", totalAmount);
     localStorage.setItem("orderItems", JSON.stringify(cart));
   window.location.href = "checkout.html";
}
function quickAsk(text){
    userInput.value = text;
    sendMessage();
}
function filterCategory(category) {
     currentCategory = category;
    const filteredFoods = foods.filter(food => 
        food.category === category
    );

    displayCards(filteredFoods);
}function showAll() {

    currentCategory = "all";

    displayCards(foods);
}

const search = document.querySelector(".contentsearch");

search.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    let filteredFoods = foods;

    // First filter by category
    if (currentCategory !== "all") {

        filteredFoods = filteredFoods.filter(food =>
            food.category === currentCategory
        );
    }

    // Then filter by search text
    filteredFoods = filteredFoods.filter(food =>
        food.name.toLowerCase().includes(value)
    );

    displayCards(filteredFoods);
});