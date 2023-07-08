const express = require('express');
const LexicaArt = require('lexicaart');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const translatte = require('translatte');
const app = express();
const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
//Anime
const stream = require('./urlvideo');
const detail = require('./detail');
const carilist = require('./carilist');
//akhir Anime
const port = 2400;
let idpesan="";
let cari="";
let psm="";
let nombergb="";

app.use(bodyParser.json());
let kodesurat = '';
let nama = '';
let nik = '';
let ttl = '';
let alamat = '';
let tujuan = '';
let kelamin = '';
let agama = '';
let status = '';
let pekerjaan = '';

// Mengirim data ke server lain dan mereset nilai variabel setelah pengiriman
function kirimDataKeServerLain() {
  // Menyiapkan data yang akan dikirim
  const data = {
    number: number,
    kodesurat: kodesurat,
    nama: nama,
    nik: nik,
    ttl: ttl,
    alamat: alamat,
    tujuan: tujuan,
    kelamin: kelamin,
    agama: agama,
    status: status,
    pekerjaan: pekerjaan
  };
  // Mengirim data ke server lain
  axios.post('https://script.google.com/macros/s/AKfycbyvuY7WGX4nPnLalgy-EHoU5ZpdSy6Nwcmw9B-xPrSKYleEVIogX_tyejmvA-xXLkTu/exec', data)
    .then(response => {
      console.log('Data terkirim ke server lain');
      // Mereset nilai variabel-variabel
      number = '';
      kodesurat = '';
      nama = '';
      nik = '';
      ttl = '';
      alamat = '';
      tujuan = '';
      kelamin = '';
      agama = '';
      status = '';
      pekerjaan = '';
    })
    .catch(error => {
      console.error('Gagal mengirim data ke server lain:', error);
    });
}

function SoratBungkol() {
  // Menyiapkan data yang akan dikirim
  const data = {
    number: number,
    bungkolan: bungkolan,
  };

  // Mengirim data ke server lain
  axios.post('https://script.google.com/macros/s/AKfycbwZ0Zd4qBm2oSsb_eVOMcD2OuW1kXyJQUZFylxWDKMeJhf3NshKVpyqqSRe-Lm7SY5tlA/exec', data)
    .then(response => {
      console.log('Data terkirim ke server lain');
      // Mereset nilai variabel-variabel
      number = '';
      bungkolan = '';
    })
    .catch(error => {
      console.error('Gagal mengirim data ke server lain:', error);
    });
}

//server ai


