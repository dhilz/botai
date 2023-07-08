const LexicaArt = require('lexicaart');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const translatte = require('translatte');
const sourceText = 'Burung Burung Beterbangan';
let cari="";

const main = async (cari) => {
  const lexicaArt = new LexicaArt();
  const info = await lexicaArt.search(cari);
  console.log('Title:', info[5].prompt);

  const imageUrls = info[5].images.map(image => image.url);

  const [url1, url2, url3, url4] = imageUrls;

  await saveFile(url1, 'image1.png');
  await saveFile(url2, 'image2.png');
  await saveFile(url3, 'image3.png');
  await saveFile(url4, 'image4.png');
}

async function saveFile(url, filename) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const filePath = path.join('/www/wwwroot/ai.dilzshop.my.id/public/images', filename);
    fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'));
    console.log(`File "${filename}" saved at "${filePath}".`);
  } catch (error) {
    console.log('Error:', error.message);
  }
}

async function translateText() {
  try {
    const targetLanguage = 'en'; // Bahasa Jerman

    const translation = await translatte(sourceText, { to: targetLanguage });
    cari = translation.text;
    main(cari);
  } catch (error) {
    console.error(error);
  }
  console.log(cari)
}

translateText();
