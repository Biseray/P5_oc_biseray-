

const showDetailItem = async () => {
  const item = document.querySelector('.item');
  const dataId = new URL(location.href).searchParams.get("id");



  const datas = await get(`http://localhost:3000/api/products/${dataId}`);
  if (datas === -1) {
    const RedirectionJs = document.location.href = "./index.html"
    alert("erreur"), RedirectionJs;




  }
let id = datas._id;


  window.parent.document.title = `${datas.name}`;

  const pictureProduct = document.querySelector('article .item__img');
  const nameProduct = document.getElementById('title');
  const price = document.getElementById('price');
  const description = document.getElementById('description');
  const itemsColors = document.querySelector('#colors');



  pictureProduct.innerHTML = `<img src="${datas.imageUrl}" alt="${datas.altTxt}">`;
  nameProduct.innerHTML = `${datas.name}`;
  price.innerHTML = `${datas.price}`;
  description.innerHTML = `${datas.description}`;




  let selectColor = '';

  datas.colors.forEach((color) => {
    selectColor += `<option value="${color}">${color}</option>`;

  });

  itemsColors.insertAdjacentHTML('beforeend', selectColor);

  const details = (quantity, color) => {
    // const itemsDetails = {
    //       name: `${datas.name}`,
    //       image: `${datas.imageUrl}`,
    //       imageAlt: `${datas.altTxt}`,
         
    // };
    const data = {
      id: id,
      quantity,
      color,
      // itemsDetails, 
      name: `${datas.name}`,
      image: `${datas.imageUrl}`,
      imageAlt: `${datas.altTxt}`,
    };
    
    
    localStorage.setItem(id , JSON.stringify(data));

  };

  
  const ajoutPanier = document.getElementById('addToCart');

  ajoutPanier.addEventListener('click', function() {
    const quantityItems = document.getElementById('quantity').value;
    const colorsItems = document.getElementById('colors').value;
    if (quantityItems >= 1 && quantityItems <= 100) {
      if (colorsItems) {
        details(quantityItems, colorsItems);
        window.location.href = './cart.html';
      } else {
        alert('choisissez une couleur');
      }
    } else {
      alert('choisissez une quantité entre 1 et 100 ');
    }
  });
};

showDetailItem();



