
const afficherItemspanier = async () => {

  const datas = await get(`http://localhost:3000/api/products/`);
  if (datas === -1) {
    const RedirectionJs = document.location.href = "./index.html";
    alert("erreur"), RedirectionJs;

  }



  window.parent.document.title = 'Panier';
  console.log(datas);
  panierVide();


  const articlePanier = document.getElementById('cart__items');



  let cardsPanier = '';
  //  creation de la produit dans le panier 
  let panier = loadPanier();
  panier.forEach((item) => {
    let details = datas.find((i) => item.id === i._id)
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

  articlePanier.innerHTML = cardsPanier;

  // bouton suppression element
  const deleteItemButtons = document.querySelectorAll('.deleteItem');
  const inputQuantities = document.querySelectorAll('.itemQuantity');



  for (let a = 0; a < deleteItemButtons.length; a++) {
    deleteItemButtons[a].addEventListener('click', function () {
      const elementToDelete = this.closest(".cart__item");
      const id = elementToDelete.getAttribute('data-id');
      const color = elementToDelete.getAttribute('data-color');
      elementToDelete.remove();
      supprimerProduit(id, color);
      calculTotalQuantities();
      calculTotalPrix();
      panierVide();
    });

  };



  // modfication de la quantité dans le panier en prenant compte de l id et de la couleur du produit séléctionner 


  inputQuantities.forEach((inputQuantity) => {
    inputQuantity.addEventListener('change', () => {
      let quantity = parseInt(inputQuantity.value);
      let id = inputQuantity.parentElement.parentElement.parentElement.parentElement.dataset.id;
      let color = inputQuantity.parentElement.parentElement.parentElement.parentElement.dataset.color;
      console.log(color);
      if (limiteQuantity(inputQuantity.value)) {
        calculTotalQuantities();
        updateQuantity(id, color, quantity);
        calculTotalPrix();

      } else {
        inputQuantity.value = parseInt(100);
        updateQuantity(id, color, inputQuantity.value);
        calculTotalQuantities();

        calculTotalPrix();
      };

      updateQuantity(id, color, quantity);
    });

  });


  // calcul de la quantité  total dans le panier
  const calculTotalQuantities = () => {
    const inputQuantities = document.querySelectorAll('.itemQuantity');
    const totalQuantity = document.getElementById('totalQuantity');
    let sum = 0;
    if (inputQuantities.length === 0) {
      totalQuantity.innerHTML = 0;
    };
    inputQuantities.forEach((inputQuantity) => {
      let quantity = parseInt(inputQuantity.value);
      let total = sum += quantity;
      totalQuantity.innerHTML = total;


    });

  };


  // calcul du prix total en prenant compte du nombre et du prix de chaque article
  const calculTotalPrix = () => {
    let totalPrice = 0;
    let panier = loadPanier();
    panier.forEach((item) => {
      let details = datas.find((i) => item.id === i._id)
      totalPrice += details.price * item.quantity;
    });
    document.getElementById('totalPrice').innerHTML = totalPrice;
  };

  calculTotalQuantities();
  calculTotalPrix();



  // -------------------------------------------------------formulaire---------------------------------------------
  // --------------- prenom 
  const firstNameInput = document.getElementById('firstName');

  // -------------nom
  let lastNameInput = document.getElementById('lastName');

  // ----------------address
  const addressInput = document.getElementById('address');

  //  ------------------city
  const cityInput = document.getElementById('city');

  //  -------------------email
  const emailInput = document.getElementById('email');




  // let isFormValid = true;
  // fonction qui verifie que le champs n'est pas vide si cest le cas il renvoie une erreur
  




  const formulaire = () => {
    // verification du prenom revoie une erreur si le prenon n'est pas valide 
    firstNameInput.addEventListener("input", () => {
      checkFirstName(firstNameInput);
    });

    // ---------------------------------------------verification du nom
    lastNameInput.addEventListener("input", () => {

      checkLastName(lastNameInput);
      

    });
    // ---------------------------------------------verification address
    addressInput.addEventListener("input", () => {
      checkAddress(addressInput);
    });


    cityInput.addEventListener("input", () => {
      
      checkCity(cityInput);
    });


    emailInput.addEventListener("input", () => {
      checkEmail(emailInput);
    });



    // localisation des inputs ainsi que des messages erreurs 
    // const inputs = document.querySelectorAll(".cart__order__form input");
    // const messageErreur = document.querySelectorAll(".cart__order__form__question p ");


    // ecoute du bouton order 
    const buttonOrder = document.getElementById('order');
    // verrifie que tout les valeurs renvoie true
    buttonOrder.addEventListener("click", async function (event) {
      event.preventDefault();

      if (checkFirstName(firstNameInput) &&  checkLastName(lastNameInput) && checkAddress(addressInput) && checkEmail(emailInput) && checkCity(cityInput) ) {  
        // si valide ajout des informations puis envoie au serveur 

        alert('ok');

        let product = [];
        let panier = loadPanier();
        panier.forEach((produit) => {
          if (produit.id) {
            product.push(produit.id);
          }
        });

        const orderData = {
          contact: {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            address: addressInput.value,
            city: cityInput.value,
            email: emailInput.value,
          },
          products: product,
        };
       clearPanier();

        const postOrder = await post(`http://localhost:3000/api/products/order`, orderData);
        
        if (postOrder === -1) {
          alert('erreur lors de l\'envoie ');

        } else {
          console.log(postOrder);
          window.location.href = `./confirmation.html?orderid=${postOrder.orderId}`;
        }


      }
    });

  }


  formulaire();
};
afficherItemspanier();
























































