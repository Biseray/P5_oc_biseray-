

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

 