const informationItem = async () => {

    const items = document.querySelector('#item');
  
    const datas = await get("http://localhost:3000/api/products");
    if(datas === -1 ) {
      alert("erreur");
    }
    
  
    items.innerHTML = cards;
  
  };
  
  informationItem();