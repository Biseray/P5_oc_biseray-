const affichageItems = async () => {

  const items = document.querySelector('#items');

  const datas = await get("http://localhost:3000/api/products");
  if(datas === -1 ) {
    const RedirectionJs = document.location.href = "./index.html";
    alert("erreur");
    RedirectionJs;   

  };
  
  let cards = '';

  datas.forEach((item) => {
    cards +=
      `<a href='./product.html?id=${item._id}'>
          <article>
        <img src="${item.imageUrl}" alt="${item.altTxt}" >
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
      </article>
    </a>`
  });

  items.innerHTML = cards;

};


affichageItems();
