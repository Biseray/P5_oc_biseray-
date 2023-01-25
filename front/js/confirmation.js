const affichageOrderId = () => {
    const orderId =  new URL(location.href).searchParams.get("orderid");
    console.log(orderId);
    const confirmationOrderId = document.getElementById('orderId');
  
    confirmationOrderId.innerHTML = orderId;
    if (orderId !== orderId){

        window.location.href = './cart.html';
    };
}

affichageOrderId();