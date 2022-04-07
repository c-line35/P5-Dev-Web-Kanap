let cart = [];
let product;
let productFetch;
let newCart = []
//récupération des données du local storage
const getLocalStorage = async() =>{
    cart = localStorage.getItem("product");
    cart = JSON.parse(cart);
};

//récupération des données de l'API pour le nom, le prix, la description
const fetchProduct = async(id) =>{
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => productFetch = data)
    .catch (err => console.log("erreur de récupération des données de l'API", err));
};

//création de l'article dans le dom
const createCartItem = async (id, color) =>{
    cartItem = document.getElementById('cart__items');
    articleCartItem = document.createElement('article');
    cartItem.appendChild(articleCartItem);
    articleCartItem.classList.add("cart__item");
    articleCartItem.setAttribute('data-id', id);
    articleCartItem.setAttribute('data-color', color);
};

//création de l'image affichée dans le panier
const getImageProduct = async (image, txt) =>{
    const cartItemImage = document.createElement('div');
    articleCartItem.appendChild(cartItemImage);
    cartItemImage.classList.add("cart__item__img");
    const productImage = document.createElement('img');
    cartItemImage.appendChild(productImage);
    productImage.setAttribute("src", image);
    productImage.setAttribute("alt", txt);
};

// cart__item__content
const createCartItemContent = async(name, color) =>{    
    cartItemContent = document.createElement('div');
    articleCartItem.appendChild(cartItemContent);
    cartItemContent.classList.add("cart__item__content");
    
    //cart__item__content__description
    cartItemContentDescription = document.createElement('div');
    cartItemContent.appendChild(cartItemContentDescription);
    cartItemContentDescription.classList.add("cart__item__content__description");
    
    const titleProduct = document.createElement('h2');
    cartItemContentDescription.appendChild(titleProduct);
    titleProduct.textContent = name;
    
    const cartColor = document.createElement('p');
    cartItemContentDescription.appendChild(cartColor);
    cartColor.textContent = color;
};

const createContentPrice = async (price) =>{    
    cartPrice = document.createElement('p');
    cartItemContentDescription.appendChild(cartPrice);
    cartPrice.textContent = price + ' €';
};

//cart__item__content__settings
const createContentsettings = async (quantity, id, color) =>{
    cartItemContentSettings = document.createElement('div');
    cartItemContent.appendChild(cartItemContentSettings);
    cartItemContentSettings.classList.add('cart__item__content__settings');
    
    //cart__item__content__setting__quantity
    settingQuantity = document.createElement('div');
    cartItemContentSettings.appendChild(settingQuantity);
    settingQuantity.classList.add('cart__item__content__settings__quantity')
    
    const money = document.createElement('p');
    settingQuantity.appendChild(money);
    money.textContent = "Qté : ";
    
    inputQuantity = document.createElement('input');
    settingQuantity.appendChild(inputQuantity);
    inputQuantity.classList.add('itemQuantity');
    inputQuantity.setAttribute('type', 'number');
    inputQuantity.setAttribute('name', 'itemQuantity');
    inputQuantity.setAttribute('min', '1');
    inputQuantity.setAttribute('max', '100');
    inputQuantity.setAttribute('value', quantity);
    inputQuantity.setAttribute('data-id', id);
    inputQuantity.setAttribute('data-color', color);
};

//création du bouton supprimer et modification du curser au survol du bouton
const createDelete = (id, color) =>{
    const settingsDelete = document.createElement('div');
    cartItemContentSettings.appendChild(settingsDelete);
    settingsDelete.classList.add("cart__item__settings__delete");
    
    deleteProduct = document.createElement('p');
    settingsDelete.appendChild(deleteProduct);
    deleteProduct.textContent = "Supprimer";
    deleteProduct.setAttribute('data-id', id);
    deleteProduct.setAttribute('data-color', color);
    
    deleteProduct.addEventListener("mousemove", function (e) {
        let modifCurser = e.target;
        modifCurser.style.cursor = 'pointer';
    });
};

//sauvegarde du panier dans le localStorage
const saveLocalStorage = (cart) =>{
    localStorage.setItem('product', JSON.stringify(cart.map(p=>{
        return {quantity : p.quantity,
                id : p.id, 
                color : p.color}
    })));
};

//fonction pour l'ajout d'un même produit dans le panier
const productQuantityModif = () =>{
    //écoute de l'évènement 'change de l'input
    inputQuantity.addEventListener('change', function (e){
        //recherche du produit concerné
        product = newCart.find(p => p.id == e.target.dataset.id && p.color == e.target.dataset.color)
        product.quantity = parseInt(e.target.value) // modification de la quantité
     
        saveLocalStorage(newCart);  // sauvegarde du nouveau tableau dans le localStorage 

        getTotal() // recalcul du total
    });
};
// fonction pour supprimer un produit à partir du panier
const cartDeleteProduct = () =>{
    deleteProduct.addEventListener('click', function(e){ //écoute de l'évènement click sur le bouton supprimer
        //supression de l'article concerné dans le dom
        let deleteModificate = e.target;
        let articleDelete = deleteModificate.closest('article');
        articleDelete.remove();
        // on garde dans le tableau cart les produits qui ne sont pas concernés
        newCart = newCart.filter(p => p.id != e.target.dataset.id || p.color != e.target.dataset.color);
        getTotal() // recalcul du total du panier
        saveLocalStorage(newCart);  // sauvegarde du nouveau tableau dans le localStorage
        alert('votre article a été supprimé du panier')
        
    });  
};
//calcul du nombre de produits dans le panier et du prix total du panier


