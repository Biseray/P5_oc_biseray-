

const afficherItemspanier = async () => {

  const datas = await get(`http://localhost:3000/api/products/`);
  if (datas === -1) {
    const RedirectionJs = document.location.href = "./index.html";
    alert("erreur"), RedirectionJs;

  }
  window.parent.document.title = 'Panier';
  console.log(datas);



  const articlePanier = document.getElementById('cart__items');


  if (loadPanier().length === 0) {
    alert('panier vide ! ');
    window.location.href = './index.html';
  }


  let cardsPanier = '';


  loadPanier().forEach((item) => {

    cardsPanier +=
      `  <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${item.image}" alt="${item.imageAlt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.color}</p>
            <p id="price">  </p>
            
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


  articlePanier.innerHTML = cardsPanier;

  // bouton suppression element
  const deleteItemButtons = document.querySelectorAll('.deleteItem');
  for (let a = 0; a < deleteItemButtons.length; a++) {
    deleteItemButtons[a].addEventListener('click', function () {
      const elementToDelete = this.closest(".cart__item");
      const id = elementToDelete.getAttribute('data-id');
      elementToDelete.remove();
      SupprimerProduit(id);
      realodPage();

      
    });
    
  };





  // modfication de la quantité dans le panier 
  const inputQuantities = document.querySelectorAll('.itemQuantity');
  inputQuantities.forEach((inputQuantity) => {
    inputQuantity.addEventListener('change', () => {

      let quantity = inputQuantity.value;
      let id = inputQuantity.parentElement.parentElement.parentElement.parentElement.dataset.id;
      let color = inputQuantity.parentElement.parentElement.parentElement.parentElement.dataset.color;
      calculTotalQuantities();
      updateQuantity(id, color, quantity);


    });
  });


  // calcul de la quantité  
  const calculTotalQuantities = () => {
    const inputQuantities = document.querySelectorAll('.itemQuantity');
    let sum = 0;
    inputQuantities.forEach((inputQuantity) => {
      let quantity = parseInt(inputQuantity.value);
      let total = sum += quantity;
      const totalQuantity = document.getElementById('totalQuantity');
      totalQuantity.innerHTML = total;
    });
  };
  calculTotalQuantities();



  const prix = document.getElementById('price');
  console.log(prix);
  const verificationPrix = () => {
    let panier = loadPanier();
    datas.forEach((i) => {
      let id = i._id;
      let price = i.price;
      let articleId = panier.find(a => a.id === id);
      if (articleId) {
      prix.innerHTML = price + "€";
      };
    });
  };
  verificationPrix();




};

afficherItemspanier();



  // const calculTotalPrice = () => {
  //   const inputQuantities = document.querySelectorAll('.cart__item__content__description');
  //   let sum = 0;

  //   inputQuantities.forEach((inputQuantity) => {

  //     let quantity = parseInt(inputQuantity.value);
  //     let total = sum += quantity;
  //     const totalQuantity = document.getElementById('totalQuantity');
  //     totalQuantity.innerHTML = total;
  //   });

  // };
  // calculTotalPrice();




  // const calculTotal = () => {
  //   let panier = loadPanier();

  //   let sum = 0;
  //   panier.forEach((i) => {
  //     let quantity = parseInt(i.quantity);
  //     let total = sum += quantity;


  //     const totalQuantity = document.getElementById('totalQuantity');
  //     totalQuantity.innerHTML = total;

  //   });


  // };
  // calculTotal();