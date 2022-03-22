let cart;
const getLocalStorage = () =>{
    cart = localStorage.getItem("product");
    if(cart == null){
        alert('votre panier est vide');
        document.location.href = "../html/index.html"
    }else{
        cart = JSON.parse(cart); 
    };
};


  
let productId;
let productColor;
let productQuantity;

let product = [];
const fetchProduct = async() =>{
    await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) =>{ 
        product = data
    })
    .catch (err => console.log("erreur de récupération des données de l'API", err));
};  
let articleCartItem;
let cartItem;
const createCartItem = () =>{
    cartItem = document.getElementById('cart__items');
    articleCartItem = document.createElement('article');
    cartItem.appendChild(articleCartItem);
    articleCartItem.classList.add("cart__item");
    articleCartItem.setAttribute('data-id', `${productId}`);
    articleCartItem.setAttribute('data-color', `${productColor}`);
}

const getImageProduct = async () =>{
    const cartItemImage = document.createElement('div');
    articleCartItem.appendChild(cartItemImage);
    cartItemImage.classList.add("cart__item__img");
    const productImage = document.createElement('img');
    cartItemImage.appendChild(productImage);
    productImage.setAttribute("src", product.imageUrl);
    productImage.setAttribute("alt", product.altTxt);
}

let cartItemContent;
// cart__item__content
const createCartItemContent = async () =>{    
    cartItemContent = document.createElement('div');
    articleCartItem.appendChild(cartItemContent);
    cartItemContent.classList.add("cart__item__content");
};

const createContentDescription = ()=>{
    //cart__item__content__description
    const cartItemContentDescription = document.createElement('div');
    cartItemContent.appendChild(cartItemContentDescription);
    cartItemContentDescription.classList.add("cart__item__content__description");

    const titleProduct = document.createElement('h2');
    cartItemContentDescription.appendChild(titleProduct);
    titleProduct.textContent = product.name;
    
    const cartColor = document.createElement('p');
    cartItemContentDescription.appendChild(cartColor);
    cartColor.textContent = productColor;
    
    const cartPrice = document.createElement('p');
    cartItemContentDescription.appendChild(cartPrice);
    cartPrice.textContent = product.price + ' €';
};
let cartItemContentSettings
let settingQuantity;
let inputQuantity;
//cart__item__content__settings
const createContentsettings = () =>{
    cartItemContentSettings = document.createElement('div');
    cartItemContent.appendChild(cartItemContentSettings);
    cartItemContentSettings.classList.add('cart__item__content__settings');
    
    //cart__item__content__setting__quantity
    settingQuantity = document.createElement('div');
    cartItemContentSettings.appendChild(settingQuantity);
    settingQuantity.classList.add('cart__item__content__settings__quantity')
    
    const quantity = document.createElement('p');
    settingQuantity.appendChild(quantity);
    quantity.textContent = "Qté : ";
    
    inputQuantity = document.createElement('input');
    settingQuantity.appendChild(inputQuantity);
    inputQuantity.classList.add('itemQuantity');
    inputQuantity.setAttribute('type', 'number');
    inputQuantity.setAttribute('name', 'itemQuantity');
    inputQuantity.setAttribute('min', '1');
    inputQuantity.setAttribute('max', '100');
    inputQuantity.setAttribute('value', productQuantity);
}
let deleteProduct; 
const createDelete = () =>{
    const settingsDelete = document.createElement('div');
    cartItemContentSettings.appendChild(settingsDelete);
    settingsDelete.classList.add("cart__item__settings__delete");
    
    deleteProduct = document.createElement('p');
    settingsDelete.appendChild(deleteProduct);
    deleteProduct.textContent = "Supprimer";
    deleteProduct.addEventListener("mousemove", function (e) {
        let modifCurser = e.target;
        modifCurser.style.cursor = 'pointer';
    });
};

const saveLocalStorage = (cart) =>{
    localStorage.setItem('product', JSON.stringify(cart));
};



const productQuantityModif = () =>{
    inputQuantity.addEventListener('change', function (e){
       
        inputNewQuantity = e.target.value;
        inputQuantity.setAttribute('value', inputNewQuantity);
       
        let inputQuantityModif = e.target.parentElement;
        let inputModif = inputQuantityModif.closest('article');
        
        idInputModif = inputModif.dataset.id;
        colorInputModif = inputModif.dataset.color;

        let foundProduct = cart.find(p => p.id == idInputModif && p.color == colorInputModif)
        foundProduct.quantity = inputNewQuantity;
        saveLocalStorage(cart);
       
        console.log(cart);
       
    });
};

const cartDeleteProduct = () =>{
    deleteProduct.addEventListener('click', function(e){
        let productToDelete = e.target;
        let articleDelete = productToDelete.closest("article");
        
        cart.pop(articleDelete);
        cartItem.removeChild(articleDelete);
        saveLocalStorage(cart);
    })
   
}

let idInputModif;
let colorInputModif;
let inputNewQuantity;
const initCart = async() =>{
   getLocalStorage();
    for(let i = 0; i < cart.length; i++){
        productId = cart[i].id;
        productColor = cart[i].color;
        productQuantity = cart[i].quantity;
   
    await fetchProduct();
    createCartItem();
    getImageProduct();
    createCartItemContent();
    createContentDescription();
    createContentsettings();
    createDelete();
    productQuantityModif();
    cartDeleteProduct();
    }
    
};

initCart();


 