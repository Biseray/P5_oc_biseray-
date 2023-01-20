

const showDetailItem = async () => {
  // recuperation de l id  pour pouvoir afficher les details du produit pas la suite 
  const dataId = new URL(location.href).searchParams.get("id");


// appel de lapi pour recuperer les information de l id 
  const datas = await get(`http://localhost:3000/api/products/${dataId}`);
  if (datas === -1) {
    const RedirectionJs = document.location.href = "./index.html";
    alert("erreur produit introuvable"), RedirectionJs;
  }
  
// affichage du nom du produit dans l'entete de la page 
   window.parent.document.title = `${datas.name}`;
// localisation des informations dans la page produit
  const pictureProduct = document.querySelector('article .item__img');
  const nameProduct = document.getElementById('title');
  const price = document.getElementById('price');
  const description = document.getElementById('description');
  const itemsColors = document.querySelector('#colors');


// affichage des informations dans la page produit en recuperent les informatons de l'api
  pictureProduct.innerHTML = `<img src="${datas.imageUrl}" alt="${datas.altTxt}">`;
  nameProduct.innerHTML = `${datas.name}`;
  price.innerHTML = `${datas.price}`;
  description.innerHTML = `${datas.description}`;




  let selectColor = '';
// creation du menu de selection en utilisant une boucle pour toute les couleurs possible
  datas.colors.forEach((color) => {
    selectColor += `<option value="${color}">${color}</option>`;

  });
// placement des couleurs dans le menu 
  itemsColors.insertAdjacentHTML('beforeend', selectColor);




  const ajoutPanier = document.getElementById('addToCart');
// ecoute du bouton ajout panier 
  ajoutPanier.addEventListener('click', function () {
    const quantityItems = document.getElementById('quantity').value;
    const colorsItems = document.getElementById('colors').value; 
      if (colorsItems) {
        // appelle de la fonction qui ajouter les produit dans le local storage 
        addProduct(quantityItems, colorsItems, datas );
        // window.location.href = './cart.html';
      } else {
        alert('choisissez une couleur');
      };
    
  });
};

showDetailItem();
