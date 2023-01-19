
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



  // modfication de la quantité dans le panier 


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
  const firstNameRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
  const lastNameRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
  const addressRegex = /^[a-zA-Z0-9\u00C0-\u017F-\s]{5,30}$/;
  const cityRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;



  let isFormValid = true;
  // fonction qui verifie que le champs n'est pas vide si cest le cas il renvoie une erreur
  const notEmpty = (value) => {
    if (value.trim().length === 0) {
      isFormValid = false;
    };
    return  true;

  };
  //fonction qui est appeller si le regex est  valide 
  const champsValid = (erreurMesg, inputValid) => {
    inputValid.style.backgroundColor = '#B6FEB6'
    erreurMesg.style.display = "none";


  };
  // fonction qui est appeller si le regex n'est pas valide  
  const erreur = (erreurMesg, inputNotValid) => {
    erreurMesg.style.display = "block";
    erreurMesg.style.color = '#FFFFFF';
    erreurMesg.innerHTML = "le champs n'est pas valide ";
    inputNotValid.style.backgroundColor = '#FD6D6D';
    isFormValid = false;
  };




  const formulaire = () => {
    // verification du prenom revoie une erreur si le prenon n'est pas valide 
    firstNameInput.addEventListener("input", () => {

      if (notEmpty(firstNameInput.value) && firstNameRegex.test(firstNameInput.value)) {
        champsValid(firstNameErrorMsg, firstNameInput);

      } else {
        erreur(firstNameErrorMsg, firstNameInput);
      };
      console.log(firstNameRegex.test(firstNameInput.value))
    });

    // ---------------------------------------------verification du nom
    lastNameInput.addEventListener("input", () => {

      if (notEmpty(lastNameInput.value) && lastNameRegex.test(lastNameInput.value)) {
        champsValid(lastNameErrorMsg, lastNameInput);


      } else {
        erreur(lastNameErrorMsg, lastNameInput);

      };

    });
    // ---------------------------------------------verification address
    addressInput.addEventListener("input", () => {
      if (notEmpty(lastNameInput.value) && addressRegex.test(addressInput.value)) {
        champsValid(addressErrorMsg, addressInput);


      } else {
        erreur(addressErrorMsg, addressInput);
      };
    });


    cityInput.addEventListener("input", () => {
      if (notEmpty(lastNameInput.value) && cityRegex.test(cityInput.value)) {
        champsValid(cityErrorMsg, cityInput);

      } else {
        erreur(cityErrorMsg, cityInput);
      };
    });


    emailInput.addEventListener("input", () => {
      if (notEmpty(emailInput.value) && emailRegex.test(emailInput.value)) {
        champsValid(emailErrorMsg, emailInput);

      } else {
        erreur(emailErrorMsg, emailInput);
      };

    });


    const message = document.querySelectorAll(".cart__order__form p");
    message.innerHTML = "ecris";
    console.log(message)

    const buttonOrder = document.getElementById('order');
    buttonOrder.addEventListener("click", function (e) {

      const inputs = document.querySelectorAll(".cart__order__form input");
      //  inputs.forEach((input) => {
      //   if (!input.value) {
      //     isFormValid = false;
      // } 
      //  });
      if (!firstNameInput.value || !lastNameInput.value || !emailInput.value || !cityInput.value || !addressInput.value)
{
  isFormValid = false;
}
        if (isFormValid === true) {
          alert('ok');
        } else {
          alert('error');
          e.preventDefault();
          inputs.forEach((input) => {
            if (!input.value) {
              console.log(input.value);
              input.style.backgroundColor = '#FD6D6D';
            }
          });
         
        }

    });

  };
  formulaire();
};







afficherItemspanier();
























































