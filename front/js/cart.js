

const afficherItemspanier = async () => {

  const datas = await get(`http://localhost:3000/api/products/`);
  if (datas === -1) {
    const RedirectionJs = document.location.href = "./index.html";
    alert("erreur"), RedirectionJs;

  }


  const articlePanier = document.getElementById('cart__items');
  const cart = JSON.parse(localStorage.getItem("cart"))|| [];

console.log(cart);
  let cardsPanier = '';

  cart.forEach((item) => {
    let articlePanier = cart.find( a => a.dataId === item.dataId && a.color === item.color);
    if (articlePanier) {
      articlePanier.quantity += item.quantity;

    } else {

    cardsPanier +=
      `  <article class="cart__item" data-id="${a.dataId}" data-color="${item.color}">
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
       
       }
  });
 
  articlePanier.innerHTML = cardsPanier;
};


afficherItemspanier();