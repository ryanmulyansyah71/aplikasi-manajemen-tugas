// ==========================================
// 1. AMBIL ELEMEN HTML
// ==========================================
const inputTugas = document.getElementById('inputTugas');
const tombolTambah = document.getElementById('tombolTambah');
const daftarTugas = document.getElementById('daftarTugas');

// KOTAK PENYIMPANAN: Tempat menyimpan semua teks tugas dalam bentuk daftar (array)
let listTugasLokal = [];

// ==========================================
// 2. AMBIL DATA DARI LOCALSTORAGE SAAT WEB DIBUKA
// ==========================================
// Cek apakah di dalam "laci browser" (LocalStorage) sudah ada data bernama 'tugasSaya'
if (localStorage.getItem('tugasSaya')) {
    // Jika ada, ambil datanya, ubah formatnya, lalu masukkan ke dalam kotak penyimpanan kita
    listTugasLokal = JSON.parse(localStorage.getItem('tugasSaya'));
    // Tampilkan data yang tersimpan tadi ke layar web
    tampilkanSemuaTugas();
}

// ==========================================
// 3. FUNGSI UNTUK MENAMPILKAN TUGAS KE LAYAR
// ==========================================
function tampilkanSemuaTugas() {
    // Bersihkan dulu layar daftar tugas agar tidak menumpuk ganda
    daftarTugas.innerHTML = "";

    // Ulangi proses pembuatan teks tugas untuk setiap data yang ada di dalam kotak penyimpanan
    listTugasLokal.forEach(function(tugas, index) {
        const liBaru = document.createElement('li');
        liBaru.innerHTML = `
            <span>${tugas}</span>
            <button class="tombol-hapus" onclick="hapusTugas(${index})">Hapus</button>
        `;
        daftarTugas.appendChild(liBaru);
    });
}

// ==========================================
// 4. LOGIKA SAAT TOMBOL "TAMBAH" DIKLIK
// ==========================================
tombolTambah.addEventListener('click', function() {
    const teksTugas = inputTugas.value;

    if (teksTugas === "") {
        alert("Silakan ketik tugas terlebih dahulu!");
        return;
    }

    // Masukkan tugas baru yang diketik ke dalam kotak penyimpanan (array)
    listTugasLokal.push(teksTugas);

    // Simpan kotak penyimpanan terbaru ke dalam "laci browser" (LocalStorage)
    localStorage.setItem('tugasSaya', JSON.stringify(listTugasLokal));

    // Perbarui tampilan di layar
    tampilkanSemuaTugas();

    // Kosongkan kembali kotak input
    inputTugas.value = "";
});

// ==========================================
// 5. LOGIKA SAAT TOMBOL "HAPUS" DIKLIK
// ==========================================
function hapusTugas(index) {
    // Hapus 1 data dari kotak penyimpanan berdasarkan urutannya (index)
    listTugasLokal.splice(index, 1);

    // Simpan perubahan terbaru ke dalam "laci browser" (LocalStorage)
    localStorage.setItem('tugasSaya', JSON.stringify(listTugasLokal));

    // Perbarui tampilan di layar
    tampilkanSemuaTugas();
}
