

const afficherItemspanier = async () => {

  const datas = await get(`http://localhost:3000/api/products/`);
  if (datas === -1) {
    const RedirectionJs = document.location.href = "./index.html";
    alert("erreur"), RedirectionJs;

  }


  const articlePanier = document.getElementById('cart__items');
  const cart = JSON.parse(localStorage.getItem('cart'))||[];
  
  let  total = 0 ;
 
  let cardsPanier = '';


  cart.forEach((item) => {
    let article = cart.find( id => id == item.id && id.color == item.color);
    if (article) { 
      total.quantity += item.quantity;
     
    }else {

    cardsPanier +=
      `  <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${item.itemsDetails.image}" alt="${item.itemsDetails.imageAlt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.itemsDetails.name}</h2>
            <p>${item.color}</p>
            
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> `
          ;
     }   
     console.log(`${total}`);
  });

 
  articlePanier.innerHTML = cardsPanier;
};


afficherItemspanier();




// utiliser dataset pour obtenir l'id 
// let productId = document.getElementsByClassName('cart__item');
//   productId.dataset.color; 
  // console.log(productId);




     //   let article = cart.find( a => a.id === item.id && a.color === item.color);
    //  if (article) {
    //   totalQuantity += item.quantity;
    //  } else {
    // cardPanier += `etc`
// }



// let ProduitDansLepanier= cart[0].id;
// let totalQuantity = 0 


// if (item.id === ProduitDansLepanier){
//   totalQuantity += item.quantity ; 
// }else {  
//   totalQuantity = item.quantity;
//   ProduitDansLepanier = item.id;
// }
