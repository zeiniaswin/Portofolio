/* =====================================================
   js/script.js — Perilaku halaman portofolio
   Author   : Zeini Aswin Rangkuti
   Versi    : 2.1
   Tanggal  : 7 November 2026
   Deskripsi: mode gelap, menu mobile, scrollspy, tombol atas,
              daftar keahlian dari array, validasi form kontak.
   Library  : jQuery 3.6.1 (js/vendor/, lisensi MIT) untuk manipulasi daftar dan animasi status.
   Konvensi : fungsi & variabel = camelCase, konstanta = HURUF_BESAR.
              Setiap fungsi diberi komentar Deskripsi, Initial state, Final state.
   ===================================================== */
'use strict';

/* ---------- KONSTANTA & DATA ---------- */
const EMAIL_TUJUAN = 'zeinirn34@gmail.com';
const KUNCI_TEMA = 'zeini-theme';          // kunci penyimpanan pilihan tema
const KUNCI_DRAFT = 'zeini-draft-pesan';   // kunci penyimpanan draft pesan
const OFFSET_NAVBAR = 120;                 // jarak (px) agar judul seksi tidak tertutup navbar
const BATAS_TOMBOL_ATAS = 300;             // tombol atas muncul setelah scroll sejauh ini (px)

// Array 1 dimensi, tipe data string, panjang 6. Diurutkan sebelum ditampilkan.
const DAFTAR_KEAHLIAN = ['HTML', 'CSS', 'JavaScript', 'Laravel', 'MySQL', 'Figma'];

/* ---------- LIBRARY PRE-EXISTING (jQuery) ---------- */

/* Deskripsi    : memeriksa apakah library jQuery berhasil dimuat (ketergantungan script ini).
   Initial state: index.html memuat js/vendor/jquery-3.6.1.min.js sebelum script ini.
   Final state  : mengembalikan true bila jQuery tersedia, false bila gagal dimuat. */
function cekJQuery() {
  return typeof window.jQuery === 'function';
}

// Bila false, fitur yang memakai jQuery otomatis beralih ke cara bawaan browser.
const ADA_JQUERY = cekJQuery();

/* ---------- FUNGSI BANTU ---------- */

/* Deskripsi    : mengambil elemen berdasarkan id.
   Initial state: id elemen diketahui.
   Final state  : mengembalikan elemen, atau null bila tidak ada. */
function ambil(id) {
  return document.getElementById(id);
}

/* Deskripsi    : membaca data dari localStorage dengan penanganan galat.
   Initial state: kunci terdaftar atau belum.
   Final state  : mengembalikan teks tersimpan, atau null bila kosong/diblokir browser. */
function bacaData(kunci) {
  try { return localStorage.getItem(kunci); } catch (galat) { return null; }
}

/* Deskripsi    : menulis data ke localStorage dengan penanganan galat.
   Initial state: kunci dan nilai (teks) tersedia.
   Final state  : data tersimpan; mengembalikan true bila berhasil, false bila gagal. */
function simpanData(kunci, nilai) {
  try { localStorage.setItem(kunci, nilai); return true; } catch (galat) { return false; }
}

/* Deskripsi    : menghapus data dari localStorage.
   Initial state: kunci tersedia.
   Final state  : data dengan kunci tersebut terhapus (gagal diabaikan). */
function hapusData(kunci) {
  try { localStorage.removeItem(kunci); } catch (galat) { /* diabaikan */ }
}

/* ---------- MODE GELAP ---------- */

/* Deskripsi    : memasang atau melepas mode gelap pada halaman.
   Initial state: parameter gelap bernilai true/false.
   Final state  : class dark-mode pada <body>, ikon, dan atribut aria tombol sesuai parameter. */
