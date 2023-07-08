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

async function carilist(keyword, nomor) {
  try {
    const url = `https://sosial.dilzshop.my.id/Nanime/search?query=${keyword}`;

    const response = await axios.get(url);
    const data = response.data.list;
    const hasilPencarian = data.map((item, index) => `${index + 1}. ${item.slug}`);
    const pesan = `Hasil pencarian untuk keyword ${keyword}:%0A%0A${hasilPencarian.join('%0A')}`;
    console.log(pesan)
    sendWhatsapp(nomor, pesan);
  } catch (error) {
    console.error(error);
  }
}

module.exports = carilist;
