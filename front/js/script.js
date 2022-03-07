
fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => {
        let productList = data
        console.log(data);
        for(let i = 0; i < productList.length; i++){
            let linkProduct = document.createElement('a');
            let product = document.createElement('article');
            let imageProduct = document.createElement('img');
            let textProduct = document.createElement('h3');
            let descriptionProduct = document.createElement ('p');
            let items = document.getElementById('items').appendChild(linkProduct);
            linkProduct.appendChild(product);
            product.appendChild(imageProduct).setAttribute("src", productList[i].imageUrl, "alt", productList[i].altTxt);    
            product.appendChild(textProduct).classList.add('productName');    
            product.appendChild(descriptionProduct).classList.add('productDescription');
            textProduct.textContent = productList[i].name;
            descriptionProduct.textContent = productList[i].description;
            let productUrl = "./product.html?id=" + productList[i]._id;
            linkProduct.setAttribute("href", productUrl);
        };
    });        

