import axios from "axios";


export const getImages = async (searchWord = 'pets') => await 
  axios.get(`https://api.pexels.com/v1/search?query=${searchWord}`, {
    headers: {
      Authorization: 'codeAuthorization'
    },
  });