const getTotal = () =>{
    let totalQuantity = document.getElementById('totalQuantity');
    let spanTotalPrice = document.getElementById('totalPrice');
     let totalPrice = 0
     let number = 0
     for(let product of newCart){ 
        totalPrice += +product.quantity * +product.price
        number += +product.quantity
        
    }
    totalQuantity.textContent = number;                                              
    spanTotalPrice.textContent = totalPrice;
    if(cart.length == 0){
     
     totalQuantity.textContent = "0";
        spanTotalPrice.textContent = "0";
    }; 
};



// initialisation du produit, création des articles dans le dom
const initProduct = async () =>{
    await getLocalStorage();  
   
    for (let product of cart){
       
        let productId = product.id;
        await fetchProduct(productId); 
        newCart.push({...product, price : +productFetch.price})
        product = cart.find(p=> p.id == productFetch._id && p.color == product.color);  
        await createCartItem(product.id, product.color)
        await getImageProduct(productFetch.imageUrl, productFetch.txt)
        await createCartItemContent(productFetch.name, product.color)
        await createContentPrice(productFetch.price)
        await createContentsettings(product.quantity, product.id, product.color, productFetch.price);   
        createDelete(product.id, product.color) 
        productQuantityModif()
        cartDeleteProduct()
    };
   getTotal();
}; 
initProduct();

let firstname
let lastName
let address
let city
let email
const formInputs = document.querySelectorAll('#firstName, #lastName, #address ,#city, #email')

const errorDisplay = (tag, message, valid) =>{
    const errorContainer = document.getElementById(tag + 'ErrorMsg')
    if(!valid){
        errorContainer.textContent = message
    }else{
        errorContainer.textContent = message
    }
}

const firstNameChecker = (value) =>{
    if(!value.match(/^[a-z\séèçêë'-]{2,20}$/i)){
       errorDisplay('firstName', 'Ce champ doit contenir entre 2 et 20 lettres et aucun caractères sépciaux')
        firstName = null
        }else{
            errorDisplay('firstName', '', true)
            firstName = value
    };
};
const lastNameChecker = (value) =>{
    if(!value.match(/^[a-z\séèçêë'-]{2,20}$/i)){
       errorDisplay('lastName', 'Ce champ doit contenir entre 2 et 20 lettres et aucun caractères sépciaux')
        lastName = null
        }else{
            errorDisplay('lastName', '', true)
            lastName = value
    };
};
const cityChecker = (value) =>{
    if(!value.match(/^[a-z\séèçêë'-]{2,20}$/i)){
       errorDisplay('city', 'Ce champ doit contenir entre 2 et 20 lettres et aucun caractères sépciaux')
        city = null
        }else{
            errorDisplay('city', '', true)
            city = value
    };
};
const addressChecker = (value) =>{
    
    if(!value.match(/^[\w\séèçêë'-,]+$/i)){
        errorDisplay('address', 'Ce champ ne doit contenir aucun caractères spéciaux')
        address = null
        }else{
            errorDisplay('address', '', true)
            address = value
    };
};
const emailChecker = (value) =>{
    if(!value.match(/^[\w_-]+@[a-z]+\.[a-z]{2,4}$/i)){
        errorDisplay('email', 'adresse email invalide')
        email = null
        }else{
            errorDisplay('email', '', true)
            email = value
    };
};



formInputs.forEach((input)=>{
    input.addEventListener("input", (e) =>{
        switch (e.target.id) {
            case "firstName":
              firstNameChecker(e.target.value);
              break;
            case "lastName":
              lastNameChecker(e.target.value);
              break;
            case "address":
              addressChecker(e.target.value);
              break;
            case "city":
              cityChecker(e.target.value);
              break;
            case "email":
              emailChecker(e.target.value);
              break;
            default:
                null
            }
        })
});

const getContact = () =>{
    if (firstName && lastName && address && city && email) {
        let contactId ={
            firstName : firstName,
            lastName : lastName,
            address : address,
            city : city,
            email : email
            }
            return contactId
        }else{
            contactId = null
        } 
}

const passCommand = document.querySelector('.cart__order__form')
let orderId
passCommand.addEventListener("submit", (e) => {
    e.preventDefault();
let contact = getContact()  

if(contact){
    let products = newCart.map(p=> p.id)
    const fetchOrder = {
        method: "POST", 
        body : JSON.stringify({contact, products}),
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        }
    }
    fetch ("http://localhost:3000/api/products/order", fetchOrder)
    .then((res) => res.json())
    .then ((data) => {
        alert('commande confirmée')
        orderId = data.orderId;
        localStorage.clear()
        let commandUrl = "./confirmation.html?order=" + orderId;
        document.location.href = commandUrl;
    })
    .catch (err => alert("erreur de récupération des données", err)) 
    } else{
        alert('veulliez remplir les champs')
    }  
});


