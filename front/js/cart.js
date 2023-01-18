

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

  const panier = loadPanier();
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
  // console.log(cardsPanier);
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
      if (limiteQuantity(inputQuantity.value)) {

      } else {
        console.log("ok");
        inputQuantity.value = 100;
        updateQuantity(id, color, inputQuantity.value);
      }
      calculTotalQuantities();
      updateQuantity(id, color, quantity);
      calculTotalPrix();

    });

  });


  // calcul de la quantité  
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



  const calculTotalPrix = () => {
    let totalPrice = 0;
    const panier = loadPanier();
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
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  // -------------nom
  let lastNameInput = document.getElementById('lastName');
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  // ----------------address
  const addressInput = document.getElementById('address');
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  //  ------------------city
  const cityInput = document.getElementById('city');
  const cityErrorMsg = document.getElementById('cityErrorMsg');
  //  -------------------email
  const emailInput = document.getElementById('email');
  const emailErrorMsg = document.getElementById('emailErrorMsg')

  // ---------------------------------------------------------regle regex --------------------------------
  const firstNameRegex = /^[\w\u00C0-\u017F-]{3,30}$/;
  const lastNameRegex = /^[\w\u00C0-\u017F-]{3,30}$/;
  const addressRegex = /^(?:(?:Domaine\sde|lieu-dit)\s)?[\w\u00C0-\u017F-]{2,20}(\s[\w\u00C0-\u017F-]{0,20})(?:-[\w\u00C0-\u017F-]{0,20}(\s[\w\u00C0-\u017F-]{0,20}))*$|^\d{1,2}\s[\w\u00C0-\u017F-]{0,20}(\s[\w\u00C0-\u017F-]{0,20})(?:-[\w\u00C0-\u017F-]{0,20}(\s[\w\u00C0-\u017F-]{0,20}))*$/;
  const cityRegex = /^[\w\u00C0-\u017F-]{3,30}/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


  const champsValid = (erreurMesg, inputValid) => {
    inputValid.style.backgroundColor = '#B6FEB6'
    erreurMesg.style.display = "none";
    
    return true;
  };

  const erreur = (erreurMesg, inputNotValid) => {
    erreurMesg.style.display = "block";
    erreurMesg.style.color = '#FFFFFF';
    erreurMesg.innerHTML = "le champs n'est pas valide ";
    inputNotValid.style.backgroundColor = '#FD6D6D';
    return true;
  };
  const formulaire = () => {


    // verification du prenom revoie une erreur si le prenon n'est pas valide 
    firstNameInput.addEventListener("input", () => {

      if (firstNameRegex.test(firstNameInput.value)) {
        champsValid(firstNameErrorMsg, firstNameInput);
      } else {
        erreur(firstNameErrorMsg, firstNameInput);
      };
    });

    // ---------------------------------------------verification du nom
    lastNameInput.addEventListener("input", () => {

      if (lastNameRegex.test(lastNameInput.value)) {
        champsValid(lastNameErrorMsg, lastNameInput);
      } else {
        erreur(lastNameErrorMsg, lastNameInput);
      };
    });
    // ---------------------------------------------verification address
    addressInput.addEventListener("input", () => {
      if (addressRegex.test(addressInput.value)) {
        champsValid(addressErrorMsg, addressInput);

      } else {
        erreur(addressErrorMsg, addressInput);
      };
    });


    cityInput.addEventListener("input", () => {
      if (cityRegex.test(cityInput.value)) {
        champsValid(cityErrorMsg, cityInput);

      } else {
        erreur(cityErrorMsg, cityInput);
      };
    });



    emailInput.addEventListener("input", () => {
      if (emailRegex.test(emailInput.value)) {
        champsValid(emailErrorMsg, emailInput);

      } else {
        erreur(emailErrorMsg, emailInput);
      };

    });
 
};
formulaire();


};
afficherItemspanier();
























































// firstNameInput.addEventListener("input", () => {

//   if (firstNameRegex.test(firstNameInput.value)) {
//     // cacher le message d'erreur
//     firstNameInput.style.backgroundColor = '#FFFFFF'
//     firstNameErrorMsg.style.display = "none";
//   } else {
//     // Afficher le message d'erreur
//     firstNameInput.style.backgroundColor = '#FD6D6D'
//     firstNameErrorMsg.style.display = "block";
//     firstNameErrorMsg.innerHTML = "Veuillez entrer un prénom valide";
//   }
// });


// // ---------------------------------------------verification du nom
// lastNameInput.addEventListener("input", () => {

//   if (lastNameRegex.test(lastNameInput.value)) {
//     lastNameInput.style.backgroundColor = '#FFFFFF'
//     lastNameErrorMsg.style.display = "none";

//   } else {

//     lastNameInput.style.backgroundColor = '#FD6D6D';
//     lastNameErrorMsg.style.display = "block";
//     lastNameErrorMsg.style.color = '#FFFFFF'
//     lastNameErrorMsg.innerHTML = "Veuillez entrer un nom valide";

//   }

// });