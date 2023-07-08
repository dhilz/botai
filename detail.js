const axios = require('axios');

async function sendWhatsapp(nomor, pesan) {
  const instanceId = "648E548259A8C";  // Ganti dengan instance ID Anda
  const clientId = "64896afa29da7";  // Ganti dengan client ID Anda
  const url = `https://dilzshop.my.id/api/send?number=${nomor}&type=text&message=${pesan}&instance_id=${instanceId}&access_token=${clientId}`;

  try {
    const response = await axios.get(url);
    console.log('Response:', response.data);
  } catch (error) {
    console.log('Error:', error.response.data);
  }
}

async function detail(judul, nomor) {
  try {
    const url = `https://sosial.dilzshop.my.id/Nanime/anime/${judul}`;

    const response = await axios.get(url);
    const data = response.data;
    const synopsis = data.synopsis;
    const episode = data.episode;
    const pesan = `Hasil pencarian untuk Judul ${judul}:%0ASinopsis:%0A${synopsis}%0ATotal Episode :%20${episode}`;
    console.log(nomor)
    sendWhatsapp(nomor, pesan);
  } catch (error) {
    console.error(error);
  }
}

module.exports = detail;
