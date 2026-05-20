import { Wind, Info, BookOpen, ListChecks, ShieldAlert, AlertCircle, Car, Plane, Snowflake, Clock, MapPin, BrainCircuit, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import {
  SectionHeader,
  DalilBox,
  SectionCard,
  SectionTitle,
  NumberedStep,
  InfoBox,
  ScrollReveal,
  KasusKhususSection,
  RujukanSection,
} from "../components/shared";

export function Tayammum() {
  const syarat = [
    "Tidak menemukan air atau air yang ada tidak cukup untuk wudhu atau mandi",
    "Tidak mampu menggunakan air karena sakit yang akan bertambah parah",
    "Air sangat dingin dan tidak ada alat untuk memanaskannya serta dikhawatirkan membahayakan",
    "Air ada tapi untuk kebutuhan yang lebih mendesak (minum untuk diri sendiri atau orang lain/hewan)",
    "Sudah masuk waktu shalat dan khawatir waktu habis jika mencari air",
  ];

  const rukun = [
    { title: "Niat", description: "Berniat di dalam hati untuk menghilangkan hadas dengan tayammum" },
    { title: "Mengusap Wajah", description: "Mengusap seluruh wajah dengan debu suci" },
    { title: "Mengusap Kedua Tangan", description: "Mengusap kedua tangan hingga siku dengan debu suci" },
    { title: "Tertib", description: "Melakukan rukun secara berurutan sesuai urutannya" },
  ];

  const tataCara = [
    { step: 1, title: "Niat", description: "Niat dalam hati untuk tayammum menghilangkan hadas kecil atau hadas besar" },
    { step: 2, title: "Membaca Basmalah", description: "Membaca 'Bismillahirrahmanirrahim' (sunnah)" },
    { step: 3, title: "Memukulkan Kedua Telapak Tangan", description: "Memukulkan kedua telapak tangan ke tanah/debu suci satu kali" },
    { step: 4, title: "Mengusap Wajah", description: "Mengusap seluruh wajah dengan kedua telapak tangan yang berdebu" },
    { step: 5, title: "Memukulkan Tangan Lagi", description: "Memukulkan kedua telapak tangan ke tanah/debu sekali lagi (sunnah)" },
    { step: 6, title: "Mengusap Tangan Kanan", description: "Mengusap tangan kanan dari ujung jari sampai siku dengan tangan kiri" },
    { step: 7, title: "Mengusap Tangan Kiri", description: "Mengusap tangan kiri dari ujung jari sampai siku dengan tangan kanan" },
  ];

  const pembatal = [
    "Semua hal yang membatalkan wudhu",
    "Menemukan air (jika sebelumnya tidak ada air)",
    "Hilangnya uzur yang membolehkan tayammum (misalnya sembuh dari sakit)",
    "Keluar waktu shalat (menurut sebagian ulama)",
  ];

  const mediaTayammum = [
    { nama: "Tanah", keterangan: "Media utama dan paling utama untuk tayammum" },
    { nama: "Pasir", keterangan: "Boleh digunakan untuk tayammum" },
    { nama: "Batu", keterangan: "Boleh digunakan jika tidak ada tanah atau pasir" },
    { nama: "Debu di Dinding/Permadani", keterangan: "Boleh jika ada debu yang menempel dan tidak ada media lain" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <SectionHeader
        imageSrc="/assets/tayamum.png"
        title="Tayammum"
        description="Tayammum adalah bersuci dengan menggunakan debu (tanah) suci sebagai pengganti air dalam kondisi-kondisi tertentu yang dibenarkan syariat."
      />

      {/* Dalil */}
      <DalilBox
        arabic="فَلَمْ تَجِدُوا مَآءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَٱمْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُم مِّنْهُ"
        translation="Maka jika kamu tidak memperoleh air, maka bertayammumlah dengan tanah yang baik (suci); usaplah wajahmu dan tanganmu dengan tanah itu."
        source="QS. Al-Maidah: 6"
      />

      {/* Syarat Boleh Tayammum */}
      <SectionCard>
        <SectionTitle icon={ListChecks}>Syarat Boleh Tayammum</SectionTitle>
        <div className="space-y-2.5">
          {syarat.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="flex gap-3 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground flex-1 leading-relaxed">{item}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Rukun Tayammum */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>Rukun Tayammum</SectionTitle>
        <div className="space-y-3">
          {rukun.map((item, index) => (
            <NumberedStep
              key={index}
              number={index + 1}
              title={item.title}
              description={item.description}
              color="amber"
            />
          ))}
        </div>
      </SectionCard>

      {/* Tata Cara */}
      <SectionCard>
        <SectionTitle icon={Wind}>Tata Cara Tayammum</SectionTitle>
        <div className="space-y-2.5">
          {tataCara.map((item) => (
            <NumberedStep
              key={item.step}
              number={item.step}
              title={item.title}
              description={item.description}
              color="amber"
            />
          ))}
        </div>
      </SectionCard>

      {/* Media Tayammum */}
      <SectionCard>
        <SectionTitle icon={Info}>Media yang Boleh untuk Tayammum</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mediaTayammum.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-colors duration-200">
                <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{item.nama}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.keterangan}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Pembatal Tayammum */}
      <SectionCard>
        <SectionTitle icon={ShieldAlert}>Hal-Hal yang Membatalkan Tayammum</SectionTitle>
        <ul className="space-y-2.5">
          {pembatal.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2" />
              <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Permasalahan Khusus */}
      <ScrollReveal>
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={AlertCircle}>Permasalahan Khusus Seputar Tayammum</SectionTitle>
          <KasusKhususSection
            color="amber"
            kasus={[
              { icon: Car, title: "Tayammum Saat di Kendaraan", desc: "Jika sedang dalam perjalanan dengan mobil, kereta, atau bus dan tidak ada air atau tidak memungkinkan turun untuk mencari air, maka bertayammumlah dengan debu yang ada di sekitar atau debu yang menempel di kursi/jok kendaraan. Usapkan ke wajah dan tangan sebagai pengganti wudhu." },
              { icon: Plane, title: "Tayammum di Pesawat Terbang", desc: "Di pesawat, jika tidak ada air untuk wudhu atau khawatir ketinggalan shalat, tayammum boleh dilakukan. Media yang bisa digunakan adalah debu di dinding toilet pesawat, atau jika tersedia tanah/debu dari kantong khusus. Jika benar-benar tidak ada debu, sebagian ulama membolehkan bertayammum dengan permukaan bersih sebagai darurat." },
              { icon: Snowflake, title: "Tayammum di Daerah Dingin (Salju)", desc: "Di daerah bersalju, jika air sangat dingin dan tidak ada alat untuk memanaskannya, dan dikhawatirkan membahayakan jika terkena air, maka bertayammum diperbolehkan. Tayammum bisa dilakukan dengan debu atau jika tidak ada tanah, cukup dengan salju (menurut sebagian ulama) atau batu bersih." },
              { icon: Clock, title: "Tayammum Karena Waktu Sempit", desc: "Jika waktu shalat hampir habis dan mencari air akan menyebabkan shalat terlewat, maka bertayammum diperbolehkan. Namun jika air ada di dekat tempat shalat, tetap wajib berwudhu. Tayammum karena khawatir kehabisan waktu hanya berlaku jika benar-benar tidak ada air di sekitar." },
              { icon: MapPin, title: "Tayammum di Penjara atau Tempat Terbatas", desc: "Bagi yang berada di penjara, ruang isolasi, atau tempat terbatas lainnya di mana air tidak tersedia, tayammum boleh dilakukan dengan debu yang ada di lantai atau dinding. Jika ruangan benar-benar bersih tanpa debu, sebagian ulama membolehkan tayammum dengan permukaan dinding." },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Daftar Rujukan */}
      <RujukanSection
        rujukan={[
          { title: "Al-Qur'an Al-Karim", sumber: "QS. Al-Maidah: 6", keterangan: "Ayat utama tentang tayammum sebagai pengganti wudhu dan mandi.", arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ ۚ وَإِنْ كُنْتُمْ جُنُبًا فَاطَّهَّرُوا ۚ وَإِنْ كُنْتُمْ مَرْضَىٰ أَوْ عَلَىٰ سَفَرٍ أَوْ جَاءَ أَحَدٌ مِنْكُمْ مِنَ الْغَائِطِ أَوْ لَامَسْتُمُ النِّسَاءَ فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ مِنْهُ ۚ مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُمْ مِنْ حَرَجٍ وَلَٰكِنْ يُرِيدُ لِيُطَهِّرَكُمْ وَلِيُتِمَّ نِعْمَتَهُ عَلَيْكُمْ لَعَلَّكُمْ تَشْكُرُونَ", translation: "Wahai orang-orang yang beriman! Apabila kamu berdiri hendak melaksanakan salat, maka basuhlah wajahmu dan tanganmu sampai ke siku, dan usaplah kepalamu dan (basuh) kedua kakimu sampai ke kedua mata kaki. Jika kamu junub, maka mandilah. Dan jika kamu sakit atau dalam perjalanan atau kembali dari tempat buang air atau menyentuh perempuan, lalu kamu tidak memperoleh air, maka bertayammumlah dengan tanah yang baik (bersih); usaplah wajahmu dan tanganmu dengan (tanah) itu. Allah tidak ingin menyulitkanmu, tetapi Dia hendak membersihkanmu dan menyempurnakan nikmat-Nya bagimu, agar kamu bersyukur." },
          { title: "Shahih Al-Bukhari", sumber: "Kitab At-Tayammum, No. 334-368", keterangan: "Hadits-hadits tentang tayammum, syarat dan tata caranya.", arabic: "عَنْ عَائِشَةَ قَالَتْ: فَقَدْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ لَيْلَةً فَخَرَجْتُ أَطْلُبُهُ فَإِذَا هُوَ بِالْبَقِيعِ فَقَالَ: أَتَخَافِينَ أَنْ يَحِيفَ اللَّهُ عَلَيْكِ وَرَسُولُهُ؟ قُلْتُ: يَا رَسُولَ اللَّهِ ظَنَنْتُ أَنَّكَ أَتَيْتَ بَعْضَ نِسَائِكَ. فَقَالَ: إِنَّ اللَّهَ يَنْزِلُ لَيْلَةَ النِّصْفِ مِنْ شَعْبَانَ", translation: "Barangsiapa berwudhu lalu membaguskan wudhunya, maka diampuni dosa-dosanya. Dan jika ia bertayammum dengan debu yang baik lalu mengusap wajah dan tangannya, maka Allah mengampuni dosa-dosanya. (HR. Bukhari)" },
          { title: "Shahih Muslim", sumber: "Kitab Al-Haidh, No. 717-735", keterangan: "Hadits tentang tayammum dan hal-hal yang membatalkannya.", arabic: "جُعِلَتْ لِي الْأَرْضُ مَسْجِدًا وَطَهُورًا", translation: "Dijadikan untukku bumi sebagai masjid (tempat shalat) dan alat bersuci (tayammum). (HR. Muslim)" },
          { title: "Sunan Abu Dawud", sumber: "Kitab Ath-Thaharah, No. 316-340", keterangan: "Hadits tentang media tayammum dan tata caranya.", arabic: "التَّيَمُّمُ ضَرْبَةٌ لِلْوَجْهِ وَالْكَفَّيْنِ", translation: "Tayammum itu satu kali tepukan untuk wajah dan kedua telapak tangan. (HR. Abu Dawud)" },
          { title: "Bidayah Al-Mujtahid — Ibnu Rusyd", sumber: "Kitab At-Tayammum", keterangan: "Perbandingan pendapat ulama tentang syarat dan rukun tayammum." },
          { title: "Al-Fiqh 'ala Al-Madzahib Al-Arba'ah", sumber: "Bab At-Tayammum", keterangan: "Panduan tayammum menurut empat mazhab." },
          { title: "Fathul Qarib — Syaikh Al-Ghazi", sumber: "Bab At-Tayammum", keterangan: "Ringkasan fikih Syafi'i tentang tayammum dan tata caranya." },
          { title: "Minhajul Muslim — Syaikh Abu Bakr Al-Jazairi", sumber: "Kitab At-Tayammum", keterangan: "Panduan praktis tayammum berdasarkan Al-Qur'an dan Hadits." },
        ]}
      />

      {/* Info Tambahan */}
      <InfoBox icon={Info} title="Informasi Penting" variant="info">
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Tayammum hanya membolehkan untuk satu kali shalat fardhu atau beberapa shalat sunnah</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Jika menemukan air, maka tayammum batal dan wajib berwudhu dengan air</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Tayammum dapat menggantikan wudhu maupun mandi wajib</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Niat tayammum harus disesuaikan dengan kebutuhan (untuk hadas kecil atau hadas besar)</span>
          </li>
        </ul>
      </InfoBox>

      {/* Quiz Button */}
      <ScrollReveal>
        <Link
          to="/quiz/tayammum"
          className="group block bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
              <img src="/assets/quiz.png" alt="Quiz" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">Quiz Tayammum</h3>
              <p className="text-sm text-white/80">Uji pemahaman Anda tentang materi tayammum</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </ScrollReveal>
    </div>
  );
}
