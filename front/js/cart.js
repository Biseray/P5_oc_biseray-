
const afficherItemspanier = async () => {
  
  const datas = await get(`http://localhost:3000/api/products/`);
  if (datas === -1) {
    const RedirectionJs = document.location.href = "./index.html";
    alert("erreur"), RedirectionJs;

  }
  window.parent.document.title = 'Panier';


  //   let cart = [];
  // const keyLength = localStorage.length;

  // for (let i = 0; i < keyLength; i++) {
  //   const key = localStorage.getItem(localStorage.key(i)); 
  //   const data = JSON.parse(key);
  //  cart.push(data);
   
  // };






  const articlePanier = document.getElementById('cart__items');
 
  

  
  // let  total = { quantity : 0 }; 
  let cardsPanier = '';


  loadPanier().forEach((item) => {
    
    // let article = cart.find( article  => article.id === item.id && article.color === item.color);
    //  if(article = total.quantity  += item.quantity );
  
    cardsPanier +=
      `  <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${item.image}" alt="${item.imageAlt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
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
      </article> `;
          
     
     
  });

 
  articlePanier.innerHTML = cardsPanier;
};


afficherItemspanier();


   //  let article = cart.find( item.id === id   && item.color === cart.color);
    //  if (article) { 
    //    article.quantity += item.quantity;
     
    //  }else {






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


// utiliser dataset pour obtenir l'id 
// let productId = document.getElementsByClassName('cart__item');
//   productId.dataset.color; 
  // console.log(productId);



  // local storage : fail 


  // const storage = () => {
  //   const cart = JSON.parse(localStorage.getItem("cart"))||[];
  //     const cartItem = {  
  //     id: `${cart.id}`,
  //     image: `${cart.image}`,
  //   };
  //   cartItem.push(cart);
  
  
  // console.log(storage);
  // };