function terapkanTema(gelap) {
  const tombol = ambil('theme-toggle');
  document.body.classList.toggle('dark-mode', gelap);
  if (!tombol) return;
  tombol.textContent = gelap ? '☀' : '☾';
  tombol.setAttribute('aria-pressed', String(gelap));
  tombol.setAttribute('aria-label', gelap ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
}

/* Deskripsi    : memilih tema awal lalu memasang tombol pengganti tema.
   Initial state: halaman baru dimuat; pilihan tema mungkin sudah tersimpan.
   Final state  : tema terpasang (pilihan tersimpan, atau ikut pengaturan perangkat);
                  klik tombol mengganti tema dan menyimpannya. */
function siapkanTema() {
  const tersimpan = bacaData(KUNCI_TEMA);
  if (tersimpan !== null) {
    terapkanTema(tersimpan === 'dark');
  } else {
    terapkanTema(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  const tombol = ambil('theme-toggle');
  if (!tombol) return;
  tombol.addEventListener('click', function () {
    const gelap = !document.body.classList.contains('dark-mode');
    terapkanTema(gelap);
    simpanData(KUNCI_TEMA, gelap ? 'dark' : 'light');
  });
}

/* ---------- MENU MOBILE ---------- */

/* Deskripsi    : membuka atau menutup menu mobile.
   Initial state: parameter buka bernilai true/false.
   Final state  : menu tampil/tersembunyi dan aria-expanded diperbarui. */
function aturMenu(buka) {
  const menu = ambil('mobile-menu');
  const tombol = ambil('menu-btn');
  if (!menu || !tombol) return;
  menu.hidden = !buka;
  tombol.setAttribute('aria-expanded', String(buka));
}

/* Deskripsi    : memasang klik pada tombol menu dan tautan di dalamnya.
   Initial state: menu tertutup.
   Final state  : klik tombol membuka/menutup menu; klik tautan menutup menu. */
function siapkanMenu() {
  const tombol = ambil('menu-btn');
  const menu = ambil('mobile-menu');
  if (!tombol || !menu) return;
  tombol.addEventListener('click', function () { aturMenu(menu.hidden); });
  const tautan = menu.querySelectorAll('a');
  for (let i = 0; i < tautan.length; i++) {            // pengulangan atas semua tautan
    tautan[i].addEventListener('click', function () { aturMenu(false); });
  }
}

/* ---------- SCROLLSPY & TOMBOL ATAS ---------- */

/* Deskripsi    : mencari id seksi yang sedang berada di layar.
   Initial state: posisi scroll vertikal (px) diberikan.
   Final state  : mengembalikan id seksi aktif, atau '' bila masih di atas semua seksi. */
function cariSeksiAktif(posisi) {
  const seksi = document.querySelectorAll('main section[id], footer[id]'); // footer#contact ikut dihitung
  let aktif = '';
  for (let i = 0; i < seksi.length; i++) {
    if (posisi >= seksi[i].offsetTop - OFFSET_NAVBAR) aktif = seksi[i].id; // percabangan
  }
  return aktif;
}

/* Deskripsi    : menandai menu yang aktif dan menampilkan/menyembunyikan tombol atas.
   Initial state: halaman sedang di-scroll.
   Final state  : link menu aktif diberi class active; tombol atas tampil bila scroll > batas. */
function perbaruiScroll() {
  const aktif = cariSeksiAktif(window.scrollY);
  const menu = document.querySelectorAll('.nav-link');
  for (let i = 0; i < menu.length; i++) {
    menu[i].classList.toggle('active', menu[i].getAttribute('href') === '#' + aktif);
  }
  const tombolAtas = ambil('to-top');
  if (tombolAtas) tombolAtas.classList.toggle('visible', window.scrollY > BATAS_TOMBOL_ATAS);
}

/* Deskripsi    : memasang pendengar scroll yang hemat (maksimal sekali per frame).
   Initial state: halaman dimuat.
   Final state  : perbaruiScroll berjalan efisien saat scroll; tombol atas berfungsi. */
function siapkanScroll() {
  let menunggu = false;
  window.addEventListener('scroll', function () {
    if (menunggu) return;                               // lewati bila frame sebelumnya belum selesai
    menunggu = true;
    requestAnimationFrame(function () { perbaruiScroll(); menunggu = false; });
  });
  const tombolAtas = ambil('to-top');
  if (tombolAtas) tombolAtas.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- DAFTAR KEAHLIAN (array, pengurutan, pengulangan) ---------- */

/* Deskripsi    : menampilkan keahlian terurut ke dalam daftar di halaman.
   Initial state: <ul id="skill-list"> berisi isi statis cadangan.
   Final state  : isi diganti item dari DAFTAR_KEAHLIAN sesuai urutannya
                  (memakai jQuery bila tersedia, jika tidak memakai DOM bawaan). */
function tampilkanKeahlian() {
  const daftarKeahlian = DAFTAR_KEAHLIAN;
  if (ADA_JQUERY) {
    const $daftar = jQuery('#skill-list');
    if ($daftar.length === 0) return;
    $daftar.empty();
    jQuery.each(daftarKeahlian, function (indeks, nama) { // pengulangan oleh jQuery
      jQuery('<li>').text(nama).appendTo($daftar);
    });
    return;
  }
  const daftarHtml = ambil('skill-list');
  if (!daftarHtml) return;
  daftarHtml.innerHTML = '';
  for (let i = 0; i < daftarKeahlian.length; i++) {     // cadangan tanpa jQuery
    const item = document.createElement('li');
    item.textContent = daftarKeahlian[i];
    daftarHtml.appendChild(item);
  }
}

/* ---------- FORM KONTAK ---------- */

/* Deskripsi    : memeriksa format alamat email.
   Initial state: email berupa teks.
   Final state  : mengembalikan true bila formatnya benar, false bila tidak. */
function validasiEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Deskripsi    : memeriksa seluruh isian form.
   Initial state: data = { nama, email, pesan } berisi teks.
   Final state  : mengembalikan array pesan galat (array kosong bila semua isian benar). */
function validasiForm(data) {
  const galat = [];
  if (data.nama.trim().length < 2) galat.push('Nama minimal 2 karakter.');
  if (!validasiEmail(data.email.trim())) galat.push('Format email belum benar.');
  if (data.pesan.trim().length < 10) galat.push('Pesan minimal 10 karakter.');
  return galat;
}

/* Deskripsi    : membaca nilai isian dari form.
   Initial state: form berisi field nama, email, pesan.
   Final state  : mengembalikan objek { nama, email, pesan }. */
function bacaForm(form) {
  return {
    nama: form.elements['nama'].value,
    email: form.elements['email'].value,
    pesan: form.elements['pesan'].value
  };
}

/* Deskripsi    : menampilkan pesan status di bawah form.
   Initial state: teks pesan dan penanda berhasil (true/false) diberikan.
   Final state  : teks tampil dengan animasi memudar (jQuery) atau langsung (cadangan);
                  class ok dipasang bila berhasil. */
function tampilkanStatus(teks, berhasil) {
  const status = ambil('form-status');
  if (!status) return;
  if (ADA_JQUERY) {
    jQuery(status).stop(true).css('opacity', 0).text(teks).toggleClass('ok', berhasil).animate({ opacity: 1 }, 250);
    return;
  }
  status.textContent = teks;
  status.classList.toggle('ok', berhasil);
}

/* Deskripsi    : menangani pengiriman form.
   Initial state: pengguna menekan tombol kirim.
   Final state  : bila ada galat, semua galat ditampilkan; bila valid, aplikasi email
                  dibuka dengan isi pesan, draft dihapus, dan form dikosongkan. */
function kirimForm(event) {
  event.preventDefault();
  const form = event.target;
  const data = bacaForm(form);
  const galat = validasiForm(data);
  if (galat.length > 0) {
    tampilkanStatus(galat.join(' '), false);
    return;
  }
  const subjek = encodeURIComponent('Pesan dari ' + data.nama.trim());
  const isi = encodeURIComponent(data.pesan.trim() + '\n\nEmail pengirim: ' + data.email.trim());
  window.location.href = 'mailto:' + EMAIL_TUJUAN + '?subject=' + subjek + '&body=' + isi;
  hapusData(KUNCI_DRAFT);
  form.reset();
  tampilkanStatus('Aplikasi email Anda dibuka. Silakan tekan kirim di sana.', true);
}

/* Deskripsi    : menyimpan draft pesan ke localStorage setiap ada ketikan.
   Initial state: pengguna mengetik di form.
   Final state  : nilai nama, email, pesan tersimpan sebagai teks JSON. */
function simpanDraft(form) {
  simpanData(KUNCI_DRAFT, JSON.stringify(bacaForm(form)));
}

/* Deskripsi    : mengisi kembali form dari draft yang tersimpan.
   Initial state: halaman dimuat; draft mungkin ada.
   Final state  : bila draft valid, field form terisi; bila rusak atau kosong, form dibiarkan. */
function pulihkanDraft(form) {
  const mentah = bacaData(KUNCI_DRAFT);
  if (mentah === null) return;
  try {
    const draft = JSON.parse(mentah);
    form.elements['nama'].value = draft.nama || '';
    form.elements['email'].value = draft.email || '';
    form.elements['pesan'].value = draft.pesan || '';
  } catch (galat) {
    hapusData(KUNCI_DRAFT);                             // draft rusak: buang
  }
}

/* Deskripsi    : memasang semua perilaku form kontak.
   Initial state: form tampil kosong.
   Final state  : draft dipulihkan; submit divalidasi; ketikan disimpan sebagai draft. */
function siapkanForm() {
  const form = ambil('contact-form');
  if (!form) return;
  pulihkanDraft(form);
  form.addEventListener('submit', kirimForm);
  form.addEventListener('input', function () { simpanDraft(form); });
}

/* ---------- CADANGAN GAMBAR ---------- */

/* Deskripsi    : menyembunyikan logo sekolah yang gagal dimuat agar tidak tampil ikon rusak.
   Initial state: semua gambar di dalam .logo-box sudah ada di halaman.
   Final state  : gambar yang gagal dimuat disembunyikan. */
function siapkanCadanganLogo() {
  const logo = document.querySelectorAll('.logo-box img');
  for (let i = 0; i < logo.length; i++) {
    logo[i].addEventListener('error', function () { this.style.display = 'none'; });
  }
}

/* ---------- PROGRAM UTAMA ---------- */

/* Deskripsi    : menjalankan semua fitur halaman satu per satu.
   Initial state: HTML sudah dimuat (script memakai atribut defer).
   Final state  : tahun footer terisi, tema, menu, scroll, keahlian, dan form siap dipakai. */
function jalankanHalaman() {
  const tahun = ambil('current-year');
  if (tahun) tahun.textContent = new Date().getFullYear();
  siapkanTema();
  siapkanMenu();
  siapkanScroll();
  tampilkanKeahlian();
  siapkanForm();
  siapkanCadanganLogo();
  perbaruiScroll();
}

jalankanHalaman();
