import { products } from "./src/js/data.js";
const conteinerStore = document.querySelector(".conteiner__store")
const contentCartBody= document.querySelector(".aside__cart-body")

let cart = {}

let html= "";

products.forEach(({id, nombre, precio, imagen, stock})=>{
    html += `
    <div class="conteiner__store__card">
    <div class="conteiner__store__card-img">
        <img src="${imagen}" alt="${nombre}">
    </div>
    <div class="conteiner__store__card-body" id="${id}">
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <p>Stock: ${stock}</p>
        <button class="btn__add">Add to shop</button>
    </div>
</div>`
}

); conteinerStore.innerHTML=html;

const iconCart = document.querySelector("#iconCart")
const contentCart = document.querySelector("#contentCart")
const btn__add = document.querySelector(".btn__add")

iconCart.addEventListener("click" ,(e) => {
    contentCart.classList.toggle("aside__cart-show")

})

function printProductInCart() {
    let html = ""

    const arrayCart = Object.values(cart)
    const total = document.querySelector("#total")
    let productsTotal = document.querySelector("#productsTotal")
    let sumTotal=0;
    let contCart=0;
    arrayCart.forEach(({id, nombre,  imagen, amount, precio})=>{
        
        html +=  `<div class="item__cart">
        <div class="item__cart-img">
            <img src="${imagen}" alt="${nombre}">
        </div>
    <h4 class="item__cart-tittle">"${nombre}"</h4>
    <div class="item__cart-options" id="${id}">
        <i class="fa-solid fa-minus"></i>
        <span id="amount">"${amount}"</span>
        <i class="fa-solid fa-plus"></i>
        <i class="fa-solid fa-trash"></i>
    </div>
</div>   `

    sumTotal+= amount*precio
    contCart += amount
});
    total.textContent= sumTotal
    contentCartBody.innerHTML=html
    productsTotal.textContent=contCart
}



conteinerStore.addEventListener("click", (e) =>{
    if(e.target.classList.contains("btn__add")){
   
    const idProduct= +e.target.parentElement.id
    const findProduct = products.find((item)=>item.id === idProduct);
    if (cart[idProduct] && cart[idProduct].amount < cart[idProduct].stock){
        cart[idProduct].amount++;
       
    } else if (!cart[idProduct]){
        cart[idProduct] = findProduct;
        cart[idProduct].amount = 1
    }
    printProductInCart()
  }
})
    
contentCartBody.addEventListener("click", (e) => {
    
    if(e.target.classList.contains("fa-minus"  )){
        const idProduct = +e.target.parentElement.id;
        if(cart[idProduct].amount >1){
            cart[idProduct].amount--;
        }
    }

    if(e.target.classList.contains("fa-plus")){
        const idProduct = +e.target.parentElement.id;
        if(cart[idProduct].amount <cart[idProduct].stock){
            cart[idProduct].amount++;
        }
    
    }

    if(e.target.classList.contains("fa-trash")){
        const idProduct = +e.target.parentElement.id;
        delete cart[idProduct]
    }
    printProductInCart()
})