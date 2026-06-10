import { Trash2, Droplets, BookOpen, ListChecks, ShieldAlert, CheckCircle2, AlertCircle, Smartphone, Shirt, Layout, Eye, BrainCircuit, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import {
  SectionHeader,
  DalilBox,
  SectionCard,
  SectionTitle,
  NumberedStep,
  InfoBox,
  ScrollReveal,
  ChecklistItem,
  KasusKhususSection,
  RujukanSection,
} from "../components/shared";
import { useLanguage } from "../contexts/LanguageContext";

export function Najis() {
  const { lang } = useLanguage();

  const jenisNajis = [
    {
      kategori: "Najis Mukhaffafah (Ringan)",
      kategoriEn: "Mukhaffafah (Light) Impurity",
      penjelasan: "Najis yang paling ringan tingkatannya",
      penjelasanEn: "The lightest level of impurity",
      contoh: ["Kencing bayi laki-laki yang belum makan makanan selain ASI"],
      contohEn: ["Urine of a male infant who has not consumed any food other than breast milk"],
      caraBersih: "Cukup dipercikkan air ke tempat yang terkena najis hingga basah",
      caraBersihEn: "Simply sprinkle water over the affected area until it becomes wet",
    },
    {
      kategori: "Najis Mutawassithah (Sedang)",
      kategoriEn: "Mutawassithah (Moderate) Impurity",
      penjelasan: "Najis yang tingkatannya sedang, paling banyak ditemui",
      penjelasanEn: "The moderate level of impurity, most commonly encountered",
      contoh: [
        "Kencing, tinja, dan darah manusia",
        "Bangkai hewan (kecuali ikan dan belalang)",
        "Darah haid dan nifas",
        "Nanah dan muntah",
        "Air liur anjing",
        "Kotoran hewan yang darahnya mengalir",
      ],
      contohEn: [
        "Human urine, feces, and blood",
        "Carrion of animals (except fish and locusts)",
        "Menstrual and postpartum blood",
        "Pus and vomit",
        "Dog saliva",
        "Excrement of animals whose blood flows",
      ],
      caraBersih: "Dicuci dengan air hingga hilang warna, bau, dan rasanya",
      caraBersihEn: "Wash with water until its color, odor, and taste are removed",
    },
    {
      kategori: "Najis Mughalladzah (Berat)",
      kategoriEn: "Mughalladzah (Heavy) Impurity",
      penjelasan: "Najis yang paling berat tingkatannya",
      penjelasanEn: "The severest level of impurity",
      contoh: ["Jilatan anjing", "Air liur anjing", "Babi dan turunannya"],
      contohEn: ["Dog lick", "Dog saliva", "Pig and its derivatives"],
      caraBersih: "Dicuci 7 kali dengan air, salah satunya dicampur dengan tanah/debu",
      caraBersihEn: "Wash 7 times with water, one of which is mixed with soil/dust",
    },
  ];

  const caraMensucikan = [
    {
      jenis: "Najis pada Pakaian/Benda",
      jenisEn: "Impurity on Clothing/Items",
      langkah: [
        "Hilangkan najis yang masih menempel",
        "Siram dengan air hingga najis hilang",
        "Kucek atau peras hingga bersih",
        "Ulangi hingga air yang keluar sudah bersih",
      ],
      langkahEn: [
        "Remove any remaining impurity still adhering",
        "Pour water over it until the impurity is gone",
        "Scrub or wring until clean",
        "Repeat until the water that comes out is clean",
      ],
    },
    {
      jenis: "Najis pada Tanah/Lantai",
      jenisEn: "Impurity on Soil/Floor",
      langkah: [
        "Hilangkan wujud najis (zat najis)",
        "Siram dengan air hingga bersih",
        "Tidak perlu dikucek jika sudah hilang bekas najisnya",
      ],
      langkahEn: [
        "Remove the physical substance of the impurity",
        "Pour water over it until clean",
        "No need to scrub if the trace of impurity has already disappeared",
      ],
    },
    {
      jenis: "Najis Mughalladzah (Anjing)",
      jenisEn: "Mughalladzah Impurity (Dog)",
      langkah: [
        "Cuci dengan air sebanyak 7 kali",
        "Salah satu cucian dicampur dengan tanah/debu",
        "Lebih afdhal jika tanah pada cucian pertama",
      ],
      langkahEn: [
        "Wash with water 7 times",
        "One of the washes is mixed with soil/dust",
        "It is more virtuous (afdal) if the soil is used in the first wash",
      ],
    },
  ];

  const hukumNajis = [
    { hukum: "Wajib Dihindari", hukumEn: "Obligatory to Avoid", keterangan: "Najis harus dihindari dan tidak boleh terkena badan atau pakaian saat ibadah", keteranganEn: "Impurity must be avoided and must not touch the body or clothing during worship" },
    { hukum: "Wajib Dibersihkan", hukumEn: "Obligatory to Cleanse", keterangan: "Jika najis mengenai badan, pakaian, atau tempat shalat, wajib dibersihkan", keteranganEn: "If impurity touches the body, clothing, or place of prayer, it must be cleansed" },
    { hukum: "Dimaafkan yang Sedikit", hukumEn: "Small Amounts are Pardoned", keterangan: "Najis yang sangat sedikit dan sulit dihindari dimaafkan (menurut sebagian ulama)", keteranganEn: "Very small amounts of impurity that are difficult to avoid are pardoned (according to some scholars)" },
  ];

  const hewan = [
    {
      kategori: "Hewan yang Najis",
      kategoriEn: "Animals that are Impure (Najis)",
      daftar: ["Anjing", "Babi", "Bangkai (kecuali ikan dan belalang)", "Hewan buas bertaring"],
      daftarEn: ["Dog", "Pig", "Carrion (except fish and locusts)", "Fanged wild beasts"],
    },
    {
      kategori: "Hewan yang Suci",
      kategoriEn: "Animals that are Pure (Suci)",
      daftar: ["Ikan dan belalang (meski mati)", "Hewan ternak (sapi, kambing, ayam, dll)", "Kucing", "Hewan laut"],
      daftarEn: ["Fish and locusts (even if dead)", "Livestock (cattle, goats, chickens, etc.)", "Cats", "Sea animals"],
    },
  ];

  const tipsPraktis = [
    { text: "Segera bersihkan najis yang mengenai pakaian atau badan sebelum shalat", textEn: "Immediately clean impurity that touches clothing or the body before prayer" },
    { text: "Pastikan air yang digunakan untuk mensucikan adalah air suci dan mensucikan", textEn: "Ensure the water used for purification is pure (suci) and purifying (mutahhir)" },
    { text: "Cuci hingga hilang warna, bau, dan rasa dari najis tersebut", textEn: "Wash until the color, odor, and taste of the impurity are removed" },
    { text: "Jika ragu apakah sudah bersih atau belum, lebih baik dicuci lagi untuk kepastian", textEn: "If unsure whether it is clean or not, it is better to wash again for certainty" },
    { text: "Khusus najis anjing, pastikan mencuci 7 kali dan salah satunya dengan tanah", textEn: "Specifically for dog impurity, ensure you wash 7 times with one of them using soil" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <SectionHeader
        imageSrc="/assets/najis.png"
        title={lang === "en" ? "Impurity & Purification" : "Najis & Bersuci"}
        description={lang === "en" ? "Impurity is something filthy according to Islamic law (shar') that must be cleansed and avoided in worship. Understanding impurity and how to purify from it is very important in daily life." : "Najis adalah sesuatu yang kotor menurut syara' yang wajib dibersihkan dan dihindari dalam beribadah. Memahami najis dan cara mensucikannya sangat penting dalam kehidupan sehari-hari."}
      />

      {/* Dalil */}
      <DalilBox
        arabic="وَثِيَابَكَ فَطَهِّرْ"
        translation={lang === "en" ? "And your garments purify." : "Dan pakaianmu bersihkanlah."}
        source="QS. Al-Muddatsir: 4"
      />

      {/* Jenis-Jenis Najis */}
      <div className="space-y-4">
        <ScrollReveal>
          <h2 className="text-foreground flex items-center gap-3 mb-2">
            <ListChecks className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {lang === "en" ? "Types of Impurity" : "Jenis-Jenis Najis"}
          </h2>
        </ScrollReveal>
        {jenisNajis.map((jenis, index) => (
          <SectionCard key={index}>
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">{lang === "en" ? jenis.kategoriEn : jenis.kategori}</h3>
                <p className="text-sm text-muted-foreground">{lang === "en" ? jenis.penjelasanEn : jenis.penjelasan}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-2 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {lang === "en" ? "Examples:" : "Contoh:"}
                </h4>
                <ul className="space-y-1.5">
                  {(lang === "en" ? jenis.contohEn : jenis.contoh).map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-red-500 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-foreground mb-2 text-sm flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {lang === "en" ? "Method of Purification:" : "Cara Mensucikan:"}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{lang === "en" ? jenis.caraBersihEn : jenis.caraBersih}</p>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>

      {/* Cara Mensucikan Najis */}
      <SectionCard>
        <SectionTitle icon={Droplets}>{lang === "en" ? "Methods of Purifying from Impurity" : "Cara Mensucikan dari Najis"}</SectionTitle>
        <div className="space-y-6">
          {caraMensucikan.map((cara, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm sm:text-base">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                {lang === "en" ? cara.jenisEn : cara.jenis}
              </h3>
              <div className="ml-9 space-y-2">
                {(lang === "en" ? cara.langkahEn : cara.langkah).map((langkah, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{langkah}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Hukum Najis */}
      <SectionCard>
        <SectionTitle icon={ShieldAlert}>{lang === "en" ? "Rulings Related to Impurity" : "Hukum-Hukum Berkaitan dengan Najis"}</SectionTitle>
        <div className="space-y-3">
          {hukumNajis.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{lang === "en" ? item.hukumEn : item.hukum}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{lang === "en" ? item.keteranganEn : item.keterangan}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Hewan Najis dan Suci */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>{lang === "en" ? "Animals that are Impure and Pure" : "Hewan yang Najis dan Suci"}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hewan.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className={`p-5 rounded-xl border ${
                index === 0
                  ? "bg-red-50/80 dark:bg-red-950/20 border-red-200/50 dark:border-red-800/30"
                  : "bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30"
              }`}>
                <h3 className={`font-semibold mb-3 text-sm sm:text-base ${
                  index === 0 ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"
                }`}>
                  {lang === "en" ? item.kategoriEn : item.kategori}
                </h3>
                <ul className="space-y-2">
                  {(lang === "en" ? item.daftarEn : item.daftar).map((hewanItem, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className={index === 0 ? "text-red-500" : "text-emerald-500"}>•</span>
                      <span>{hewanItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Permasalahan Khusus */}
      <ScrollReveal>
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={AlertCircle}>{lang === "en" ? "Special Issues Concerning Impurity" : "Permasalahan Khusus Seputar Najis"}</SectionTitle>
          <KasusKhususSection
            color="red"
            kasus={[
              { icon: Smartphone, title: lang === "en" ? "Impurity on Mobile Phones or Electronics" : "Najis pada Handphone atau Elektronik", desc: lang === "en" ? "If a mobile phone or electronic device is affected by impurity, it is sufficient to clean it with a damp cloth or tissue until the substance of impurity is removed. Since electronic devices cannot be submerged in water, this method is permissible. Ensure there is no remaining trace of color, odor, or taste of impurity." : "Jika handphone atau perangkat elektronik terkena najis, cukup dibersihkan dengan lap basah atau tisu hingga hilang zat najisnya. Karena perangkat elektronik tidak boleh direndam air, cara ini diperbolehkan. Pastikan tidak ada lagi bekas warna, bau, atau rasa najis." },
              { icon: Shirt, title: lang === "en" ? "Impurity on Modern Synthetic Fabric Clothing" : "Najis pada Pakaian Bahan Sintetis Modern", desc: lang === "en" ? "Clothing made of synthetic materials (polyester, nylon, etc.) must still be purified with water until the impurity is removed. If the material does not easily absorb water, it must still be washed until the entire affected area is reached by water. There is no special concession for any particular type of material." : "Pakaian berbahan sintetis (polyester, nylon, dll.) tetap harus disucikan dengan air hingga hilang najisnya. Jika bahan tersebut sulit menyerap air, tetap harus dibasuh hingga seluruh bagian yang terkena najis terkena air. Tidak ada keringanan khusus untuk jenis bahan tertentu." },
              { icon: Layout, title: lang === "en" ? "Impurity on Mosque or Room Carpets" : "Najis pada Karpet Masjid atau Ruangan", desc: lang === "en" ? "A carpet affected by impurity (e.g., urine or blood) is sufficiently cleansed by pouring water over the affected area until its color, odor, and taste are gone. For mughalladzah impurity (dog), the carpet must be washed 7 times with one of them mixed with soil. A large carpet may be folded at the impure area to facilitate washing." : "Karpet yang terkena najis (misalnya air kencing atau darah) cukup disiram dengan air pada bagian yang terkena hingga hilang warna, bau, dan rasanya. Untuk najis mughalladzah (anjing), karpet harus dicuci 7 kali dengan salah satunya dicampur tanah. Karpet besar boleh dilipat pada bagian najis untuk memudahkan pencucian." },
              { icon: Eye, title: lang === "en" ? "Unseen Impurity (Doubts)" : "Najis yang Tidak Terlihat (Ragu-Ragu)", desc: lang === "en" ? "If one is uncertain whether an object is affected by impurity or not, the original ruling is that it is pure (suci). If one is uncertain whether the impurity is already gone, try to clean it again. Excessive waswasa (obsessive doubt) about impurity should be avoided, because the shari'ah brings ease." : "Jika ragu apakah suatu benda terkena najis atau tidak, maka hukum asalnya adalah suci. Jika ragu apakah najis sudah hilang atau belum, usahakan dibersihkan kembali. Was-was berlebihan tentang najis sebaiknya dihindari, karena syariat memudahkan. Prinsipnya: yakin tidak najis lebih diutamakan daripada ragu najis." },
              { icon: Droplets, title: lang === "en" ? "Impurity in Non-Flowing Water" : "Najis pada Air yang Tidak Mengalir", desc: lang === "en" ? "Water affected by impurity, if its volume is less than 2 qullah (approximately 216 liters), becomes impure if any of its properties change. If the volume reaches 2 qullah or more, and its color, odor, or taste does not change, then the water remains pure. For pond water or a small bathtub affected by impurity, it must be discarded or cleaned." : "Air yang terkena najis jika volumenya kurang dari 2 qullah (sekitar 216 liter) maka menjadi najis jika sifatnya berubah. Jika volume air mencapai 2 qullah atau lebih, dan tidak berubah warna, bau, atau rasanya, maka air tetap suci. Untuk air kolam atau bak mandi kecil yang terkena najis, wajib dibuang atau dibersihkan." },
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
            sumber: "QS. Al-Muddatsir: 4",
            sumberEn: "QS. Al-Muddatsir: 4",
            keterangan: "Perintah membersihkan pakaian dari najis.",
            keteranganEn: "The command to cleanse clothing from impurity.",
            arabic: "وَثِيَابَكَ فَطَهِّرْ",
            translation: "Dan pakaianmu bersihkanlah.",
            translationEn: "And your garments purify.",
          },
          {
            title: "Hadist",
            titleEn: "Hadith",
            sumber: "HR. Muslim, Kitab Ath-Thaharah, No. 545",
            sumberEn: "Narrated by Muslim, Book of Purification, No. 545",
            keterangan: "Hadits tentang cara mensucikan najis anjing.",
            keteranganEn: "Hadith regarding the method of purifying from dog impurity.",
            arabic: "طَهُورُ إِنَاءِ أَحَدِكُمْ إِذَا وَلَغَ فِيهِ الْكَلْبُ أَنْ يَغْسِلَهُ سَبْعَ مَرَّاتٍ أُولَاهُنَّ بِالتُّرَابِ",
            translation: "Cara menyucikan bejana salah seorang di antara kalian yang dijilat anjing adalah dengan mencucinya tujuh kali, yang pertama dengan tanah.",
            translationEn: "The purification of the vessel of one of you when a dog licks it is to wash it seven times, the first of which with soil.",
          },
          {
            title: "Kitab Syafiiyah",
            titleEn: "Shafi'i Manual",
            sumber: "Fathul Qarib — Syaikh Al-Ghazi, Bab Najis dan Hukumnya",
            sumberEn: "Fath al-Qarib — Shaykh Al-Ghazi, Chapter on Impurity and Its Rulings",
            keterangan: "Klasifikasi najis dan cara mensucikannya dalam fikih Syafi'i.",
            keteranganEn: "Classification of impurity and methods of purification in Shafi'i fiqh.",
          },
        ]}
      />

      {/* Tips Praktis */}
      <InfoBox icon={CheckCircle2} title={lang === "en" ? "Practical Tips for Purification from Impurity" : "Tips Praktis dalam Bersuci dari Najis"} variant="tip">
        <ul className="space-y-2">
          {tipsPraktis.map((item, index) => (
            <ChecklistItem key={index}>{lang === "en" ? item.textEn : item.text}</ChecklistItem>
          ))}
        </ul>
      </InfoBox>

      {/* Quiz Button */}
      <ScrollReveal>
        <Link
          to="/quiz/najis"
          className="group block bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
              <img src="/assets/quiz.png" alt="Quiz" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">{lang === "en" ? "Quiz: Impurity & Purification" : "Quiz Najis & Bersuci"}</h3>
              <p className="text-sm text-white/80">{lang === "en" ? "Test your understanding of impurity and purification" : "Uji pemahaman Anda tentang materi najis dan bersuci"}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </ScrollReveal>
    </div>
  );
}
