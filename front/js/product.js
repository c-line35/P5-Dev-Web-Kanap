//Récupération de l'id dans l'url
let urlPage = window.location.href ;
let url = new URL(urlPage);
let idProduct = url.searchParams.get("id");

// récupération des données de l'api uniquement pour le produit avec l'id de la page
let product = [];
const fetchProduct = async() =>{
   await fetch(`http://localhost:3000/api/products/${idProduct}`)
   .then((res) => res.json())
   .then((data) =>{ 
      product = data})
   .catch (err => console.log("erreur de récupération des données de l'API", err));
};     

//récupération des données pour l'image
let imageProduct;
const getImage = () =>{
   
   imageProduct = document.createElement('img');
   const imageContent = document.querySelector('.item__img').appendChild(imageProduct);
   imageProduct.setAttribute("src", product.imageUrl);
   imageProduct.setAttribute("alt", product.altTxt);
};

//ajout du nom du produit au title de la page
//récupérartion des données pour le nom, la description et le prix du produit
let pageTitle;
const getPageTitle = () =>{
   pageTitle = document.querySelector('title').textContent = product.name;
   let titleProduct = document.getElementById('title').textContent = product.name;
   let priceProduct = document.getElementById('price').textContent = product.price;
   let descriptionProduct = document.getElementById('description').textContent = product.description;
};

//recupération du tableau colors
let colorSelect = document.getElementById('colors');
let colorProduct;
let colorOption;
const getColor = () =>{
   let colorList = product.colors;
   //création d'un indice pour chaque choix du tableau colors
   for(i = 0; i < colorList.length; i++){
      colorProduct = colorList[i];
      colorOption = document.createElement('option');
      colorSelect.appendChild(colorOption);
      colorOption.textContent = colorProduct;
      colorOption.setAttribute('value', colorProduct);   
   };
};

const initPage = async() =>{
   await fetchProduct();
   getImage();
   getPageTitle();
   getColor();
};
initPage();

let quantityProduct = 0;
let inputQuantity;
const getQuantityProduct = () =>{
   inputQuantity = document.getElementById('quantity');
   quantityProduct = inputQuantity.value;
 
 };


let colorChecked = '';
const getColorProduct = () =>{
   colorSelect.addEventListener('input', function(e){
   colorChecked = e.target.value; 

      
    });
};
getColorProduct();

let newProduct;
const getSettingsProduct = () =>{
   getQuantityProduct();
   newProduct = {
      id : idProduct,
      color : colorChecked,
      quantity : quantityProduct
   };
};

const saveLocalStorage = (cart) =>{
   localStorage.setItem('product', JSON.stringify(cart));
}
const getLocalStorage = () =>{
    let cart = localStorage.getItem('product');
    if(cart == null){
       return[];
    }else{
       return JSON.parse(cart);
    }
};

const addProduct = (newProduct) =>{ 
  let cart = getLocalStorage();
  let foundProduct = cart.find(p=> p.id == newProduct.id && p.color == newProduct.color);
  if(foundProduct != undefined){
     let numberfoundProduct = parseInt(foundProduct.quantity); 
     let numberNewProduct = parseInt(newProduct.quantity); 
     foundProduct.quantity = numberNewProduct += numberfoundProduct;
  }else{
     cart.push(newProduct);
  }
  saveLocalStorage(cart);
  console.log(cart);
};


let clickButton = document.getElementById('addToCart');
clickButton.addEventListener('click', function(){
   getSettingsProduct(); 
   if(quantityProduct < 1){
      alert('Veuillez choisir une quantité')
      }else if(quantityProduct >= 100){
         alert('Quantité insuffisante en stock')
         }else if(colorChecked == ''){
            alert('veuillez choisir la couleur') 
            }else{
               addProduct(newProduct); 
               document.location.href = "../html/cart.html" ;   
            };
});
              
           