

productList = [];
// récupération des données de l'API
const fetchList = async () =>{
    await fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((data) => {
            productList = data; 
        })
        .catch (err => console.log("erreur de récupération des données de l'API", err));
};
            

// création d'un indice pour chaque objet du tableau
// création du lien vers la page produit
let linkProduct;
const createLink = () =>{
    linkProduct = document.createElement('a');
    let items = document.getElementById('items').appendChild(linkProduct);
    let productUrl = "./product.html?id=" + productList[i]._id;
    linkProduct.setAttribute("href", productUrl);
};
let product
// création de la balise article pour la card product
const createArticle = () =>{
    product = document.createElement('article');
    linkProduct.appendChild(product);            
}  ;              

//récupération des données pour l'image de la card
const createImage = () =>{
    let imageProduct = document.createElement('img');
    product.appendChild(imageProduct).setAttribute("src", productList[i].imageUrl);
    product.appendChild(imageProduct).setAttribute("alt", productList[i].altTxt);    
};

//récupération des données pour le titre de la card
const createTitle = () =>{
    let textProduct = document.createElement('h3');
    product.appendChild(textProduct).classList.add('productName'); 
    textProduct.textContent = productList[i].name;
};

//récupération des données pour la description de la card
const createDescription = () =>{
    let descriptionProduct = document.createElement ('p'); 
    product.appendChild(descriptionProduct).classList.add('productDescription');
    descriptionProduct.textContent = productList[i].description; 
}; 
let i = 0
const initPage = async () =>{
    await fetchList();
        for(i = 0; i < productList.length; i++){  
        createLink();
        createArticle();
        createImage();
        createTitle();
        createDescription();
        };
    };
initPage();  


