import { Droplets, CheckCircle2, XCircle, AlertCircle, BookOpen, ListChecks, ShieldAlert, HeartPulse, Hand, Wind, PaintBucket, BrainCircuit, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import {
  SectionHeader,
  DalilBox,
  SectionCard,
  SectionTitle,
  NumberedStep,
  ListWithIcons,
  InfoBox,
  ScrollReveal,
  KasusKhususSection,
  RujukanSection,
} from "../components/shared";
import { useLanguage } from "../contexts/LanguageContext";

export function Wudhu() {
  const { lang } = useLanguage();

  const syarat = [
    { text: "Islam", textEn: "Islam" },
    { text: "Berakal (tidak gila)", textEn: "Sane (of sound mind)" },
    { text: "Tamyiz (sudah dapat membedakan baik dan buruk)", textEn: "Tamyiz (able to distinguish right from wrong)" },
    { text: "Air yang digunakan suci dan mensucikan", textEn: "The water used is pure and purifying" },
    { text: "Tidak ada yang menghalangi sampainya air ke kulit", textEn: "Nothing prevents water from reaching the skin" },
    { text: "Mengetahui atau sudah masuk waktu shalat (untuk wudhu shalat)", textEn: "Knowledge that or entering the prayer time (for wudhu before prayer)" },
  ];

  const faradh = [
    { title: "Niat", titleEn: "Intention", description: "Berniat di dalam hati ketika akan memulai wudhu", descriptionEn: "Intending in the heart when beginning wudhu" },
    { title: "Membasuh Wajah", titleEn: "Washing the Face", description: "Membasuh seluruh wajah dari batas rambut hingga dagu dan dari telinga ke telinga", descriptionEn: "Washing the entire face from the hairline to the chin and from ear to ear" },
    { title: "Membasuh Kedua Tangan", titleEn: "Washing Both Hands", description: "Membasuh kedua tangan hingga siku", descriptionEn: "Washing both hands up to the elbows" },
    { title: "Mengusap Kepala", titleEn: "Wiping the Head", description: "Mengusap sebagian atau seluruh kepala", descriptionEn: "Wiping part or all of the head" },
    { title: "Membasuh Kedua Kaki", titleEn: "Washing Both Feet", description: "Membasuh kedua kaki hingga mata kaki", descriptionEn: "Washing both feet up to the ankles" },
    { title: "Tertib", titleEn: "Order (Sequence)", description: "Melakukan rukun wudhu secara berurutan sesuai urutan di atas", descriptionEn: "Performing the pillars of wudhu in order according to the sequence above" },
  ];

  const sunnah = [
    { text: "Membaca basmalah di awal wudhu", textEn: "Reciting Basmalah at the beginning of wudhu" },
    { text: "Membasuh kedua telapak tangan tiga kali", textEn: "Washing both palms three times" },
    { text: "Berkumur-kumur tiga kali", textEn: "Rinsing the mouth three times" },
    { text: "Istinsyaq (memasukkan air ke hidung) tiga kali", textEn: "Istinshaq (sniffing water into the nose) three times" },
    { text: "Mengusap kedua telinga", textEn: "Wiping both ears" },
    { text: "Mendahulukan anggota yang kanan", textEn: "Starting with the right limbs" },
    { text: "Membasuh setiap anggota tiga kali", textEn: "Washing each limb three times" },
    { text: "Membaca doa setelah wudhu", textEn: "Reciting the supplication after wudhu" },
  ];

  const pembatal = [
    { text: "Keluar sesuatu dari qubul (kemaluan) dan dubur", textEn: "Anything exiting from the front (private parts) and the anus" },
    { text: "Hilang akal karena gila, pingsan, atau mabuk", textEn: "Loss of intellect due to insanity, unconsciousness, or intoxication" },
    { text: "Tidur dengan tidak duduk yang kukuh (tidak tegak/stabil)", textEn: "Sleeping while not seated firmly (not upright/stable)" },
    { text: "Menyentuh kemaluan dengan telapak tangan", textEn: "Touching the private parts with the palm of the hand" },
    { text: "Bersentuhan kulit antara laki-laki dan perempuan yang bukan mahram", textEn: "Skin contact between a man and a woman who are not mahram" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <SectionHeader
        imageSrc="/assets/wudhu.png"
        title={lang === "en" ? "Wudhu (Ablution)" : "Wudhu"}
        description={lang === "en" ? "Wudhu is purification from minor impurity by using water on specific body parts in the prescribed manner and conditions." : "Wudhu adalah bersuci dari hadas kecil dengan menggunakan air pada anggota tubuh tertentu dengan cara dan syarat yang telah ditentukan."}
      />

      {/* Dalil */}
      <DalilBox
        arabic="يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ"
        translation={lang === "en" ? "O you who believe! When you intend to perform prayer, wash your faces and your hands up to the elbows, and wipe your heads and (wash) your feet up to the ankles." : "Wahai orang-orang yang beriman! Apabila kamu hendak melaksanakan shalat, maka basuhlah wajahmu dan tanganmu sampai siku, dan sapulah kepalamu dan (basuhlah) kedua kakimu sampai kedua mata kaki."}
        source="QS. Al-Maidah: 6"
      />

      {/* Syarat Wudhu */}
      <SectionCard>
        <SectionTitle icon={ListChecks}>{lang === "en" ? "Conditions of Wudhu" : "Syarat Wudhu"}</SectionTitle>
        <ListWithIcons icon={CheckCircle2} items={syarat.map(s => lang === "en" ? s.textEn : s.text)} color="emerald" />
      </SectionCard>

      {/* Faradh (Rukun) Wudhu */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>{lang === "en" ? "Obligations (Pillars) of Wudhu" : "Faradh (Rukun) Wudhu"}</SectionTitle>
        <div className="space-y-3">
          {faradh.map((item, index) => (
            <NumberedStep
              key={index}
              number={index + 1}
              title={lang === "en" ? item.titleEn : item.title}
              description={lang === "en" ? item.descriptionEn : item.description}
              color="blue"
            />
          ))}
        </div>
      </SectionCard>

      {/* Sunnah Wudhu */}
      <SectionCard>
        <SectionTitle icon={SparkleIcon}>{lang === "en" ? "Sunnahs of Wudhu" : "Sunnah-Sunnah Wudhu"}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {sunnah.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.03}>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors duration-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{lang === "en" ? item.textEn : item.text}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Pembatal Wudhu */}
      <SectionCard>
        <SectionTitle icon={ShieldAlert}>{lang === "en" ? "Nullifiers of Wudhu" : "Hal-Hal yang Membatalkan Wudhu"}</SectionTitle>
        <ListWithIcons icon={XCircle} items={pembatal.map(p => lang === "en" ? p.textEn : p.text)} color="red" />
      </SectionCard>

      {/* Permasalahan Khusus */}
      <ScrollReveal>
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={AlertCircle}>{lang === "en" ? "Special Issues Regarding Wudhu" : "Permasalahan Khusus Seputar Wudhu"}</SectionTitle>
          <KasusKhususSection
            color="blue"
            kasus={[
              { icon: HeartPulse, title: lang === "en" ? "Wudhu with Wounds or Injuries" : "Wudhu Saat Luka atau Terluka", desc: lang === "en" ? "If there is a wound that cannot be exposed to water, then it is sufficient to wash the healthy wudhu limbs. For the wounded part, it is sufficient to wipe it with water, or if not possible, it may be substituted with tayammum on that part. If all wudhu limbs are wounded and cannot be exposed to water, then perform tayammum." : "Jika terdapat luka dan tidak boleh terkena air, maka cukup dibasuh anggota wudhu yang sehat. Untuk bagian yang luka, cukup diusap dengan air atau jika tidak memungkinkan, boleh diganti dengan tayammum pada bagian tersebut. Jika seluruh anggota wudhu terluka dan tidak memungkinkan terkena air, maka bertayammumlah." },
              { icon: PaintBucket, title: lang === "en" ? "Wudhu with Nail Polish or Nail Paint" : "Wudhu dengan Cat Kuku atau Kutek", desc: lang === "en" ? "Nail polish, nail paint, or other substances that cover the nail surface are barriers preventing water from reaching the nail. If not removed, wudhu is invalid because water does not reach the nails. It is obligatory to remove them first before performing wudhu." : "Cat kuku, kutek, atau bahan lain yang menutupi permukaan kuku termasuk penghalang sampainya air (mani'). Jika tidak dihilangkan, maka wudhu tidak sah karena air tidak sampai ke kuku. Wajib menghilangkannya terlebih dahulu sebelum berwudhu." },
              { icon: Hand, title: lang === "en" ? "Wudhu with Oily or Creamy Skin" : "Wudhu dengan Kulit Berminyak atau Berkrim", desc: lang === "en" ? "If oil or cream only sticks to the surface and does not form a thick layer preventing water, then wudhu is valid. However, if it forms a layer covering the pores and preventing water (waterproof), it must be removed first." : "Jika minyak atau krim hanya menempel di permukaan dan tidak membentuk lapisan tebal yang menghalangi air, maka wudhu tetap sah. Namun jika membentuk lapisan yang menutupi pori-pori dan menghalangi air (waterproof), wajib dihilangkan terlebih dahulu." },
              { icon: Wind, title: lang === "en" ? "Wudhu with Limited or Emergency Water" : "Wudhu dengan Air Terbatas atau Darurat", desc: lang === "en" ? "In conditions of very limited water, use only as much water as needed to wash each wudhu limb. If water is only sufficient for some limbs, prioritize the obligatory (pillar) ones. If there is no water at all, then perform tayammum as a substitute." : "Dalam kondisi air sangat terbatas, gunakan air seperlunya untuk membasuh setiap anggota wudhu. Jika air hanya cukup untuk sebagian anggota, dahulukan yang wajib (rukun). Jika tidak ada air sama sekali, maka bertayammum sebagai gantinya." },
              { icon: Droplets, title: lang === "en" ? "Wudhu While Traveling (Musafir)" : "Wudhu Saat Bepergian (Musafir)", desc: lang === "en" ? "A traveler is still obligated to perform wudhu as usual. If it is difficult to find clean water during the journey, tayammum is permissible. On public transportation such as airplanes or trains, if it is difficult to access the restroom, perform wudhu with whatever is available or delay until reaching a suitable place, as long as the prayer time still remains." : "Musafir tetap wajib berwudhu seperti biasa. Jika kesulitan mencari air bersih di perjalanan, boleh bertayammum. Di kendaraan umum seperti pesawat atau kereta, jika sulit ke toilet, usahakan wudhu seadanya atau tunda hingga sampai tempat yang memungkinkan, selama waktu shalat masih ada." },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Daftar Rujukan */}
      <RujukanSection
        rujukan={[
          {
            title: "Al-Qur'an",
            titleEn: "Al-Qur'an",
            sumber: "QS. Al-Maidah: 6",
            sumberEn: "QS. Al-Maidah: 6",
            keterangan: "Ayat utama tentang perintah wudhu dan tayammum.",
            keteranganEn: "Main verse on the command of wudhu and tayammum.",
            arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ ۚ وَإِنْ كُنْتُمْ جُنُبًا فَاطَّهَّرُوا ۚ وَإِنْ كُنْتُمْ مَرْضَىٰ أَوْ عَلَىٰ سَفَرٍ أَوْ جَاءَ أَحَدٌ مِنْكُمْ مِنَ الْغَائِطِ أَوْ لَامَسْتُمُ النِّسَاءَ فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ مِنْهُ ۚ مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُمْ مِنْ حَرَجٍ وَلَٰكِنْ يُرِيدُ لِيُطَهِّرَكُمْ وَلِيُتِمَّ نِعْمَتَهُ عَلَيْكُمْ لَعَلَّكُمْ تَشْكُرُونَ",
            translation: "Wahai orang-orang yang beriman! Apabila kamu berdiri hendak melaksanakan salat, maka basuhlah wajahmu dan tanganmu sampai ke siku, dan usaplah kepalamu dan (basuh) kedua kakimu sampai ke kedua mata kaki. Jika kamu junub, maka mandilah. Dan jika kamu sakit atau dalam perjalanan atau kembali dari tempat buang air atau menyentuh perempuan, lalu kamu tidak memperoleh air, maka bertayammumlah dengan tanah yang baik (bersih); usaplah wajahmu dan tanganmu dengan (tanah) itu. Allah tidak ingin menyulitkanmu, tetapi Dia hendak membersihkanmu dan menyempurnakan nikmat-Nya bagimu, agar kamu bersyukur.",
            translationEn: "O you who believe! When you stand up to perform prayer, wash your faces and your hands up to the elbows, and wipe your heads and (wash) your feet up to the ankles. If you are in a state of janabah, then purify yourselves. And if you are ill or on a journey or have returned from the place of relieving yourselves or have touched women, and you find no water, then perform tayammum with clean earth — wipe your faces and your hands with it. Allah does not intend to make difficulty for you, but He intends to purify you and complete His favor upon you, so that you may be grateful.",
          },
          {
            title: "Hadist",
            titleEn: "Hadith",
            sumber: "HR. Bukhari, Kitab Al-Wudhu', No. 135",
            sumberEn: "Narrated by Bukhari, Book of Al-Wudhu', No. 135",
            keterangan: "Hadits tentang kewajiban wudhu sebelum shalat.",
            keteranganEn: "Hadith on the obligation of wudhu before prayer.",
            arabic: "لَا تُقْبَلُ صَلَاةُ مَنْ أَحْدَثَ حَتَّى يَتَوَضَّأَ",
            translation: "Tidak diterima shalat seseorang yang berhadas sampai ia berwudhu.",
            translationEn: "The prayer of one who is in a state of hadath is not accepted until he performs wudhu.",
          },
          {
            title: "Kitab Syafiiyah",
            titleEn: "Shafi'i Book",
            sumber: "Fathul Qarib — Syaikh Al-Ghazi, Bab Thaharah",
            sumberEn: "Fathul Qarib — Sheikh Al-Ghazi, Chapter of Thaharah",
            keterangan: "Ringkasan fikih Syafi'i tentang wudhu dan tata caranya.",
            keteranganEn: "Summary of Shafi'i jurisprudence on wudhu and its procedures.",
          },
          {
            title: "Ala NU",
            titleEn: "NU Online",
            sumber: "-",
            sumberEn: "-",
            keterangan: "-",
            keteranganEn: "-",
          },
        ]}
      />

      {/* Doa Setelah Wudhu */}
      <ScrollReveal>
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 dark:bg-blue-700/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {lang === "en" ? "Supplication After Wudhu" : "Doa Setelah Wudhu"}
              </h3>
            </div>
            <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-blue-200/50 dark:border-blue-700/30">
              <p className="text-center leading-loose text-lg sm:text-xl text-foreground mb-4 font-arabic">
                أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ
              </p>
              <div className="border-t border-blue-200/50 dark:border-blue-700/30 pt-4">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic">
                  {lang === "en" ? '"I bear witness that there is no god except Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger."' : '"Aku bersaksi bahwa tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Quiz Button */}
      <ScrollReveal>
        <Link
          to="/quiz/wudhu"
          className="group block bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
              <img src="/assets/quiz.png" alt="Quiz" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">{lang === "en" ? "Wudhu Quiz" : "Quiz Wudhu"}</h3>
              <p className="text-sm text-white/80">{lang === "en" ? "Test your understanding of wudhu material" : "Uji pemahaman Anda tentang materi wudhu"}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </ScrollReveal>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}
