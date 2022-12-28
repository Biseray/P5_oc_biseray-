const showDetailItem = () => {
  const item = document.querySelector('.item');
  const dataId = new URL(location.href).searchParams.get("id");
  fetch(`http://localhost:3000/api/products/${dataId}`)
    .then(reponse => reponse.json())
    .then(datas => {


      let pictureProduct = document.querySelector('article .item__img');
      let nameProduct = document.getElementById('title');
      let price = document.getElementById('price');
      let description = document.getElementById('description');
      let itemsColors = document.querySelector('#colors');
      


      pictureProduct.innerHTML = `<img src="${datas.imageUrl}" alt="${datas.altTxt}">`;
      nameProduct.innerHTML = `${datas.name}`;
      price.innerHTML = `${datas.price}`;
      description.innerHTML = `${datas.description}`;


      let colors = datas.colors;
      
      for (let i = 0; i < colors.length; i++ ) {
        const newColors = document.createElement('option');
        newColors.innerHTML = colors[i];
        itemsColors.appendChild(newColors);
      }




    });
};

showDetailItem();
