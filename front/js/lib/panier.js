
const loadPanier = () => {
    return JSON.parse(localStorage.getItem('panier')) || [];

}
const savePanier = (panier) => {
    localStorage.setItem('panier', JSON.stringify(panier));
}

const limiteQuantity = (quantity) => {
    if (quantity >= 1 && quantity <= 100) {
      } else {
        alert('choisissez une quantité entre 1 et 100 ');
      }
    
  };


const addProduct = (quantity, color, datas) => {
    
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
    }else if(productFind !== undefined) {
        productFind.quantity += parseInt(quantity);
        
    };

    console.log(productFind);

    console.log(panier);

    savePanier(panier);
};

