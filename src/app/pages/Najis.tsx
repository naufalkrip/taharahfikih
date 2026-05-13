import { Trash2, Droplets, BookOpen, ListChecks, ShieldAlert, CheckCircle2, AlertCircle, Smartphone, Shirt, Layout, Eye } from "lucide-react";
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

export function Najis() {
  const jenisNajis = [
    {
      kategori: "Najis Mukhaffafah (Ringan)",
      penjelasan: "Najis yang paling ringan tingkatannya",
      contoh: ["Kencing bayi laki-laki yang belum makan makanan selain ASI"],
      caraBersih: "Cukup dipercikkan air ke tempat yang terkena najis hingga basah",
    },
    {
      kategori: "Najis Mutawassithah (Sedang)",
      penjelasan: "Najis yang tingkatannya sedang, paling banyak ditemui",
      contoh: [
        "Kencing, tinja, dan darah manusia",
        "Bangkai hewan (kecuali ikan dan belalang)",
        "Darah haid dan nifas",
        "Nanah dan muntah",
        "Air liur anjing",
        "Kotoran hewan yang darahnya mengalir",
      ],
      caraBersih: "Dicuci dengan air hingga hilang warna, bau, dan rasanya",
    },
    {
      kategori: "Najis Mughalladzah (Berat)",
      penjelasan: "Najis yang paling berat tingkatannya",
      contoh: ["Jilatan anjing", "Air liur anjing", "Babi dan turunannya"],
      caraBersih: "Dicuci 7 kali dengan air, salah satunya dicampur dengan tanah/debu",
    },
  ];

  const caraMensucikan = [
    {
      jenis: "Najis pada Pakaian/Benda",
      langkah: [
        "Hilangkan najis yang masih menempel",
        "Siram dengan air hingga najis hilang",
        "Kucek atau peras hingga bersih",
        "Ulangi hingga air yang keluar sudah bersih",
      ],
    },
    {
      jenis: "Najis pada Tanah/Lantai",
      langkah: [
        "Hilangkan wujud najis (zat najis)",
        "Siram dengan air hingga bersih",
        "Tidak perlu dikucek jika sudah hilang bekas najisnya",
      ],
    },
    {
      jenis: "Najis Mughalladzah (Anjing)",
      langkah: [
        "Cuci dengan air sebanyak 7 kali",
        "Salah satu cucian dicampur dengan tanah/debu",
        "Lebih afdhal jika tanah pada cucian pertama",
      ],
    },
  ];

  const hukumNajis = [
    { hukum: "Wajib Dihindari", keterangan: "Najis harus dihindari dan tidak boleh terkena badan atau pakaian saat ibadah" },
    { hukum: "Wajib Dibersihkan", keterangan: "Jika najis mengenai badan, pakaian, atau tempat shalat, wajib dibersihkan" },
    { hukum: "Dimaafkan yang Sedikit", keterangan: "Najis yang sangat sedikit dan sulit dihindari dimaafkan (menurut sebagian ulama)" },
  ];

  const hewan = [
    {
      kategori: "Hewan yang Najis",
      daftar: ["Anjing", "Babi", "Bangkai (kecuali ikan dan belalang)", "Hewan buas bertaring"],
    },
    {
      kategori: "Hewan yang Suci",
      daftar: ["Ikan dan belalang (meski mati)", "Hewan ternak (sapi, kambing, ayam, dll)", "Kucing", "Hewan laut"],
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <SectionHeader
        icon={Trash2}
        title="Najis & Bersuci"
        description="Najis adalah sesuatu yang kotor menurut syara' yang wajib dibersihkan dan dihindari dalam beribadah. Memahami najis dan cara mensucikannya sangat penting dalam kehidupan sehari-hari."
      />

      {/* Dalil */}
      <DalilBox
        arabic="وَثِيَابَكَ فَطَهِّرْ"
        translation="Dan pakaianmu bersihkanlah."
        source="QS. Al-Muddatsir: 4"
      />

      {/* Jenis-Jenis Najis */}
      <div className="space-y-4">
        <ScrollReveal>
          <h2 className="text-foreground flex items-center gap-3 mb-2">
            <ListChecks className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Jenis-Jenis Najis
          </h2>
        </ScrollReveal>
        {jenisNajis.map((jenis, index) => (
          <SectionCard key={index}>
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">{jenis.kategori}</h3>
                <p className="text-sm text-muted-foreground">{jenis.penjelasan}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-2 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Contoh:
                </h4>
                <ul className="space-y-1.5">
                  {jenis.contoh.map((item, idx) => (
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
                  Cara Mensucikan:
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{jenis.caraBersih}</p>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>

      {/* Cara Mensucikan Najis */}
      <SectionCard>
        <SectionTitle icon={Droplets}>Cara Mensucikan dari Najis</SectionTitle>
        <div className="space-y-6">
          {caraMensucikan.map((cara, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm sm:text-base">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                {cara.jenis}
              </h3>
              <div className="ml-9 space-y-2">
                {cara.langkah.map((langkah, idx) => (
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
        <SectionTitle icon={ShieldAlert}>Hukum-Hukum Berkaitan dengan Najis</SectionTitle>
        <div className="space-y-3">
          {hukumNajis.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{item.hukum}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.keterangan}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionCard>

      {/* Hewan Najis dan Suci */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>Hewan yang Najis dan Suci</SectionTitle>
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
                  {item.kategori}
                </h3>
                <ul className="space-y-2">
                  {item.daftar.map((hewan, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className={index === 0 ? "text-red-500" : "text-emerald-500"}>•</span>
                      <span>{hewan}</span>
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
          <SectionTitle icon={AlertCircle}>Permasalahan Khusus Seputar Najis</SectionTitle>
          <KasusKhususSection
            color="red"
            kasus={[
              { icon: Smartphone, title: "Najis pada Handphone atau Elektronik", desc: "Jika handphone atau perangkat elektronik terkena najis, cukup dibersihkan dengan lap basah atau tisu hingga hilang zat najisnya. Karena perangkat elektronik tidak boleh direndam air, cara ini diperbolehkan. Pastikan tidak ada lagi bekas warna, bau, atau rasa najis." },
              { icon: Shirt, title: "Najis pada Pakaian Bahan Sintetis Modern", desc: "Pakaian berbahan sintetis (polyester, nylon, dll.) tetap harus disucikan dengan air hingga hilang najisnya. Jika bahan tersebut sulit menyerap air, tetap harus dibasuh hingga seluruh bagian yang terkena najis terkena air. Tidak ada keringanan khusus untuk jenis bahan tertentu." },
              { icon: Layout, title: "Najis pada Karpet Masjid atau Ruangan", desc: "Karpet yang terkena najis (misalnya air kencing atau darah) cukup disiram dengan air pada bagian yang terkena hingga hilang warna, bau, dan rasanya. Untuk najis mughalladzah (anjing), karpet harus dicuci 7 kali dengan salah satunya dicampur tanah. Karpet besar boleh dilipat/digulung pada bagian najis untuk memudahkan pencucian." },
              { icon: Eye, title: "Najis yang Tidak Terlihat (Ragu-Ragu)", desc: "Jika ragu apakah suatu benda terkena najis atau tidak, maka hukum asalnya adalah suci. Jika ragu apakah najis sudah hilang atau belum, usahakan dibersihkan kembali. Was-was berlebihan tentang najis sebaiknya dihindari, karena syariat memudahkan. Prinsipnya: yakin tidak najis lebih diutamakan daripada ragu najis." },
              { icon: Droplets, title: "Najis pada Air yang Tidak Mengalir", desc: "Air yang terkena najis jika volumenya kurang dari 2 qullah (sekitar 216 liter) maka menjadi najis jika sifatnya berubah. Jika volume air mencapai 2 qullah atau lebih, dan tidak berubah warna, bau, atau rasanya, maka air tetap suci. Untuk air kolam atau bak mandi kecil yang terkena najis, wajib dibuang atau dibersihkan." },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Daftar Rujukan */}
      <RujukanSection
        rujukan={[
          { title: "Al-Qur'an Al-Karim", sumber: "QS. Al-Muddatsir: 4", keterangan: "Perintah membersihkan pakaian dari najis." },
          { title: "Al-Qur'an Al-Karim", sumber: "QS. Al-Anfal: 11", keterangan: "Air sebagai alat bersuci dan menghilangkan kotoran." },
          { title: "Shahih Al-Bukhari", sumber: "Kitab Al-Wudhu', No. 174-180", keterangan: "Hadits tentang air yang terkena najis dan cara mensucikannya." },
          { title: "Shahih Muslim", sumber: "Kitab Ath-Thaharah, No. 545-567", keterangan: "Hadits tentang najis anjing dan cara mensucikan (7x + tanah)." },
          { title: "Sunan Abu Dawud", sumber: "Kitab Ath-Thaharah, No. 33-41", keterangan: "Hadits tentang najis mukhaffafah (kencing bayi) dan cara membersihkannya." },
          { title: "Sunan An-Nasa'i", sumber: "Kitab Ath-Thaharah, No. 293-305", keterangan: "Hadits tentang jenis-jenis najis dan tata cara bersuci." },
          { title: "Fathul Qarib — Syaikh Al-Ghazi", sumber: "Bab Najis dan Hukumnya", keterangan: "Klasifikasi najis dan cara mensucikannya dalam fikih Syafi'i." },
          { title: "Al-Fiqh Al-Islami — Dr. Wahbah Az-Zuhaili", sumber: "Juz 1, Bab An-Najasah", keterangan: "Perbandingan mazhab tentang najis, jenis, dan hukum-hukumnya." },
        ]}
      />

      {/* Tips Praktis */}
      <InfoBox icon={CheckCircle2} title="Tips Praktis dalam Bersuci dari Najis" variant="tip">
        <ul className="space-y-2">
          <ChecklistItem>Segera bersihkan najis yang mengenai pakaian atau badan sebelum shalat</ChecklistItem>
          <ChecklistItem>Pastikan air yang digunakan untuk mensucikan adalah air suci dan mensucikan</ChecklistItem>
          <ChecklistItem>Cuci hingga hilang warna, bau, dan rasa dari najis tersebut</ChecklistItem>
          <ChecklistItem>Jika ragu apakah sudah bersih atau belum, lebih baik dicuci lagi untuk kepastian</ChecklistItem>
          <ChecklistItem>Khusus najis anjing, pastikan mencuci 7 kali dan salah satunya dengan tanah</ChecklistItem>
        </ul>
      </InfoBox>
    </div>
  );
}
