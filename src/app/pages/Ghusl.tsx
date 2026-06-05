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
import { useLanguage } from "../contexts/LanguageContext";

export function Ghusl() {
  const { lang } = useLanguage();

  const sebab = [
    { title: "Keluar Mani", titleEn: "Emission of Semen", description: "Keluarnya air mani dengan syahwat, baik saat tidur maupun terjaga", descriptionEn: "The discharge of seminal fluid with sexual desire, whether while asleep or awake" },
    { title: "Bersetubuh", titleEn: "Sexual Intercourse", description: "Pertemuan dua kemaluan (khitan) meskipun tidak keluar mani", descriptionEn: "The meeting of the two circumcised parts (genitals) even if no semen is emitted" },
    { title: "Haid", titleEn: "Menstruation", description: "Darah yang keluar dari kemaluan wanita pada waktu-waktu tertentu", descriptionEn: "Blood that exits from a woman's private parts at specific times" },
    { title: "Nifas", titleEn: "Postpartum Bleeding", description: "Darah yang keluar setelah melahirkan", descriptionEn: "Blood that exits after childbirth" },
    { title: "Melahirkan", titleEn: "Childbirth", description: "Wanita yang melahirkan wajib mandi meskipun tidak keluar darah", descriptionEn: "A woman who gives birth is obligated to perform ghusl even if no blood is discharged" },
  ];

  const faradh = [
    { title: "Niat", titleEn: "Intention (Niyyah)", description: "Berniat di dalam hati untuk menghilangkan hadas besar", descriptionEn: "To intend in the heart to remove the state of major ritual impurity" },
    { title: "Meratakan Air ke Seluruh Tubuh", titleEn: "Spreading Water Over the Entire Body", description: "Membasuh seluruh badan termasuk rambut dan kulit yang ada di dalamnya", descriptionEn: "Washing the entire body including the hair and the skin beneath it" },
  ];

  const sunnah = [
    { text: "Membaca basmalah", textEn: "Reciting Bismillah" },
    { text: "Mencuci kedua telapak tangan", textEn: "Washing both palms" },
    { text: "Membasuh kemaluan dan tempat yang terkena najis", textEn: "Washing the private parts and areas affected by impurity" },
    { text: "Berwudhu seperti wudhu untuk shalat", textEn: "Performing wudhu as for prayer" },
    { text: "Menyiramkan air ke seluruh tubuh sebanyak tiga kali", textEn: "Pouring water over the entire body three times" },
    { text: "Mendahulukan anggota tubuh yang kanan", textEn: "Starting with the right side of the body" },
    { text: "Mengusap dan menggosok tubuh saat mandi", textEn: "Rubbing and scrubbing the body while bathing" },
  ];

  const tataCara = [
    { step: 1, title: "Niat", titleEn: "Intention (Niyyah)", description: "Niat dalam hati untuk mandi wajib menghilangkan hadas besar", descriptionEn: "Intend in the heart to perform obligatory ghusl to remove major impurity" },
    { step: 2, title: "Basuh Tangan", titleEn: "Wash Hands", description: "Membasuh kedua telapak tangan sebanyak tiga kali", descriptionEn: "Wash both palms three times" },
    { step: 3, title: "Basuh Kemaluan", titleEn: "Wash Private Parts", description: "Membasuh kemaluan dan bagian yang terkena najis dengan tangan kiri", descriptionEn: "Wash the private parts and areas affected by impurity with the left hand" },
    { step: 4, title: "Wudhu", titleEn: "Perform Wudhu", description: "Berwudhu seperti wudhu untuk shalat (boleh tanpa membasuh kaki dulu)", descriptionEn: "Perform wudhu as for prayer (may delay washing the feet)" },
    { step: 5, title: "Siram Kepala", titleEn: "Pour Water Over Head", description: "Menyiramkan air ke kepala tiga kali sambil diratakan hingga ke akar rambut", descriptionEn: "Pour water over the head three times, ensuring it reaches the roots of the hair" },
    { step: 6, title: "Siram Tubuh Kanan", titleEn: "Pour Water Over Right Side", description: "Menyiramkan air ke seluruh tubuh bagian kanan", descriptionEn: "Pour water over the entire right side of the body" },
    { step: 7, title: "Siram Tubuh Kiri", titleEn: "Pour Water Over Left Side", description: "Menyiramkan air ke seluruh tubuh bagian kiri", descriptionEn: "Pour water over the entire left side of the body" },
    { step: 8, title: "Basuh Kaki", titleEn: "Wash Feet", description: "Membasuh kedua kaki hingga mata kaki (jika belum dibasuh saat wudhu)", descriptionEn: "Wash both feet up to the ankles (if not already washed during wudhu)" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <SectionHeader
        imageSrc="/assets/mandi.png"
        title={lang === "en" ? "Obligatory Bath (Ghusl)" : "Mandi Wajib (Ghusl)"}
        description={lang === "en" ? "Obligatory ghusl is purification from major ritual impurity by pouring water over the entire body with intention and prescribed methodology." : "Mandi wajib adalah bersuci dari hadas besar dengan cara mengalirkan air ke seluruh tubuh dengan niat dan tata cara tertentu."}
      />

      {/* Dalil */}
      <DalilBox
        arabic="وَإِن كُنتُمْ جُنُبًا فَٱطَّهَّرُوا۟"
        translation={lang === "en" ? "And if you are in a state of janabah (major impurity), then purify yourselves." : "Dan jika kamu junub (hadas besar), maka mandilah."}
        source="QS. Al-Maidah: 6"
      />

      {/* Sebab-Sebab Wajib Mandi */}
      <SectionCard>
        <SectionTitle icon={ListChecks}>{lang === "en" ? "Reasons Requiring Obligatory Ghusl" : "Sebab-Sebab Wajib Mandi"}</SectionTitle>
        <div className="space-y-3">
          {sebab.map((item, index) => (
            <NumberedStep
              key={index}
              number={index + 1}
              title={lang === "en" ? item.titleEn : item.title}
              description={lang === "en" ? item.descriptionEn : item.description}
            />
          ))}
        </div>
      </SectionCard>

      {/* Faradh Mandi */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>{lang === "en" ? "Obligatory (Pillars) Acts of Ghusl" : "Faradh (Rukun) Mandi Wajib"}</SectionTitle>
        <div className="space-y-3">
          {faradh.map((item, index) => (
            <NumberedStep
              key={index}
              number={index + 1}
              title={lang === "en" ? item.titleEn : item.title}
              description={lang === "en" ? item.descriptionEn : item.description}
            />
          ))}
        </div>
      </SectionCard>

      {/* Tata Cara Mandi */}
      <SectionCard>
        <SectionTitle icon={Sparkles}>{lang === "en" ? "Method of Obligatory Ghusl (Sunnah)" : "Tata Cara Mandi Wajib (Sunnah)"}</SectionTitle>
        <div className="space-y-2.5">
          {tataCara.map((item) => (
            <NumberedStep
              key={item.step}
              number={item.step}
              title={lang === "en" ? item.titleEn : item.title}
              description={lang === "en" ? item.descriptionEn : item.description}
            />
          ))}
        </div>
      </SectionCard>

      {/* Sunnah Mandi */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>{lang === "en" ? "Sunnah Acts of Obligatory Ghusl" : "Sunnah-Sunnah Mandi Wajib"}</SectionTitle>
        <div className="space-y-2">
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

      {/* Permasalahan Khusus */}
      <ScrollReveal>
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={AlertCircle}>{lang === "en" ? "Special Cases Regarding Obligatory Ghusl" : "Permasalahan Khusus Seputar Mandi Wajib"}</SectionTitle>
          <KasusKhususSection
            color="emerald"
            kasus={[
              { icon: HeartPulse, title: lang === "en" ? "Obligatory Ghusl While Ill" : "Mandi Wajib Saat Sakit", desc: lang === "en" ? "If sick and water cannot be used on all or part of the body, perform ghusl as much as possible on the unaffected areas. For the affected area, wipe with water. If completely unable, perform tayammum as a substitute for ghusl." : "Jika sakit dan tidak boleh terkena air pada seluruh atau sebagian tubuh, cukup mandi wajib seadanya pada bagian yang tidak terlarang. Untuk bagian yang sakit, cukup diusap dengan air. Jika tidak memungkinkan sama sekali, bertayammum sebagai pengganti mandi wajib." },
              { icon: Thermometer, title: lang === "en" ? "Obligatory Ghusl with Very Cold Water" : "Mandi Wajib dengan Air Sangat Dingin", desc: lang === "en" ? "If the water is very cold and feared to harm one's health, it may be substituted with tayammum. However, if there is a way to warm the water (e.g., heating it), that must be done first." : "Jika air sangat dingin dan dikhawatirkan membahayakan kesehatan, boleh menggantinya dengan tayammum. Namun jika ada cara untuk menghangatkan air (seperti memanaskan), maka wajib dilakukan terlebih dahulu." },
              { icon: Droplets, title: lang === "en" ? "Obligatory Ghusl with Limited Water" : "Mandi Wajib dengan Air Terbatas", desc: lang === "en" ? "If water is limited, prioritize spreading water over the entire body (the obligation). Sunnah acts such as performing wudhu first may be omitted. Use water as sparingly as possible while ensuring the entire body becomes wet." : "Jika air terbatas, prioritaskan meratakan air ke seluruh tubuh (rukun). Sunnah-sunnah seperti berwudhu terlebih dahulu boleh ditinggalkan. Gunakan air seirit mungkin sambil tetap memastikan seluruh tubuh basah." },
              { icon: Wind, title: lang === "en" ? "Obligatory Ghusl Without Soap or Shampoo" : "Mandi Wajib Tanpa Sabun atau Shampoo", desc: lang === "en" ? "Ghusl remains valid without soap or shampoo, because what is obligatory is only spreading water over the entire body, not cleaning with soap. However, using soap is preferable for hygiene." : "Mandi wajib tetap sah meskipun tanpa sabun atau shampoo, karena yang diwajibkan hanyalah meratakan air ke seluruh tubuh, bukan membersihkan dengan sabun. Namun menggunakan sabun lebih utama untuk kebersihan." },
              { icon: Sparkles, title: lang === "en" ? "Obligatory Ghusl After Surgery or Childbirth" : "Mandi Wajib Setelah Operasi atau Melahirkan", desc: lang === "en" ? "After surgery or childbirth, if the wound is still fresh and cannot be exposed to water, perform ghusl as much as possible. Wash the uninjured parts of the body, and for the wound, simply wipe with water. If even wiping is not possible, perform tayammum for that part." : "Setelah operasi atau melahirkan, jika luka masih basah dan tidak boleh terkena air, cukup mandi wajib seadanya. Basuh tubuh yang tidak terluka, dan untuk luka cukup diusap. Jika usap pun tidak memungkinkan, lakukan tayammum untuk bagian tersebut." },
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
            keterangan: "Ayat tentang perintah mandi wajib bagi yang junub.",
            keteranganEn: "Verse concerning the command of obligatory ghusl for one in a state of janabah.",
            arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ ۚ وَإِنْ كُنْتُمْ جُنُبًا فَاطَّهَّرُوا ۚ وَإِنْ كُنْتُمْ مَرْضَىٰ أَوْ عَلَىٰ سَفَرٍ أَوْ جَاءَ أَحَدٌ مِنْكُمْ مِنَ الْغَائِطِ أَوْ لَامَسْتُمُ النِّسَاءَ فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ مِنْهُ ۚ مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُمْ مِنْ حَرَجٍ وَلَٰكِنْ يُرِيدُ لِيُطَهِّرَكُمْ وَلِيُتِمَّ نِعْمَتَهُ عَلَيْكُمْ لَعَلَّكُمْ تَشْكُرُونَ",
            translation: "Wahai orang-orang yang beriman! Apabila kamu berdiri hendak melaksanakan salat, maka basuhlah wajahmu dan tanganmu sampai ke siku, dan usaplah kepalamu dan (basuh) kedua kakimu sampai ke kedua mata kaki. Jika kamu junub, maka mandilah. Dan jika kamu sakit atau dalam perjalanan atau kembali dari tempat buang air atau menyentuh perempuan, lalu kamu tidak memperoleh air, maka bertayammumlah dengan tanah yang baik (bersih); usaplah wajahmu dan tanganmu dengan (tanah) itu. Allah tidak ingin menyulitkanmu, tetapi Dia hendak membersihkanmu dan menyempurnakan nikmat-Nya bagimu, agar kamu bersyukur.",
            translationEn: "O you who believe! When you stand up to perform prayer, wash your faces and your hands up to the elbows, and wipe your heads and (wash) your feet up to the ankles. If you are in a state of janabah, then purify yourselves. And if you are ill or on a journey or have returned from the place of relieving yourselves or have touched women, and you find no water, then perform tayammum with clean earth — wipe your faces and your hands with it. Allah does not intend to make difficulty for you, but He intends to purify you and complete His favor upon you, so that you may be grateful.",
          },
          {
            title: "Hadist",
            titleEn: "Hadith",
            sumber: "HR. Bukhari, Kitab Al-Ghusl, No. 248",
            sumberEn: "Narrated by Bukhari, Book of Al-Ghusl, No. 248",
            keterangan: "Hadits tentang tata cara mandi junub Nabi ﷺ.",
            keteranganEn: "Hadith concerning the Prophet's ﷺ method of performing ghusl from janabah.",
            arabic: "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِذَا اغْتَسَلَ مِنَ الْجَنَابَةِ بَدَأَ فَغَسَلَ يَدَيْهِ ثُمَّ تَوَضَّأَ كَمَا يَتَوَضَّأُ لِلصَّلَاةِ",
            translation: "Adalah Nabi ﷺ apabila mandi junub, beliau memulai dengan membasuh kedua tangannya, kemudian berwudhu sebagaimana wudhu untuk shalat.",
            translationEn: "When the Prophet ﷺ performed ghusl from janabah, he would begin by washing his hands, then perform wudhu as for prayer.",
          },
          {
            title: "Kitab Syafiiyah",
            titleEn: "Shafi'i Manual",
            sumber: "Fathul Qarib — Syaikh Al-Ghazi, Bab Mandi Wajib",
            sumberEn: "Fathul Qarib — Shaykh Al-Ghazi, Chapter on Obligatory Ghusl",
            keterangan: "Ringkasan fikih Syafi'i tentang mandi wajib, rukun, dan sunnahnya.",
            keteranganEn: "Summary of Shafi'i jurisprudence on obligatory ghusl, its pillars, and its sunnah acts.",
          },
          {
            title: "Ala NU",
            titleEn: "Ala NU",
            sumber: "-",
            sumberEn: "-",
            keterangan: "-",
            keteranganEn: "-",
          },
        ]}
      />

      {/* Catatan Penting */}
      <InfoBox icon={AlertCircle} title={lang === "en" ? "Important Notes" : "Catatan Penting"} variant="warning">
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>{lang === "en" ? "Water must reach the entire body including the roots of the hair and skin folds" : "Air harus sampai ke seluruh tubuh termasuk akar rambut dan lipatan kulit"}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>{lang === "en" ? "If there is nail polish or anything preventing water from reaching the skin, it must be removed first" : "Jika ada cat kuku atau sesuatu yang menghalangi sampainya air ke kulit, harus dihilangkan terlebih dahulu"}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span>{lang === "en" ? "After obligatory ghusl, there is no need to repeat wudhu for prayer (unless something occurs that nullifies wudhu)" : "Setelah mandi wajib, tidak perlu berwudhu lagi untuk shalat (kecuali terjadi hal yang membatalkan wudhu)"}</span>
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
              <h3 className="text-lg font-bold mb-1">{lang === "en" ? "Ghusl Quiz" : "Quiz Mandi Wajib"}</h3>
              <p className="text-sm text-white/80">{lang === "en" ? "Test your understanding of obligatory ghusl material" : "Uji pemahaman Anda tentang materi mandi wajib"}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </ScrollReveal>
    </div>
  );
}
