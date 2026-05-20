import { Sparkles, AlertCircle, BookOpen, ListChecks, ShieldAlert, HeartPulse, Thermometer, Droplets, Wind, BrainCircuit, ArrowRight } from "lucide-react";
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

export function Ghusl() {
  const sebab = [
    { title: "Keluar Mani", description: "Keluarnya air mani dengan syahwat (lust), baik saat tidur maupun terjaga" },
    { title: "Bersetubuh", description: "Pertemuan dua kemaluan (khitan) meskipun tidak keluar mani" },
    { title: "Haid", description: "Darah yang keluar dari kemaluan wanita pada waktu-waktu tertentu" },
    { title: "Nifas", description: "Darah yang keluar setelah melahirkan" },
    { title: "Melahirkan", description: "Wanita yang melahirkan wajib mandi meskipun tidak keluar darah" },
  ];

  const faradh = [
    { title: "Niat", description: "Berniat di dalam hati untuk menghilangkan hadas besar" },
    { title: "Meratakan Air ke Seluruh Tubuh", description: "Membasuh seluruh badan termasuk rambut dan kulit yang ada di dalamnya" },
  ];

  const sunnah = [
    "Membaca basmalah",
    "Mencuci kedua telapak tangan",
    "Membasuh kemaluan dan tempat yang terkena najis",
    "Berwudhu seperti wudhu untuk shalat",
    "Menyiramkan air ke seluruh tubuh sebanyak tiga kali",
    "Mendahulukan anggota tubuh yang kanan",
    "Mengusap dan menggosok tubuh saat mandi",
  ];

  const tataCara = [
    { step: 1, title: "Niat", description: "Niat dalam hati untuk mandi wajib menghilangkan hadas besar" },
    { step: 2, title: "Basuh Tangan", description: "Membasuh kedua telapak tangan sebanyak tiga kali" },
    { step: 3, title: "Basuh Kemaluan", description: "Membasuh kemaluan dan bagian yang terkena najis dengan tangan kiri" },
    { step: 4, title: "Wudhu", description: "Berwudhu seperti wudhu untuk shalat (boleh tanpa membasuh kaki dulu)" },
    { step: 5, title: "Siram Kepala", description: "Menyiramkan air ke kepala tiga kali sambil diratakan hingga ke akar rambut" },
    { step: 6, title: "Siram Tubuh Kanan", description: "Menyiramkan air ke seluruh tubuh bagian kanan" },
    { step: 7, title: "Siram Tubuh Kiri", description: "Menyiramkan air ke seluruh tubuh bagian kiri" },
    { step: 8, title: "Basuh Kaki", description: "Membasuh kedua kaki hingga mata kaki (jika belum dibasuh saat wudhu)" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <SectionHeader
        imageSrc="/assets/mandi.png"
        title="Mandi Wajib (Ghusl)"
        description="Mandi wajib adalah bersuci dari hadas besar dengan cara mengalirkan air ke seluruh tubuh dengan niat dan tata cara tertentu."
      />

      {/* Dalil */}
      <DalilBox
        arabic="وَإِن كُنتُمْ جُنُبًا فَٱطَّهَّرُوا۟"
        translation="Dan jika kamu junub (hadas besar), maka mandilah."
        source="QS. Al-Maidah: 6"
      />

      {/* Sebab-Sebab Wajib Mandi */}
      <SectionCard>
        <SectionTitle icon={ListChecks}>Sebab-Sebab Wajib Mandi</SectionTitle>
        <div className="space-y-3">
          {sebab.map((item, index) => (
            <NumberedStep
              key={index}
              number={index + 1}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </SectionCard>

      {/* Faradh Mandi */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>Faradh (Rukun) Mandi Wajib</SectionTitle>
        <div className="space-y-3">
          {faradh.map((item, index) => (
            <NumberedStep
              key={index}
              number={index + 1}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </SectionCard>

      {/* Tata Cara Mandi */}
      <SectionCard>
        <SectionTitle icon={Sparkles}>Tata Cara Mandi Wajib (Sunnah)</SectionTitle>
        <div className="space-y-2.5">
          {tataCara.map((item) => (
            <NumberedStep
              key={item.step}
              number={item.step}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </SectionCard>

      {/* Sunnah Mandi */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>Sunnah-Sunnah Mandi Wajib</SectionTitle>
        <div className="space-y-2">
          {sunnah.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.03}>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors duration-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Permasalahan Khusus */}
      <ScrollReveal>
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={AlertCircle}>Permasalahan Khusus Seputar Mandi Wajib</SectionTitle>
          <KasusKhususSection
            color="emerald"
            kasus={[
              { icon: HeartPulse, title: "Mandi Wajib Saat Sakit", desc: "Jika sakit dan tidak boleh terkena air pada seluruh atau sebagian tubuh, cukup mandi wajib seadanya pada bagian yang tidak terlarang. Untuk bagian yang sakit, cukup diusap dengan air. Jika tidak memungkinkan sama sekali, bertayammum sebagai pengganti mandi wajib." },
              { icon: Thermometer, title: "Mandi Wajib dengan Air Sangat Dingin", desc: "Jika air sangat dingin dan dikhawatirkan membahayakan kesehatan, boleh menggantinya dengan tayammum. Namun jika ada cara untuk menghangatkan air (seperti memanaskan), maka wajib dilakukan terlebih dahulu." },
              { icon: Droplets, title: "Mandi Wajib dengan Air Terbatas", desc: "Jika air terbatas, prioritaskan meratakan air ke seluruh tubuh (rukun). Sunnah-sunnah seperti berwudhu terlebih dahulu boleh ditinggalkan. Gunakan air seirit mungkin sambil tetap memastikan seluruh tubuh basah." },
              { icon: Wind, title: "Mandi Wajib Tanpa Sabun atau Shampoo", desc: "Mandi wajib tetap sah meskipun tanpa sabun atau shampoo, karena yang diwajibkan hanyalah meratakan air ke seluruh tubuh, bukan membersihkan dengan sabun. Namun menggunakan sabun lebih utama untuk kebersihan." },
              { icon: Sparkles, title: "Mandi Wajib Setelah Operasi atau Melahirkan", desc: "Setelah operasi atau melahirkan, jika luka masih basah dan tidak boleh terkena air, cukup mandi wajib seadanya. Basuh tubuh yang tidak terluka, dan untuk luka cukup diusap. Jika usap pun tidak memungkinkan, lakukan tayammum untuk bagian tersebut." },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Daftar Rujukan */}
      <RujukanSection
        rujukan={[
          { title: "Al-Qur'an Al-Karim", sumber: "QS. Al-Maidah: 6", keterangan: "Ayat tentang perintah mandi wajib bagi yang junub.", arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ ۚ وَإِنْ كُنْتُمْ جُنُبًا فَاطَّهَّرُوا ۚ وَإِنْ كُنْتُمْ مَرْضَىٰ أَوْ عَلَىٰ سَفَرٍ أَوْ جَاءَ أَحَدٌ مِنْكُمْ مِنَ الْغَائِطِ أَوْ لَامَسْتُمُ النِّسَاءَ فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ مِنْهُ ۚ مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُمْ مِنْ حَرَجٍ وَلَٰكِنْ يُرِيدُ لِيُطَهِّرَكُمْ وَلِيُتِمَّ نِعْمَتَهُ عَلَيْكُمْ لَعَلَّكُمْ تَشْكُرُونَ", translation: "Wahai orang-orang yang beriman! Apabila kamu berdiri hendak melaksanakan salat, maka basuhlah wajahmu dan tanganmu sampai ke siku, dan usaplah kepalamu dan (basuh) kedua kakimu sampai ke kedua mata kaki. Jika kamu junub, maka mandilah. Dan jika kamu sakit atau dalam perjalanan atau kembali dari tempat buang air atau menyentuh perempuan, lalu kamu tidak memperoleh air, maka bertayammumlah dengan tanah yang baik (bersih); usaplah wajahmu dan tanganmu dengan (tanah) itu. Allah tidak ingin menyulitkanmu, tetapi Dia hendak membersihkanmu dan menyempurnakan nikmat-Nya bagimu, agar kamu bersyukur." },
          { title: "Shahih Al-Bukhari", sumber: "Kitab Al-Ghusl, No. 248-295", keterangan: "Hadits-hadits tentang tata cara mandi wajib dan sebab-sebabnya.", arabic: "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِذَا اغْتَسَلَ مِنَ الْجَنَابَةِ بَدَأَ فَغَسَلَ يَدَيْهِ ثُمَّ تَوَضَّأَ كَمَا يَتَوَضَّأُ لِلصَّلَاةِ", translation: "Adalah Nabi ﷺ apabila mandi junub, beliau memulai dengan membasuh kedua tangannya, kemudian berwudhu sebagaimana wudhu untuk shalat. (HR. Bukhari)" },
          { title: "Shahih Muslim", sumber: "Kitab Al-Haidh, No. 445-615", keterangan: "Hadits tentang mandi wajib, haid, nifas, dan tata caranya.", arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", translation: "Sesungguhnya amal itu tergantung niatnya, dan setiap orang hanya mendapatkan apa yang ia niatkan. (HR. Muslim)" },
          { title: "Sunan Abu Dawud", sumber: "Kitab Ath-Thaharah, No. 246-367", keterangan: "Hadits detail tentang rukun dan sunnah mandi wajib.", arabic: "إِذَا جَلَسَ بَيْنَ شُعَبِهَا الْأَرْبَعِ ثُمَّ جَهَدَهَا فَقَدْ وَجَبَ الْغُسْلُ", translation: "Apabila seorang laki-laki duduk di antara empat cabang (anggota) istrinya lalu bersungguh-sungguh, maka sungguh telah wajib mandi. (HR. Abu Dawud)" },
          { title: "Sunan Ibnu Majah", sumber: "Kitab Ath-Thaharah, No. 588-650", keterangan: "Hadits tentang sebab-sebab mandi wajib dan keutamaannya.", arabic: "إِنَّ الْمُؤْمِنَ لَا يَنْجُسُ حَيًّا وَلَا مَيِّتًا", translation: "Sesungguhnya seorang mukmin tidak najis, baik hidup maupun mati. (HR. Ibnu Majah)" },
          { title: "Fathul Qarib — Syaikh Al-Ghazi", sumber: "Bab Mandi Wajib", keterangan: "Ringkasan fikih Syafi'i tentang mandi wajib, rukun, dan sunnahnya." },
          { title: "Al-Fiqh Al-Islami — Dr. Wahbah Az-Zuhaili", sumber: "Juz 1, Bab Ath-Thaharah", keterangan: "Perbandingan mazhab tentang mandi wajib, sebab, dan tata caranya." },
          { title: "Minhajul Muslim — Syaikh Abu Bakr Al-Jazairi", sumber: "Kitab Ath-Thaharah", keterangan: "Panduan lengkap mandi wajib berdasarkan dalil Al-Qur'an dan Sunnah." },
        ]}
      />

      {/* Catatan Penting */}
      <InfoBox icon={AlertCircle} title="Catatan Penting" variant="warning">
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>Air harus sampai ke seluruh tubuh termasuk akar rambut dan lipatan kulit</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>Jika ada cat kuku atau sesuatu yang menghalangi sampainya air ke kulit, harus dihilangkan terlebih dahulu</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>Setelah mandi wajib, tidak perlu berwudhu lagi untuk shalat (kecuali terjadi hal yang membatalkan wudhu)</span>
          </li>
        </ul>
      </InfoBox>

      {/* Quiz Button */}
      <ScrollReveal>
        <Link
          to="/quiz/ghusl"
          className="group block bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
              <img src="/assets/quiz.png" alt="Quiz" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">Quiz Mandi Wajib</h3>
              <p className="text-sm text-white/80">Uji pemahaman Anda tentang materi mandi wajib</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </ScrollReveal>
    </div>
  );
}
