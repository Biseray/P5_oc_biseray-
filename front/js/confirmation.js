

// affichage du numéro de commande 
const affichageOrderId = () => {
    // recupération de l'orderid dans l"url
    const orderId = new URL(location.href).searchParams.get("orderid");
    console.log(orderId);
    const confirmationOrderId = document.getElementById('orderId');

    if (orderId != "") {
        confirmationOrderId.innerHTML = orderId;

    } else {
        alert('vous n\'avez pas accès à cette page');
        window.location.href = './index.html';

    };
}

affichageOrderId();