const fetchData = () => {
  const pesan = "🚀Comptutor Is On Going Cari Data🚀";
  sendWhatsapp(nomor, pesan);
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

//tiktokserver
function getTiktokVideoUrl(url) {
  return new Promise((resolve, reject) => {
    TiktokDL(url)
      .then((result) => {
        const videoUrl = result.result.video[0];
        resolve(videoUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//Kirim Pesan Wa
async function sendWhatsapp(nomor, pesan) {
  const instanceId = "648E548259A8C";  // Ganti dengan instance ID Anda
  const clientId = "64896afa29da7";  // Ganti dengan client ID Anda
  const url = `https://dilzshop.my.id/api/send?number=${nomor}&type=text&message=${pesan}&instance_id=${instanceId}&access_token=${clientId}`;

  try {
    const response = await axios.get(url);
    console.log('Response:', response.data);
  } catch (error) {
    console.log('Response:', response.data);
  }
}

//kirim gambar
async function kirimgambar(nombergb, urlmedia1) {

  const pesan = "Ini Hasil Pencarian Anda";
  const instanceId = "648E548259A8C";  // Ganti dengan instance ID Anda
  const clientId = "64896afa29da7";  // Ganti dengan client ID Anda
  const url = `https://dilzshop.my.id/api/send?number=${nombergb}&type=media&message=${pesan}&media_url=${urlmedia1}&filename=result1.png&instance_id=${instanceId}&access_token=${clientId}`;
  try {
    const response = await axios.get(url);
    console.log(response)
  } catch (error) {
    console.log('Response:', response.data);
  }
}

// function hadis(keyword) {
//   const apiUrl = `https://apikey.dilzshop.my.id/cari/${encodeURIComponent(keyword)}`;

//   return axios.get(apiUrl)
//     .then(response => response.data)
//     .catch(error => {
//       throw new Error('Gagal mengambil data dari API pencarian: ' + error.message);
//     });
// }
//Create Gambar Online Via Whatsapp
const main = async (cari) => {
  const lexicaArt = new LexicaArt();
  const info = await lexicaArt.search(cari);
  console.log('Title:', info[5].prompt);

  const imageUrls = info[5].images.map(image => image.url);

  const [url1, url2] = imageUrls;

  await saveFile(url1, 'image1.png');
  //await saveFile(url2, 'image2.png');
}
//Save Hasil
async function saveFile(url, filename) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const filePath = path.join('/www/wwwroot/ai.dilzshop.my.id/public/images', filename);
    fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'));
    console.log(`File "${filename}" saved at "${filePath}".`);
    const urlmedia1="https://ai.dilzshop.my.id/public/images/image1.png";
    kirimgambar(nombergb,urlmedia1);
  } catch (error) {
    console.log('Error:', error.message);
  }
}
//Translate Kata
async function translateText() {
  try {
    const targetLanguage = 'en'; // Bahasa english

    const translation = await translatte(psm, { to: targetLanguage });
    cari = translation.text;
    console.log(cari)
    main(cari);
  } catch (error) {
    console.error(error);
  }
}
app.post('/comptutor', async (req, res) => {
  const data = req.body.data.data;

  if (data && data.messages && data.messages.length > 0) {
    const message = data.messages[0];
    
    const text = message.message.extendedTextMessage && message.message.extendedTextMessage.text;
    const conversation = message.message.conversation;
    const remoteJid = message.key && message.key.remoteJid;

    // Memisahkan nilai remoteJid dengan @ dan mendapatkan nilai sebelum @
    const remoteJidParts = remoteJid.split('@');
    const remoteJidPrefix = remoteJidParts[0];

    if (conversation && conversation.startsWith("Kode Surat:")) {
      kodesurat = conversation.split("Kode Surat:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Nama Anda dengan Format *Nama:* Contoh *Nama: Muhammad Fadollah*";
      sendWhatsapp(nomor, pesan);
    } else if (text && text.startsWith("Kode Surat:")) {
      kodesurat = text.split("Kode Surat:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Nama Anda dengan Format *Nama:* Contoh *Nama: Muhammad Fadollah*";
      sendWhatsapp(nomor, pesan);
    } else if (conversation && conversation.startsWith("Nama:") && kodesurat) {
      nama = conversation.split("Nama:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan NIK Anda dengan Format *NIK:* Contoh *NIK:1234567890123456*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
    } else if (text && text.startsWith("Nama:") && kodesurat) {
      nama = text.split("Nama:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan NIK Anda dengan Format *NIK:* Contoh *Nik:1234567890123456*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
    } else if (text && text.startsWith("Nama:") && kodesurat=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Silahkan Masukkan Kirim Kode Surat Terlebih Dahulu, Untuk cek Kode Surat Silahkan Ketik *kodesurat* Untuk Menampilkan Kode Surat";
      sendWhatsapp(nomor, pesan);
      console.log("Data Kosong")
    }else if (conversation && conversation.startsWith("Nama:") && kodesurat=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Silahkan Masukkan Kirim Kode Surat Terlebih Dahulu, Untuk cek Kode Surat Silahkan Ketik *kodesurat* Untuk Menampilkan Kode Surat";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
    }else if (conversation && conversation.startsWith("NIK:") && nama) {
      nik = conversation.split("NIK:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Tanggal Lahir Anda Anda dengan Format *TTL:* Contoh *TTL:Bondowoso-24-Agustus-1999*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
    }else if (text && text.startsWith("NIK:") && nama) {
      nik = text.split("NIK:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Tanggal Lahir Anda Anda dengan Format *TTL:* Contoh *TTL:Bondowoso-24-Agustus-1999*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
    }else if (text && text.startsWith("NIK:") && nama=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Silahkan Ikuti  Urutan Pesan Dengan mengetikkan pesan *kodepesan*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
    }else if (conversation && conversation.startsWith("NIK:") && nama=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Silahkan Ikuti  Urutan Pesan Dengan mengetikkan pesan *kodepesan*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
    }else if (text && text.startsWith("TTL:") && nik) {
      ttl = text.split("TTL:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Alamat Anda Anda dengan Format *Alamat:* Contoh *Alamat:Sucolor,Maesan,Bondowoso*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
    }else if (text && text.startsWith("TTL:") && nik=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Dimohon Periksa Kembali Nik Anda*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
    }else if (conversation && conversation.startsWith("TTL:") && nik=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Dimohon Periksa Kembali Nik Anda Atau Ikuti Panduan Buat Surat Dengan Kirim *kodesurat*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
    }else if (conversation && conversation.startsWith("TTL:") && nik) {
      ttl = conversation.split("TTL:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Alamat Anda Anda dengan Format *Alamat:* Contoh *Alamat:Sucolor,Maesan,Bondowoso*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
    }else if (conversation && conversation.startsWith("Alamat:") && ttl) {
      alamat = conversation.split("Alamat:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Tujuan Pembuatan Surat, dengan Format *Tujuan:* Contoh *Tujuan:Keterangan Domisili*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
    }else if (text && text.startsWith("Alamat:") && ttl) {
      alamat = text.split("Alamat:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Tujuan Pembuatan Surat, dengan Format *Tujuan:* Contoh *Tujuan:Keterangan Domisili*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
    }else if (text && text.startsWith("Alamat:") && ttl=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Periksa Tanggal Lahir Anda Atau Ikuti Urutan Pembuatan Surat Lihat Di *kodesurat*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
    }else if (conversation && conversation.startsWith("Alamat:") && ttl=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Periksa Tanggal Lahir Anda Atau Ikuti Urutan Pembuatan Surat Lihat Di *kodesurat*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
    }else if (conversation && conversation.startsWith("Tujuan:") && ttl) {
      tujuan = conversation.split("Tujuan:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Kelamin Anda  dengan Format *Kelamin:* Contoh *Kelamin:Laki-Laki*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
    }else if (text && text.startsWith("Tujuan:") && ttl) {
      tujuan = text.split("Tujuan:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Kelamin Anda  dengan Format *Kelamin:* Contoh *Kelamin:Laki-Laki*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
    }else if (text && text.startsWith("Tujuan:") && ttl=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Silahkan Cek Data Ttl Anda Atau Ikuti Step By Step Cara pembuatan Surat dengan mengetik *kodesurat*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
    }else if (conversation && conversation.startsWith("Tujuan:") && ttl=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Silahkan Cek Data Ttl Anda Atau Ikuti Step By Step Cara pembuatan Surat dengan mengetik *kodesurat*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
    }else if (text && text.startsWith("Kelamin:") && ttl) {
      kelamin = text.split("Kelamin:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Status Anda  dengan Format *Status:* Contoh *Status:Sudah Menikah*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
    }else if (conversation && conversation.startsWith("Kelamin:") && ttl) {
      kelamin = conversation.split("Kelamin:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Status Anda dengan Format *Status:* Contoh *Status:Sudah Menikah*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
    }else if (conversation && conversation.startsWith("Kelamin:") && ttl=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Dimohon Ikuti Panduan Pembuatan Surat Ketik *kodesurat* Untuk Melihat Panduan Pembuatan Surat";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
    }else if (text && text.startsWith("Kelamin:") && ttl=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Dimohon Ikuti Panduan Pembuatan Surat Ketik *kodesurat* Untuk Melihat Panduan Pembuatan Surat";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
    }else if (text && text.startsWith("Status:") && kelamin) {
      status = text.split("Status:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Agama Anda dengan Format *Agama:* Contoh *Agama:Islam*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
    }else if (conversation && conversation.startsWith("Status:") && kelamin) {
      status = conversation.split("Status:")[1].trim();
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Agama Anda dengan Format *Agama:* Contoh *Agama:Islam*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
    }else if (conversation && conversation.startsWith("Status:") && kelamin=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Silahkan Cek Data Status Anda Atau Ikuti Step By Step Cara pembuatan Surat dengan mengetik *kodesurat*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
    }else if (text && text.startsWith("Status:") && kelamin=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Silahkan Cek Data Status Anda Atau Ikuti Step By Step Cara pembuatan Surat dengan mengetik *kodesurat*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
    }else if (conversation && conversation.startsWith("Agama:") && status) {
      agama = conversation.split("Agama:")[1].trim();
      const nomor = remoteJidPrefix;
      number = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Pekerjaan Anda  dengan Format *Pekerjaan:* Contoh *Pekerjaan:Development Android apps dan Web App*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
      console.log(agama);
    }else if (text && text.startsWith("Agama:") && status) {
      agama = text.split("Agama:")[1].trim();
      number = remoteJidPrefix;
      const nomor = remoteJidPrefix;
      const pesan = "Selanjutnya Masukkan Pekerjaan Anda  dengan Format *Pekerjaan:* Contoh *Pekerjaan:Development Android apps dan Web App*";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
      console.log(agama);
    }else if (text && text.startsWith("Agama:") && status=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Dimohon Ikuti Panduan Pembuatan Surat Ketik *kodesurat* Untuk Melihat Panduan Pembuatan Surat";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
      console.log(agama);
    }else if (conversation && conversation.startsWith("Agama:") && status=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Dimohon Ikuti Panduan Pembuatan Surat Ketik *kodesurat* Untuk Melihat Panduan Pembuatan Surat";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
      console.log(agama);
    }else if (conversation && conversation.startsWith("Pekerjaan:") && agama) {
      pekerjaan = conversation.split("Pekerjaan:")[1].trim();
      number = remoteJidPrefix;
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
      console.log(agama);
      console.log(pekerjaan);
      kirimDataKeServerLain();
    }else if (text && text.startsWith("Pekerjaan:") && agama) {
      pekerjaan = text.split("Pekerjaan:")[1].trim();
      number = remoteJidPrefix;
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
      console.log(agama);
      kirimDataKeServerLain();
    }else if (text && text.startsWith("Pekerjaan:") && status=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Dimohon Ikuti Panduan Pembuatan Surat Ketik *kodesurat* Untuk Melihat Panduan Pembuatan Surat";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
      console.log(agama);
    }else if (conversation && conversation.startsWith("Pekerjaan:") && status=='') {
      const nomor = remoteJidPrefix;
      const pesan = "Dimohon Ikuti Panduan Pembuatan Surat Ketik *kodesurat* Untuk Melihat Panduan Pembuatan Surat";
      sendWhatsapp(nomor, pesan);
      console.log(kodesurat);
      console.log(nama);
      console.log(nik);
      console.log(nik);
      console.log(alamat);
      console.log(tujuan);
      console.log(kelamin);
      console.log(status);
      console.log(agama);
    }else if (conversation && conversation.startsWith("/")) {
      openai = conversation.split("/")[1].trim();
      postData = {
        jailbreakConversationId: "True",
        message: openai,
        conversationId: idpesan,
      };
      nomor = remoteJidPrefix;
      fetchData(postData,nomor)
      .then(datafix => {
        console.log(datafix);
        const balasan =datafix
        sendWhatsapp(nomor, balasan);
        // Lakukan sesuatu dengan data yang diterima
      })
      .catch(error => {
        // Tangani kesalahan jika terjadi
        console.log(error);
      });
    }else if (text && text.startsWith("/")) {
      openai = text.split("/")[1].trim();
      postData = {
        jailbreakConversationId: "True",
        message: openai,
        conversationId: idpesan,
      };
      nomor = remoteJidPrefix;
      fetchData(postData,nomor)
      .then(datafix => {
        console.log(datafix);
        const balasan =datafix
        sendWhatsapp(nomor, balasan);
        // Lakukan sesuatu dengan data yang diterima
      })
      .catch(error => {
        // Tangani kesalahan jika terjadi
        console.log(error);
      });
    }else if (text && text.startsWith("autor")) {
      const nomor = remoteJidPrefix;
      const pesan = "🚀Kode Ini Di Buat Oleh Muhammad Fadollah Dengan License MIT🚀";
      sendWhatsapp(nomor, pesan);
    }else if (conversation && conversation.startsWith("autor")) {
      const nomor = remoteJidPrefix;
      const pesan = "🚀Kode Ini Di Buat Oleh Muhammad Fadollah|License MIT🚀";
      sendWhatsapp(nomor, pesan);
    }else if (text && text.startsWith("Surat Desa:")) {
      bungkolan = text.split("Surat Desa:")[1].trim();
      number = remoteJidPrefix;
      SoratBungkol();
    }else if (conversation && conversation.startsWith("Surat Desa:")) {
      bungkolan = conversation.split("Surat Desa:")[1].trim();
      number = remoteJidPrefix;
      SoratBungkol();
    }else if (conversation && conversation.startsWith("https://vt.tiktok.com")) {
      const tiktokUrl = conversation;
      nomor = remoteJidPrefix;
      const pesan = "🚀This Your Result Bos!🚀"
      getTiktokVideoUrl(tiktokUrl)
        .then((videoUrl) => {
          sendWhatsapp(nomor, pesan);
          sendWhatsapp(nomor, videoUrl);
          console.log(videoUrl);
        })
        .catch((error) => {
          console.error(error);
        });
    }else if (text && text.startsWith("https://vt.tiktok.com")) {
      const tiktokUrl = text;
      nomor = remoteJidPrefix;
      const pesan = "🚀This Your Result Bos!🚀"
      getTiktokVideoUrl(tiktokUrl)
        .then((videoUrl) => {
          sendWhatsapp(nomor, pesan);
          sendWhatsapp(nomor, videoUrl);
          console.log(videoUrl);
        })
        .catch((error) => {
          console.error(error);
        });
    }else if (conversation && conversation.startsWith("#")) {
      psm = conversation.split("#")[1].trim();
      nombergb = remoteJidPrefix;
      translateText(psm)
    } else if (text && text.startsWith("#")) {
      psm = text.split("#")[1].trim();
      nombergb = remoteJidPrefix;
      translateText(psm)
    }else if (conversation && conversation.startsWith("Anime")) {
      judul = conversation.split("Anime")[1].trim();
      nomor = remoteJidPrefix;
      carilist(judul,nomor);
    } else if (text && text.startsWith("Anime")) {
      judul = text.split("Anime")[1].trim();
      nomor = remoteJidPrefix;
      carilist(judul,nomor);
    }else if (conversation && conversation.startsWith("DetailAnime")) {
      judul = conversation.split("DetailAnime")[1].trim();
      nomor = remoteJidPrefix;
      detail(judul,nomor);
    } else if (text && text.startsWith("DetailAnime")) {
      judul = text.split("DetailAnime")[1].trim();
      nomor = remoteJidPrefix;
      detail(judul,nomor);
    }else if (conversation && conversation.startsWith("Stream")) {
      judul = conversation.split("/")[1].trim();
      episode = conversation.split("/")[2].trim()
      nomor = remoteJidPrefix;
      stream(judul,episode,nomor);
    } else if (text && text.startsWith("Strem")) {
      judul = text.split("/")[1].trim();
      episode = text.split("/")[2].trim();
      nomor = remoteJidPrefix;
      stream(judul,episode,nomor);
    } else{
      console.log("Nothing Data");
    }

    // Berikan respon sukses ke server luar
    res.sendStatus(200);
  } else {
    console.log('Data yang diterima tidak valid');
    res.sendStatus(400); // Bad Request
  }
});
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});