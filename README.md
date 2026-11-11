# 🏛️ GKP Jemaat Tanjung Barat — Website

Website resmi GKP Jemaat Tanjung Barat, Jakarta Selatan.

---

## 📁 Struktur Folder

```
gkp_website/
├── index.html                  ← File utama (jangan diedit kecuali judul <title>)
│
├── css/
│   ├── variables.css           ← 🎨 GANTI WARNA & FONT di sini
│   └── style.css               ← 💄 Semua styling halaman
│
├── js/
│   └── main.js                 ← ⚙️ JavaScript (menu, form, animasi)
│
├── sections/                   ← 📄 Setiap bagian halaman ada di sini
│   ├── navbar.html             ← Menu navigasi & logo
│   ├── hero.html               ← Halaman utama / banner
│   ├── about.html              ← Tentang gereja & visi
│   ├── jadwal.html             ← Tabel jadwal ibadah
│   ├── galeri.html             ← Grid foto galeri
│   ├── konten.html             ← Live streaming YouTube + renungan harian
│   ├── persembahan.html        ← QRIS persembahan
│   ├── daftar.html             ← Form pendaftaran jemaat
│   └── footer.html             ← Footer & informasi kontak
│
└── assets/
    └── images/
        └── qris.png            ← 📲 Letakkan foto QRIS gereja di sini
```

---

## 🔧 Panduan Edit Cepat

| Mau edit apa? | Buka file ini |
|---|---|
| Ganti warna / tema | `css/variables.css` |
| Nama gereja & logo di navbar | `sections/navbar.html` |
| Teks hero & jadwal ibadah | `sections/hero.html` |
| Profil, visi, alamat gereja | `sections/about.html` |
| Tambah / hapus jadwal | `sections/jadwal.html` |
| Upload foto galeri | `sections/galeri.html` |
| Ganti YouTube channel | `sections/konten.html` |
| Upload foto QRIS | `sections/persembahan.html` |
| Field form pendaftaran | `sections/daftar.html` |
| Alamat & kontak footer | `sections/footer.html` |
| Hubungkan form ke MySQL/backend | `js/main.js` → fungsi `submitForm()` |

---

## 🚀 Cara Deploy

### A. Pakai Server PHP (paling mudah)
1. Upload seluruh folder ke hosting (cPanel / Niagahoster / etc)
2. Buka di browser — langsung jalan!

### B. Lokal (testing)
```bash
# Pakai Python
python3 -m http.server 8080

# Atau pakai Node.js
npx serve .
```

### C. Hubungkan Form ke MySQL
Edit `js/main.js` pada fungsi `submitForm()`, aktifkan bagian `fetch()`:
```js
fetch('/api/daftar.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(memberData)
})
```
Buat file `api/daftar.php` yang menerima POST dan simpan ke database MySQL.

---

## 📲 Cara Ganti Foto QRIS
1. Simpan foto QRIS gereja sebagai `assets/images/qris.png`
2. Buka `sections/persembahan.html`
3. Ganti bagian placeholder dengan:
```html
<img src="assets/images/qris.png" alt="QRIS GKP Tanjung Barat" style="width:220px;height:220px;border-radius:10px;">
```

## 📺 Cara Ganti YouTube Channel
1. Buka `sections/konten.html`
2. Cari: `src="https://www.youtube.com/embed/live_stream?channel=UCxxxxxx"`
3. Ganti `UCxxxxxx` dengan Channel ID YouTube gereja kalian

