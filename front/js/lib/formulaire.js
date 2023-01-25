//fonction qui est appeller si le regex est  valide 
const champsValid = (erreurMesg, inputValid) => {
    inputValid.style.backgroundColor = '#B6FEB6'
    erreurMesg.style.display = "none";
    // isFormValid = true;

};
// fonction qui est appeller si le regex n'est pas valide  
const erreur = (erreurMesg, inputNotValid) => {
    erreurMesg.style.display = "block";
    erreurMesg.style.color = '#FFFFFF';
    erreurMesg.innerHTML = "le champs n'est pas valide ";
    inputNotValid.style.backgroundColor = '#FD6D6D';
    // isFormValid = false;
};
// fonction qui verifie que le champs n'est pas vide si cest le cas il renvoie une erreur
const notEmpty = (value) => {
    if (value.trim().length === 0) {
        return false;
    };
    return true;

};


const checkFirstName = (firstNameInput) => {
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    const firstNameRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
    if (notEmpty(firstNameInput.value) && firstNameRegex.test(firstNameInput.value)) {
        champsValid(firstNameErrorMsg, firstNameInput);
        return true;
    } else {
        erreur(firstNameErrorMsg, firstNameInput);
        return false;
    };
}





const checkLastName = (lastNameInput) => {
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    const lastNameRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
    if (notEmpty(lastNameInput.value) && lastNameRegex.test(lastNameInput.value)) {
        champsValid(lastNameErrorMsg, lastNameInput);
        return true;
    } else {
        erreur(lastNameErrorMsg, lastNameInput);
        return false;
    };
}



const checkAddress = (adressInput) => {
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    const addressRegex = /^[a-zA-Z0-9\u00C0-\u017F-\s]{5,30}$/;
    if (notEmpty(adressInput.value) && addressRegex.test(adressInput.value)) {
        champsValid(addressErrorMsg, adressInput);
        return true;
    } else {
        erreur(addressErrorMsg, adressInput);
        return false;
    };
}

// ---------fonction qui vérifie que la valeur du 
const checkCity = (cityInput) => {
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    const cityRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
    if (notEmpty(cityInput.value) && cityRegex.test(cityInput.value)) {
        champsValid(cityErrorMsg, cityInput);
        return true;
    } else {
        erreur(cityErrorMsg, cityInput);
        return false;
    };
}


const checkEmail = (emailInput) => {
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (notEmpty(emailInput.value) && emailRegex.test(emailInput.value)) {
        champsValid(emailErrorMsg, emailInput);
        return true;
    } else {
        erreur(emailErrorMsg, emailInput);
        return false;
    };
}