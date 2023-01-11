


const afficherItemspanier = async () => {

  const datas = await get(`http://localhost:3000/api/products/`);
  if (datas === -1) {
    const RedirectionJs = document.location.href = "./index.html";
    alert("erreur"), RedirectionJs;

 }
  window.parent.document.title = 'Panier';
  console.log(datas);



  const articlePanier = document.getElementById('cart__items');

  panierVide();

  let cardsPanier = '';

  const panier = loadPanier();
  panier.forEach((item) => {
    let details = datas.find((i) => item.id === i._id ) 
    cardsPanier +=
      `  <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${item.image}" alt="${item.imageAlt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.color}</p>
            <p> ${details.price}€</p>
            
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number"  class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> `;


  });
  console.log(cardsPanier);
  articlePanier.innerHTML = cardsPanier;

  // bouton suppression element
  const deleteItemButtons = document.querySelectorAll('.deleteItem');
const inputQuantities = document.querySelectorAll('.itemQuantity');



  for (let a = 0; a < deleteItemButtons.length; a++) {
    deleteItemButtons[a].addEventListener('click', function () {
      const elementToDelete = this.closest(".cart__item");
      const id = elementToDelete.getAttribute('data-id');
      elementToDelete.remove();
      supprimerProduit(id);
      calculTotalQuantities();
      calculTotalPrix();
      panierVide();

    });

  };




  // modfication de la quantité dans le panier 
  
  inputQuantities.forEach((inputQuantity) => {
    inputQuantity.addEventListener('change', () => {
      let quantity = inputQuantity.value;
      let id = inputQuantity.parentElement.parentElement.parentElement.parentElement.dataset.id;
      let color = inputQuantity.parentElement.parentElement.parentElement.parentElement.dataset.color;
      limiteQuantity(quantity);
      calculTotalQuantities();
      calculTotalPrix();
      updateQuantity(id, color, quantity);


    });
  });

 
  // calcul de la quantité  
  const calculTotalQuantities = () => {
    const inputQuantities = document.querySelectorAll('.itemQuantity');
    const totalQuantity = document.getElementById('totalQuantity');
    let sum = 0;
    if (inputQuantities.length === 0) {
      totalQuantity.innerHTML = 0; }
    inputQuantities.forEach((inputQuantity) => {
      let quantity = parseInt(inputQuantity.value);
      let total = sum += quantity;
      totalQuantity.innerHTML = total;

    });

  };

const totalPrice = document.getElementById('totalPrice');

// calucul prix total 
const calculTotalPrix = () => {
let = toto = 0;
panier.forEach((item) => {
let id =  item.id ;
 quantity = item.quantity;
let details = datas.find((i) => id === i._id ) 
 toto += quantity * details.price;
console.log(toto);

});
totalPrice.innerHTML = toto ;
};

calculTotalQuantities();
calculTotalPrix();
};
afficherItemspanier();
