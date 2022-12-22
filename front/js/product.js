const showDetailItem = async () => {
  const item = document.querySelector('.item');
  const datas = await get("http://localhost:3000/api/products");
  if (datas === -1) {
    alert("erreur");
  }
  console.log(datas);
};

showDetailItem();