const affichageOrderId = () => {
    const orderId =  searchParams.get("orderid");
    const confirmationOrderId = document.getElementById('orderId');
    console.log(orderId);
    confirmationOrderId.innerTexte    = orderId;
    // if (orderId = ""){
    //     window.href.location = 'index.html';
    // }
}

affichageOrderId();