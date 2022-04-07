let cart = [];
let product;
let productFetch;

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
// initialisation du porduit: avec toutes les données récupérées du local storage et de l'API, on créer un seul produit
const initProduct = async () =>{
    await getLocalStorage();  
    for (let i = 0; i < cart.length; i++){
        let productId = cart[i].id;
        await fetchProduct(productId);
        product = cart.find(p=> p.id == productFetch._id && p.color == cart[i].color);  
        product['price'] = productFetch.price;
        product['image'] = productFetch.imageUrl;
        product['name'] = productFetch.name;
        product['txt'] = productFetch.altTxt;
    };
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
    localStorage.setItem('product', JSON.stringify(cart));
};

//fonction pour l'ajout d'un même produit dans le panier
const productQuantityModif = () =>{
   
    //écoute de l'évènement 'change de l'input
    inputQuantity.addEventListener('change', function (e){ 
        initProduct() //récupération des données du porduit au change

        //recherche du produit concerné
        product = cart.find(p => p.id == e.target.dataset.id && p.color == e.target.dataset.color)
        product.quantity = parseInt(e.target.value) // modification de la quantité

        getTotal() // recalcul du total

        saveLocalStorage(cart);  // sauvegarde du nouveau tableau dans le localStorage 
    });
};
// fonction pour supprimer un produit à partir du panier
const cartDeleteProduct = () =>{
   deleteProduct.addEventListener('click', function(e){ //écoute de l'évènement click sur le bouton supprimer
        initProduct() //récupération des données du produit au click
       
        //supression de l'article concerné dans le dom
        let deleteModificate = e.target;
        let articleDelete = deleteModificate.closest('article');
        articleDelete.remove();
        
        // on garde dans le tableau cart les produits qui ne sont pas concernés
        cart = cart.filter(p => p.id != e.target.dataset.id || p.color != e.target.dataset.color);
        
        getTotal() // recalcul du total du panier
       
        saveLocalStorage(cart);  // sauvegarde du nouveau tableau dans le localStorage
        alert('votre article a été supprimé du panier')
       
    });  
};
//calcul du nombre de produits dans le panier et du prix total du panier
const getTotal = () =>{
    //ciblage des zones du dom concernées et déclaation des variables pour faire les calculs
    totalQuantity = document.getElementById('totalQuantity');
    let number = 0;
    let spanTotalPrice = document.getElementById('totalPrice');
    let totalPrice = 0;  

    for(let product of cart){ // calcul des totaux
        let productQuantityNumber = parseInt(product.quantity);
        totalQuantity.textContent = number += productQuantityNumber;                                                
        spanTotalPrice.textContent = totalPrice += parseInt(product.price) * productQuantityNumber;
    };
    if(cart.length == 0){
        totalQuantity.textContent = "0";
        spanTotalPrice.textContent = "0";
        alert('Votre panier est vide');
    };
};

// appel de toutes les fonctions pour créer la page cart
const initCart = async () =>{
    await initProduct()
    for(let product of cart){ 
        await createCartItem(product.id, product.color)
        await getImageProduct(product.image, product.txt)
        await createCartItemContent(product.name, product.color)
        await createContentPrice(product.price)
        await createContentsettings(product.quantity, product.id, product.color, product.price)
        createDelete(product.id, product.color) 
        productQuantityModif()
        cartDeleteProduct()  
    }; 
    getTotal(); 
};
initCart()
        
