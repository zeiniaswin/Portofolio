# Portofolio Zeini Aswin Rangkuti

Website portofolio statis (HTML, CSS, JavaScript) siswa Rekayasa Perangkat Lunak SMKN 20 Jakarta.
Dibuat untuk Uji Sertifikasi Kompetensi Junior Web Developer (SKKNI No. 282 Tahun 2016, Software Development - Pemrograman).

- Author : Zeini Aswin Rangkuti
- Versi  : 2.1
- Tanggal: 7 November 2026

## Cara menjalankan
1. Ekstrak folder ini.
2. Buka `index.html` dengan browser (Chrome, Edge, atau Firefox). Tidak perlu internet maupun web server.
3. Opsional: buka folder di VS Code dan jalankan ekstensi Live Server.

Menjalankan = membuka `index.html` di browser. Debugging = tekan F12, lalu pakai tab Console (galat JavaScript) dan Elements (HTML/CSS).
Halaman web tidak dikompilasi menjadi file executable.

## Struktur folder
```
portofolio-zeini/
├── README.md          penjelasan struktur dan sumber daya (file ini)
├── index.html         struktur halaman (semantik: header, nav, main, section, footer)
├── css/
│   └── style.css      seluruh gaya: variabel warna, tata letak, mode gelap, responsif
├── cv/
│   └── CV_Zeini_Aswin.pdf   file untuk tombol Download CV
├── js/
│   ├── script.js      seluruh perilaku: tema, menu, scrollspy, keahlian, form
│   └── vendor/        library pihak ketiga (tidak diubah)
│       ├── jquery-3.6.1.min.js
│       └── LICENSE-jquery.txt
└── img/               aset gambar dan ilustrasi SVG
    ├── foto-profil.jpg
    ├── logo-smkn-20-jakarta.jpg
    ├── logo-smpn-178-jakarta.jpg
    ├── logo-sdn-013.jpg
    ├── cover-kalkulator.svg
    ├── cover-produk-minuman.svg
    └── favicon.svg
```

## Standar penulisan
- Nama file dan class CSS: huruf kecil dipisah tanda hubung (`style.css`, `.project-card`).
- Fungsi dan variabel JavaScript: camelCase (`validasiEmail`). Konstanta: HURUF_BESAR (`EMAIL_TUJUAN`).
- Setiap fungsi diberi komentar Deskripsi, Initial state, dan Final state. Author, versi, dan tanggal ada di kepala file.
- Indentasi 2 spasi. Mode ketat (`'use strict'`) aktif di JavaScript.

## Library pre-existing: jQuery
| Butir | Keterangan |
|---|---|
| Library | jQuery v3.6.1 (`js/vendor/jquery-3.6.1.min.js`) |
| Lisensi | MIT. Teks lisensi ada di `js/vendor/LICENSE-jquery.txt`, dan baris hak cipta di dalam file library tidak dihapus. Memakai dan menyalinnya tidak melanggar hak cipta |
| Sumber | jquery.com (salinan dari paket `libjs-jquery`) |
| Dipakai untuk | Membangun daftar keahlian dari array (`tampilkanKeahlian`) dan animasi memudar pada pesan status form (`tampilkanStatus`) |
| Manfaat efisiensi | Manipulasi DOM dan animasi lintas-browser cukup beberapa baris, tanpa menulis ulang kode animasi sendiri |
| Ketergantungan | `script.js` bergantung pada `jquery-3.6.1.min.js`, sehingga dimuat lebih dulu di `index.html`. Bila library gagal dimuat, `cekJQuery()` bernilai false dan fitur memakai DOM bawaan browser |
| Versi | Memakai seri 3.x yang masih didukung. Versi terbaru perlu dicek di jquery.com sebelum dipakai untuk produksi |

Cara memperbarui library:
1. Unduh versi `jquery-x.y.z.min.js` terbaru dari jquery.com dan baca catatan rilisnya.
2. Simpan di `js/vendor/`, lalu ubah nama file pada tag `<script>` di `index.html` dan perbarui `LICENSE-jquery.txt`.
3. Buka halaman dan uji daftar keahlian serta pesan status form. Pastikan konsol (F12) tanpa galat, lalu hapus file versi lama.

## Fitur dan unit kompetensi yang diwakili
| Unit | Wujud di proyek ini |
|---|---|
| J.620100.005 Implementasi user interface | Menu navigasi (desktop dan mobile), form kontak, gaya komponen, mode gelap, dan tampilan responsif |
| J.620100.010 Perintah eksekusi | Halaman dijalankan langsung di browser; HTML menyajikan teks, foto dan SVG menjadi grafik, sedangkan JavaScript/CSS menghadirkan interaksi serta animasi. Cara menjalankan dijelaskan di atas |
| J.620100.015 Organisasi file rapi | Folder `css/`, `js/`, `img/`, README ini, komentar di tiap fungsi dan bagian |
| J.620100.016 Guidelines dan best practices | Penamaan konsisten, variabel CSS, penanganan galat (`try/catch`, validasi form, pengecekan elemen), scroll hemat lewat `requestAnimationFrame` |
| J.620100.017 Pemrograman terstruktur | Tipe data, percabangan (`if`), pengulangan (`for`), fungsi dengan parameter dan nilai balik, array 1 dimensi (`DAFTAR_KEAHLIAN`, 6 teks), menulis dan membaca data (`localStorage`: tema dan draft pesan) |
| J.620100.019 Library/komponen pre-existing | jQuery 3.6.1 dengan lisensi, ketergantungan, dan prosedur pembaruan seperti di atas |

## Sumber daya dan lisensi
- Foto profil: milik pemilik portofolio.
- Logo SMKN 20 Jakarta, SMPN 178 Jakarta, dan SDN: milik masing-masing sekolah, dipakai sebagai identitas riwayat pendidikan.
- CV (`cv/CV_Zeini_Aswin.pdf`): disusun dari data yang sama dengan isi portofolio.
- Screenshot proyek: tangkapan layar karya pemilik portofolio.
- jQuery: MIT License (lihat di atas). Tidak ada font atau kode pihak ketiga lainnya.
