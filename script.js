
const openButton = document.getElementById("openInvitation");
const invitation = document.getElementById("invitation");

// Buka undangan
openButton.addEventListener("click", () => {
  invitation.classList.remove("d-none");

  invitation.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Countdown menuju hari pernikahan
// Format: tahun, bulan (0 = Januari), tanggal, jam, menit
const weddingDate = new Date(2026, 11, 20, 8, 0, 0).getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;
  const message = document.getElementById("countdownMessage");

  if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "0";
    });

    message.textContent =
      "Hari bahagia telah tiba. Terima kasih atas doa Anda!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (distance / 1000) % 60
  );

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  message.textContent = "Kami menantikan kehadiran Anda.";
}

updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP melalui WhatsApp
document.getElementById("rsvpForm").addEventListener(
  "submit",
  function(event) {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const attendance = document.getElementById("attendance").value;
    const count = document.getElementById("guestCount").value;

    if (!name || !attendance || !count) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    // Ganti dengan nomor WhatsApp pemilik undangan.
    // Gunakan kode negara tanpa tanda +, spasi, atau strip.
    const phoneNumber = "6281234567890";

    const message =
      `Assalamu'alaikum, saya ${name}.\n` +
      `Konfirmasi kehadiran: ${attendance}.\n` +
      `Jumlah tamu: ${count} orang.\n` +
      `Terima kasih atas undangannya.`;

    const whatsappURL =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  }
);
