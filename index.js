const axios = require('axios');
const tanya = "Siapa Presiden Indonesia Pertama";
let idpesan = "";
const postData = {
  jailbreakConversationId: "True",
  message: tanya,
  conversationId: idpesan
};

const fetchData = () => {
  return new Promise((resolve, reject) => {
    axios.post('https://data.dilzshop.my.id/tanya', postData)
      .then(response => {
        idpesan = response.data.conversationId;
        const responseData = response.data.response;
        const modifiedResponse = responseData.replace('Sydney', 'Comptutor');
        const datafix = modifiedResponse.replace('Bing', 'Mr-Dilz');
        resolve(datafix);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

// Contoh pemanggilan fungsi fetchData
fetchData()
  .then(datafix => {
    console.log(datafix);
    // Lakukan sesuatu dengan data yang diterima
  })
  .catch(error => {
    // Tangani kesalahan jika terjadi
  });
