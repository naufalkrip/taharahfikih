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
import { useLanguage } from "../contexts/LanguageContext";

export function Tayammum() {
  const { lang } = useLanguage();

  const syarat = [
    { text: "Tidak menemukan air atau air yang ada tidak cukup untuk wudhu atau mandi", textEn: "Cannot find water or the available water is insufficient for wudhu or ghusl" },
    { text: "Tidak mampu menggunakan air karena sakit yang akan bertambah parah", textEn: "Unable to use water due to illness that would worsen" },
    { text: "Air sangat dingin dan tidak ada alat untuk memanaskannya serta dikhawatirkan membahayakan", textEn: "Water is extremely cold with no means to heat it, and there is fear of harm" },
    { text: "Air ada tapi untuk kebutuhan yang lebih mendesak (minum untuk diri sendiri atau orang lain/hewan)", textEn: "Water is present but needed for a more urgent necessity (drinking for oneself, others, or animals)" },
    { text: "Sudah masuk waktu shalat dan khawatir waktu habis jika mencari air", textEn: "Prayer time has already begun and there is fear the time will expire if one searches for water" },
  ];

  const rukun = [
    { title: "Niat", titleEn: "Intention", description: "Berniat di dalam hati untuk menghilangkan hadas dengan tayammum", descriptionEn: "To intend in the heart to remove the state of ritual impurity through tayammum" },
    { title: "Mengusap Wajah", titleEn: "Wiping the Face", description: "Mengusap seluruh wajah dengan debu suci", descriptionEn: "Wiping the entire face with pure earth" },
    { title: "Mengusap Kedua Tangan", titleEn: "Wiping Both Hands", description: "Mengusap kedua tangan hingga siku dengan debu suci", descriptionEn: "Wiping both hands up to the elbows with pure earth" },
    { title: "Tertib", titleEn: "Order (Sequence)", description: "Melakukan rukun secara berurutan sesuai urutannya", descriptionEn: "Performing the pillars in sequential order" },
  ];

  const tataCara = [
    { step: 1, title: "Niat", titleEn: "Intention", description: "Niat dalam hati untuk tayammum menghilangkan hadas kecil atau hadas besar", descriptionEn: "Intention in the heart for tayammum to remove minor or major ritual impurity" },
    { step: 2, title: "Membaca Basmalah", titleEn: "Reciting Basmalah", description: "Membaca 'Bismillahirrahmanirrahim' (sunnah)", descriptionEn: "Reciting 'Bismillahirrahmanirrahim' (sunnah)" },
    { step: 3, title: "Memukulkan Kedua Telapak Tangan", titleEn: "Striking Both Palms", description: "Memukulkan kedua telapak tangan ke tanah/debu suci satu kali", descriptionEn: "Striking both palms onto pure earth/soil once" },
    { step: 4, title: "Mengusap Wajah", titleEn: "Wiping the Face", description: "Mengusap seluruh wajah dengan kedua telapak tangan yang berdebu", descriptionEn: "Wiping the entire face with both dusty palms" },
    { step: 5, title: "Memukulkan Tangan Lagi", titleEn: "Striking the Hands Again", description: "Memukulkan kedua telapak tangan ke tanah/debu sekali lagi (sunnah)", descriptionEn: "Striking both palms onto earth/soil once more (sunnah)" },
    { step: 6, title: "Mengusap Tangan Kanan", titleEn: "Wiping the Right Hand", description: "Mengusap tangan kanan dari ujung jari sampai siku dengan tangan kiri", descriptionEn: "Wiping the right hand from fingertips to elbow with the left hand" },
    { step: 7, title: "Mengusap Tangan Kiri", titleEn: "Wiping the Left Hand", description: "Mengusap tangan kiri dari ujung jari sampai siku dengan tangan kanan", descriptionEn: "Wiping the left hand from fingertips to elbow with the right hand" },
  ];

  const pembatal = [
    { text: "Semua hal yang membatalkan wudhu", textEn: "Everything that nullifies wudhu" },
    { text: "Menemukan air (jika sebelumnya tidak ada air)", textEn: "Finding water (if it was previously unavailable)" },
    { text: "Hilangnya uzur yang membolehkan tayammum (misalnya sembuh dari sakit)", textEn: "Removal of the excuse that permitted tayammum (e.g. recovery from illness)" },
    { text: "Keluar waktu shalat (menurut sebagian ulama)", textEn: "Departure of the prayer time (according to some scholars)" },
  ];

  const mediaTayammum = [
    { nama: "Tanah", namaEn: "Soil", keterangan: "Media utama dan paling utama untuk tayammum", keteranganEn: "Primary and most excellent medium for tayammum" },
    { nama: "Pasir", namaEn: "Sand", keterangan: "Boleh digunakan untuk tayammum", keteranganEn: "Permissible to use for tayammum" },
    { nama: "Batu", namaEn: "Stone", keterangan: "Boleh digunakan jika tidak ada tanah atau pasir", keteranganEn: "Permissible if no soil or sand is available" },
    { nama: "Debu di Dinding/Permadani", namaEn: "Dust on Walls/Carpets", keterangan: "Boleh jika ada debu yang menempel dan tidak ada media lain", keteranganEn: "Permissible if dust is present and no other medium is available" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <SectionHeader
        imageSrc="/assets/tayamum.png"
        title={lang === "en" ? "Tayammum" : "Tayammum"}
        description={lang === "en" ? "Tayammum is purification using pure dust (soil) as a substitute for water under certain conditions permitted by Islamic law." : "Tayammum adalah bersuci dengan menggunakan debu (tanah) suci sebagai pengganti air dalam kondisi-kondisi tertentu yang dibenarkan syariat."}
      />

      {/* Dalil */}
      <DalilBox
        arabic="فَلَمْ تَجِدُوا مَآءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَٱمْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُم مِّنْهُ"
        translation={lang === "en" ? "Then if you do not find water, perform tayammum with clean (pure) soil; wipe your faces and your hands with it." : "Maka jika kamu tidak memperoleh air, maka bertayammumlah dengan tanah yang baik (suci); usaplah wajahmu dan tanganmu dengan tanah itu."}
        source="QS. Al-Maidah: 6"
      />

      {/* Syarat Boleh Tayammum */}
      <SectionCard>
        <SectionTitle icon={ListChecks}>{lang === "en" ? "Conditions for Permissibility of Tayammum" : "Syarat Boleh Tayammum"}</SectionTitle>
        <div className="space-y-2.5">
          {syarat.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="flex gap-3 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground flex-1 leading-relaxed">{lang === "en" ? item.textEn : item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Rukun Tayammum */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>{lang === "en" ? "Pillars of Tayammum" : "Rukun Tayammum"}</SectionTitle>
        <div className="space-y-3">
          {rukun.map((item, index) => (
            <NumberedStep
              key={index}
              number={index + 1}
              title={lang === "en" ? item.titleEn : item.title}
              description={lang === "en" ? item.descriptionEn : item.description}
              color="amber"
            />
          ))}
        </div>
      </SectionCard>

      {/* Tata Cara */}
      <SectionCard>
        <SectionTitle icon={Wind}>{lang === "en" ? "Procedure of Tayammum" : "Tata Cara Tayammum"}</SectionTitle>
        <div className="space-y-2.5">
          {tataCara.map((item) => (
            <NumberedStep
              key={item.step}
              number={item.step}
              title={lang === "en" ? item.titleEn : item.title}
              description={lang === "en" ? item.descriptionEn : item.description}
              color="amber"
            />
          ))}
        </div>
      </SectionCard>

      {/* Media Tayammum */}
      <SectionCard>
        <SectionTitle icon={Info}>{lang === "en" ? "Permissible Media for Tayammum" : "Media yang Boleh untuk Tayammum"}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mediaTayammum.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-colors duration-200">
                <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{lang === "en" ? item.namaEn : item.nama}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{lang === "en" ? item.keteranganEn : item.keterangan}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Pembatal Tayammum */}
      <SectionCard>
        <SectionTitle icon={ShieldAlert}>{lang === "en" ? "Nullifiers of Tayammum" : "Hal-Hal yang Membatalkan Tayammum"}</SectionTitle>
        <ul className="space-y-2.5">
          {pembatal.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2" />
              <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{lang === "en" ? item.textEn : item.text}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Permasalahan Khusus */}
      <ScrollReveal>
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={AlertCircle}>{lang === "en" ? "Special Cases Regarding Tayammum" : "Permasalahan Khusus Seputar Tayammum"}</SectionTitle>
          <KasusKhususSection
            color="amber"
            kasus={[
              { icon: Car, title: lang === "en" ? "Tayammum While in a Vehicle" : "Tayammum Saat di Kendaraan", desc: lang === "en" ? "If you are traveling by car, train, or bus and there is no water or it is not possible to get off to search for water, then perform tayammum with the dust available around you or dust on the vehicle's seats. Wipe it over your face and hands as a substitute for wudhu." : "Jika sedang dalam perjalanan dengan mobil, kereta, atau bus dan tidak ada air atau tidak memungkinkan turun untuk mencari air, maka bertayammumlah dengan debu yang ada di sekitar atau debu yang menempel di kursi/jok kendaraan. Usapkan ke wajah dan tangan sebagai pengganti wudhu." },
              { icon: Plane, title: lang === "en" ? "Tayammum on an Airplane" : "Tayammum di Pesawat Terbang", desc: lang === "en" ? "On a plane, if there is no water for wudhu or you fear missing the prayer, tayammum is permissible. Usable media include dust on the airplane toilet walls, or if available, soil/dust from a special pouch. If absolutely no dust exists, some scholars permit tayammum on a clean surface as an emergency." : "Di pesawat, jika tidak ada air untuk wudhu atau khawatir ketinggalan shalat, tayammum boleh dilakukan. Media yang bisa digunakan adalah debu di dinding pesawat, atau jika tersedia tanah/debu dari kantong khusus. Jika benar-benar tidak ada debu, sebagian ulama membolehkan bertayammum dengan permukaan bersih sebagai darurat." },
              { icon: Snowflake, title: lang === "en" ? "Tayammum in Cold Regions (Snow)" : "Tayammum di Daerah Dingin (Salju)", desc: lang === "en" ? "In snowy regions, if the water is extremely cold with no means to heat it and there is fear of harm from using water, then tayammum is permitted. Tayammum may be performed with dust, or if no soil is available, with snow (according to some scholars) or a clean stone." : "Di daerah bersalju, jika air sangat dingin dan tidak ada alat untuk memanaskannya, dan dikhawatirkan membahayakan jika terkena air, maka bertayammum diperbolehkan. Tayammum bisa dilakukan dengan debu atau jika tidak ada tanah, cukup dengan salju (menurut sebagian ulama) atau batu bersih." },
              { icon: Clock, title: lang === "en" ? "Tayammum Due to Constricted Time" : "Tayammum Karena Waktu Sempit", desc: lang === "en" ? "If the prayer time is almost over and searching for water would cause the prayer to be missed, then tayammum is permitted. However, if water is available near the place of prayer, wudhu remains obligatory. Tayammum due to fear of the time expiring only applies if there is truly no water nearby." : "Jika waktu shalat hampir habis dan mencari air akan menyebabkan shalat terlewat, maka bertayammum diperbolehkan. Namun jika air ada di dekat tempat shalat, tetap wajib berwudhu. Tayammum karena khawatir kehabisan waktu hanya berlaku jika benar-benar tidak ada air di sekitar." },
              { icon: MapPin, title: lang === "en" ? "Tayammum in Prison or Confined Spaces" : "Tayammum di Penjara atau Tempat Terbatas", desc: lang === "en" ? "For those in prison, isolation rooms, or other confined spaces where water is unavailable, tayammum may be performed with dust on the floor or walls. If the room is completely clean with no dust, some scholars permit tayammum on the wall surface." : "Bagi yang berada di penjara, ruang isolasi, atau tempat terbatas lainnya di mana air tidak tersedia, tayammum boleh dilakukan dengan debu yang ada di lantai atau dinding. Jika ruangan benar-benar bersih tanpa debu, sebagian ulama membolehkan tayammum dengan permukaan dinding." },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Daftar Rujukan */}
      <RujukanSection
        rujukan={[
          {
            title: "Al-Qur'an",
            titleEn: "The Qur'an",
            sumber: "QS. Al-Maidah: 6",
            sumberEn: "QS. Al-Maidah: 6",
            keterangan: "Ayat utama tentang tayammum sebagai pengganti wudhu dan mandi.",
            keteranganEn: "The primary verse on tayammum as a substitute for wudhu and ghusl.",
            arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ ۚ وَإِنْ كُنْتُمْ جُنُبًا فَاطَّهَّرُوا ۚ وَإِنْ كُنْتُمْ مَرْضَىٰ أَوْ عَلَىٰ سَفَرٍ أَوْ جَاءَ أَحَدٌ مِنْكُمْ مِنَ الْغَائِطِ أَوْ لَامَسْتُمُ النِّسَاءَ فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ مِنْهُ ۚ مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُمْ مِنْ حَرَجٍ وَلَٰكِنْ يُرِيدُ لِيُطَهِّرَكُمْ وَلِيُتِمَّ نِعْمَتَهُ عَلَيْكُمْ لَعَلَّكُمْ تَشْكُرُونَ",
            translation: "Wahai orang-orang yang beriman! Apabila kamu berdiri hendak melaksanakan salat, maka basuhlah wajahmu dan tanganmu sampai ke siku, dan usaplah kepalamu dan (basuh) kedua kakimu sampai ke kedua mata kaki. Jika kamu junub, maka mandilah. Dan jika kamu sakit atau dalam perjalanan atau kembali dari tempat buang air atau menyentuh perempuan, lalu kamu tidak memperoleh air, maka bertayammumlah dengan tanah yang baik (bersih); usaplah wajahmu dan tanganmu dengan (tanah) itu. Allah tidak ingin menyulitkanmu, tetapi Dia hendak membersihkanmu dan menyempurnakan nikmat-Nya bagimu, agar kamu bersyukur.",
            translationEn: "O you who believe! When you stand up to perform prayer, wash your faces and your hands up to the elbows, and wipe your heads and (wash) your feet up to the ankles. If you are in a state of janabah, then purify yourselves. And if you are ill or on a journey or have returned from the place of relieving yourselves or have touched women, and you find no water, then perform tayammum with clean earth — wipe your faces and your hands with it. Allah does not intend to make difficulty for you, but He intends to purify you and complete His favor upon you, so that you may be grateful.",
          },
          {
            title: "Hadist",
            titleEn: "Hadith",
            sumber: "HR. Muslim, Kitab Al-Haidh, No. 717",
            sumberEn: "Narrated by Muslim, Book of Menstruation, No. 717",
            keterangan: "Hadits tentang bumi sebagai alat bersuci (tayammum).",
            keteranganEn: "Hadith regarding the earth as a means of purification (tayammum).",
            arabic: "جُعِلَتْ لِي الْأَرْضُ مَسْجِدًا وَطَهُورًا",
            translation: "Dijadikan untukku bumi sebagai masjid (tempat shalat) dan alat bersuci (tayammum).",
            translationEn: "The earth has been made for me a place of prayer and a means of purification (tayammum).",
          },
          {
            title: "Kitab Syafiiyah",
            titleEn: "Shafi'i Book",
            sumber: "Fathul Qarib — Syaikh Al-Ghazi, Bab At-Tayammum",
            sumberEn: "Fathul Qarib — Sheikh Al-Ghazi, Chapter on Tayammum",
            keterangan: "Ringkasan fikih Syafi'i tentang tayammum dan tata caranya.",
            keteranganEn: "Summary of Shafi'i jurisprudence on tayammum and its procedure.",
          },
        ]}
      />

      {/* Info Tambahan */}
      <InfoBox icon={Info} title={lang === "en" ? "Important Information" : "Informasi Penting"} variant="info">
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>{lang === "en" ? "Tayammum only permits one obligatory prayer or several supererogatory prayers" : "Tayammum hanya membolehkan untuk satu kali shalat fardhu atau beberapa shalat sunnah"}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>{lang === "en" ? "If water is found, tayammum is nullified and wudhu with water is obligatory" : "Jika menemukan air, maka tayammum batal dan wajib berwudhu dengan air"}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>{lang === "en" ? "Tayammum can substitute for both wudhu and obligatory ghusl" : "Tayammum dapat menggantikan wudhu maupun mandi wajib"}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>{lang === "en" ? "The intention for tayammum must be adjusted according to need (for minor or major ritual impurity)" : "Niat tayammum harus disesuaikan dengan kebutuhan (untuk hadas kecil atau hadas besar)"}</span>
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
              <h3 className="text-lg font-bold mb-1">{lang === "en" ? "Tayammum Quiz" : "Quiz Tayammum"}</h3>
              <p className="text-sm text-white/80">{lang === "en" ? "Test your understanding of the tayammum material" : "Uji pemahaman Anda tentang materi tayammum"}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </ScrollReveal>
    </div>
  );
}
