const realodPage = () => {
  window.location.href = './cart.html';
};


const limiteQuantity = (quantity) => {

  if (quantity < 1 || quantity > 100) {
    alert('choisissez une quantité entre 1 et 100 ');
    return false;
  };
  return true;

};


const limtePanier = (id, quantity) => {
  let panier = loadPanier();
let article =   panier.find((i) => i.id === id && i.quantity === quantity);
console.log(article.quantity);
if (article > 100) { 
  
  alert('trop de quantité');
  return false; 

}
return true; 
}
// local storage 
const loadPanier = () => {
  return JSON.parse(localStorage.getItem('panier')) || [];

};
const savePanier = (panier) => {
  localStorage.setItem('panier', JSON.stringify(panier));
  // limitePanier(panier);
};





const updateQuantity = (id, color, quantity) => {
  const panier = loadPanier();
  let article = panier.find((item) => item.id === id && item.color === color);
  if (article) {
    article.quantity = quantity;
    savePanier(panier);
  };
};


// delete element
const SupprimerProduit = (id) => {
  const panier = loadPanier();
  for (let a = 0; a < panier.length; a++) {
    if (panier[a].id === id) {
      panier.splice(a, 1);
      savePanier(panier);
      break;
    };
  };
};

// verification du prix 
// const verificationPrix = (id) => {
//   const panier = loadPanier();
//   panier.find((item) => item.id == id);
  
// } 




// ajout au panier 

const addProduct = (quantity, color, datas, ) => {

  const panier = loadPanier();
  
  const productFind = panier.find(article => article.id === datas._id && article.color === color);
  if (productFind === undefined) {
    const product = {
      id: `${datas._id}`,
      quantity: parseInt(quantity),
      color: color,
      name: `${datas.name}`,
      image: `${datas.imageUrl}`,
      imageAlt: `${datas.altTxt}`,
    };
    panier.push(product);

  } else if (productFind !== undefined) {
    productFind.quantity += parseInt(quantity);


  };
  if (limiteQuantity(quantity) === true) {
   
    savePanier(panier);
    window.location.href = './cart.html';
  }

  console.log(productFind);

  console.log(panier);

  // console.log(limiteQuantity(quantity));

};

