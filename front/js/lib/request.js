const get = async (url) => {
    const reponse = await fetch(url);
    if (reponse.status === 200) {
        return await reponse.json();
    } 
    return -1 ;

}



