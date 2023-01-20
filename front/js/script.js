const affichageItems = async () => {

  const items = document.querySelector('#items');
// appel de la lapi pour recuperer tout les données et les afficher pas la suite 
  const datas = await get("http://localhost:3000/api/products");
  if(datas === -1 ) {
    const RedirectionJs = document.location.href = "./index.html";
    RedirectionJs;   

  };
  
  let cards = '';
// boucle qui affiche tout les produits de lAPI
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
