const items = document.querySelector('#items')

fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(datas=> {


        let cards = ''
        for (const item of datas) {
            cards += 
            `<a href='./product.html?${item._id}'>
            <article>
          <img src="${item.imageUrl}" alt="${item.altTxt}" >
          <h3 class="productName">${item.name}</h3>
          <p class="productDescription">${item.description}</p>
        </article>
      </a>`

        }
        
        items.innerHTML = cards
       
        
    });

 