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

};
// fonction qui verifie que le champs n'est pas vide si cest le cas il renvoie une erreur
const notEmpty = (value) => {
    if (value.trim().length === 0) {
        return false;
    };
    return true;

};

// ---------fonction qui vérifie que la valeur firstName est valide si ce n'est pas le cas elle renvoie false
const checkFirstName = (firstNameInput) => {
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    // regex du first name
    const firstNameRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
    // condition qui test  le regex sur l'input et que le champs n'est pas vide
    if (notEmpty(firstNameInput.value) && firstNameRegex.test(firstNameInput.value)) {
        champsValid(firstNameErrorMsg, firstNameInput);
        return true;
    } else {
        erreur(firstNameErrorMsg, firstNameInput);
        return false;
    };
}

// ---------fonction qui vérifie que la valeur lastName est valide si ce n'est pas le cas elle renvoie false
const checkLastName = (lastNameInput) => {
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    // regex du last name
    const lastNameRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
    // condition qui test  le regex sur l'input et que le champs n'est pas vide
    if (notEmpty(lastNameInput.value) && lastNameRegex.test(lastNameInput.value)) {
        champsValid(lastNameErrorMsg, lastNameInput);
        return true;
    } else {
        erreur(lastNameErrorMsg, lastNameInput);
        return false;
    };
}


// ---------fonction qui vérifie que la valeur address est valide si ce n'est pas le cas elle renvoie false
const checkAddress = (adressInput) => {
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    // regex du address
    const addressRegex = /^[a-zA-Z0-9\u00C0-\u017F-\s]{5,30}$/;
    // condition qui test  le regex sur l'input et que le champs n'est pas vide
    if (notEmpty(adressInput.value) && addressRegex.test(adressInput.value)) {
        champsValid(addressErrorMsg, adressInput);
        return true;
    } else {
        erreur(addressErrorMsg, adressInput);
        return false;
    };
}

// ---------fonction qui vérifie que la valeur city est valide si ce n'est pas le cas elle renvoie false
const checkCity = (cityInput) => {
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    // regex du city
    const cityRegex = /^[a-zA-Z\u00C0-\u017F-\s]{1,30}$/;
    // condition qui test  le regex sur l'input et que le champs n'est pas vide
    if (notEmpty(cityInput.value) && cityRegex.test(cityInput.value)) {
        champsValid(cityErrorMsg, cityInput);
        return true;
    } else {
        erreur(cityErrorMsg, cityInput);
        return false;
    };
}

// ---------fonction qui vérifie que la valeur email est valide si ce n'est pas le cas elle renvoie false
const checkEmail = (emailInput) => {
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    // regex du email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // condition qui test  le regex sur l'input et que le champs n'est pas vide
    if (notEmpty(emailInput.value) && emailRegex.test(emailInput.value)) {
        champsValid(emailErrorMsg, emailInput);
        return true;
    } else {
        erreur(emailErrorMsg, emailInput);
        return false;
    };
}