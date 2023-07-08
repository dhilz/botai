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

async function stream(judul,episode, nomor) {
  try {
    const url = `https://sosial.dilzshop.my.id/Nanime/anime/${judul}/${episode}`;
    const response = await axios.get(url);
    const data = response.data;
    data.video.forEach((item, index) => {
        const videoNumber = index + 1;
        if (item.url.startsWith('https://uservideo.xyz')) {
            const pesan = `Hasil pencarian untuk Judul ${judul}:%0AEpisode : ${episode}%0A${videoNumber}. ${item.quality} link nya ${item.url}%0A`;
            console.log(pesan);
            sendWhatsapp(nomor, pesan);
        }else if(item.url.startsWith('https://new.uservideo.xyz')){
            const pesan = `Hasil pencarian untuk Judul ${judul}:%0AEpisode : ${episode}%0A${videoNumber}. ${item.quality} link nya ${item.url}%0A`;
            console.log(pesan);
            sendWhatsapp(nomor, pesan);
        }
        //console.log(`${videoNumber}. ${item.quality} link nya ${item.url}`);
    });
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = stream;