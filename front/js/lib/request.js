


const get = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
    alert('Le serveur est inaccessible.');
    window.location.href = '../index.html';
  }
  return -1;
};




const post = async (url, data) => {

  const response = await fetch(url, {
    method: "POST",
    headers: {

      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),

  })
  if (response.status === 201) {
    return await response.json(data.orderId);
  }
  console.log('erreur');
  alert('Le serveur est inaccessible.');

  return -1;
};

