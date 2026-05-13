import { Droplets, CheckCircle2, XCircle, AlertCircle, BookOpen, ListChecks, ShieldAlert, HeartPulse, Hand, Wind, PaintBucket } from "lucide-react";
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

export function Wudhu() {
  const syarat = [
    "Islam",
    "Berakal (tidak gila)",
    "Tamyiz (sudah dapat membedakan baik dan buruk)",
    "Air yang digunakan suci dan mensucikan",
    "Tidak ada yang menghalangi sampainya air ke kulit",
    "Mengetahui atau sudah masuk waktu shalat (untuk wudhu shalat)",
  ];

  const faradh = [
    { title: "Niat", description: "Berniat di dalam hati ketika akan memulai wudhu" },
    { title: "Membasuh Wajah", description: "Membasuh seluruh wajah dari batas rambut hingga dagu dan dari telinga ke telinga" },
    { title: "Membasuh Kedua Tangan", description: "Membasuh kedua tangan hingga siku" },
    { title: "Mengusap Kepala", description: "Mengusap sebagian atau seluruh kepala" },
    { title: "Membasuh Kedua Kaki", description: "Membasuh kedua kaki hingga mata kaki" },
    { title: "Tertib", description: "Melakukan rukun wudhu secara berurutan sesuai urutan di atas" },
  ];

  const sunnah = [
    "Membaca basmalah di awal wudhu",
    "Membasuh kedua telapak tangan tiga kali",
    "Berkumur-kumur tiga kali",
    "Istinsyaq (memasukkan air ke hidung) tiga kali",
    "Mengusap kedua telinga",
    "Mendahulukan anggota yang kanan",
    "Membasuh setiap anggota tiga kali",
    "Membaca doa setelah wudhu",
  ];

  const pembatal = [
    "Keluar sesuatu dari qubul (kemaluan) dan dubur",
    "Hilang akal karena gila, pingsan, atau mabuk",
    "Tidur dengan tidak duduk yang kukuh (tidak tegak/stabil)",
    "Menyentuh kemaluan dengan telapak tangan",
    "Bersentuhan kulit antara laki-laki dan perempuan yang bukan mahram",
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <SectionHeader
        icon={Droplets}
        title="Wudhu"
        description="Wudhu adalah bersuci dari hadas kecil dengan menggunakan air pada anggota tubuh tertentu dengan cara dan syarat yang telah ditentukan."
      />

      {/* Dalil */}
      <DalilBox
        arabic="يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ"
        translation="Wahai orang-orang yang beriman! Apabila kamu hendak melaksanakan shalat, maka basuhlah wajahmu dan tanganmu sampai siku, dan sapulah kepalamu dan (basuhlah) kedua kakimu sampai kedua mata kaki."
        source="QS. Al-Maidah: 6"
      />

      {/* Syarat Wudhu */}
      <SectionCard>
        <SectionTitle icon={ListChecks}>Syarat Wudhu</SectionTitle>
        <ListWithIcons icon={CheckCircle2} items={syarat} color="emerald" />
      </SectionCard>

      {/* Faradh (Rukun) Wudhu */}
      <SectionCard>
        <SectionTitle icon={BookOpen}>Faradh (Rukun) Wudhu</SectionTitle>
        <div className="space-y-3">
          {faradh.map((item, index) => (
            <NumberedStep
              key={index}
              number={index + 1}
              title={item.title}
              description={item.description}
              color="blue"
            />
          ))}
        </div>
      </SectionCard>

      {/* Sunnah Wudhu */}
      <SectionCard>
        <SectionTitle icon={SparkleIcon}>Sunnah-Sunnah Wudhu</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

      {/* Pembatal Wudhu */}
      <SectionCard>
        <SectionTitle icon={ShieldAlert}>Hal-Hal yang Membatalkan Wudhu</SectionTitle>
        <ListWithIcons icon={XCircle} items={pembatal} color="red" />
      </SectionCard>

      {/* Permasalahan Khusus */}
      <ScrollReveal>
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={AlertCircle}>Permasalahan Khusus Seputar Wudhu</SectionTitle>
          <KasusKhususSection
            color="blue"
            kasus={[
              { icon: HeartPulse, title: "Wudhu Saat Luka atau Terluka", desc: "Jika terdapat luka dan tidak boleh terkena air, maka cukup dibasuh anggota wudhu yang sehat. Untuk bagian yang luka, cukup diusap dengan air atau jika tidak memungkinkan, boleh diganti dengan tayammum pada bagian tersebut. Jika seluruh anggota wudhu terluka dan tidak memungkinkan terkena air, maka bertayammumlah." },
              { icon: PaintBucket, title: "Wudhu dengan Cat Kuku atau Kutek", desc: "Cat kuku, kutek, atau bahan lain yang menutupi permukaan kuku termasuk penghalang sampainya air (mani'). Jika tidak dihilangkan, maka wudhu tidak sah karena air tidak sampai ke kuku. Wajib menghilangkannya terlebih dahulu sebelum berwudhu." },
              { icon: Hand, title: "Wudhu dengan Kulit Berminyak atau Berkrim", desc: "Jika minyak atau krim hanya menempel di permukaan dan tidak membentuk lapisan tebal yang menghalangi air, maka wudhu tetap sah. Namun jika membentuk lapisan yang menutupi pori-pori dan menghalangi air (waterproof), wajib dihilangkan terlebih dahulu." },
              { icon: Wind, title: "Wudhu dengan Air Terbatas atau Darurat", desc: "Dalam kondisi air sangat terbatas, gunakan air seperlunya untuk membasuh setiap anggota wudhu. Jika air hanya cukup untuk sebagian anggota, dahulukan yang wajib (rukun). Jika tidak ada air sama sekali, maka bertayammum sebagai gantinya." },
              { icon: Droplets, title: "Wudhu Saat Bepergian (Musafir)", desc: "Musafir tetap wajib berwudhu seperti biasa. Jika kesulitan mencari air bersih di perjalanan, boleh bertayammum. Di kendaraan umum seperti pesawat atau kereta, jika sulit ke toilet, usahakan wudhu seadanya atau tunda hingga sampai tempat yang memungkinkan, selama waktu shalat masih ada." },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Daftar Rujukan */}
      <RujukanSection
        rujukan={[
          { title: "Al-Qur'an Al-Karim", sumber: "QS. Al-Maidah: 6", keterangan: "Ayat utama tentang perintah wudhu dan tayammum." },
          { title: "Shahih Al-Bukhari", sumber: "Kitab Al-Wudhu', No. 135-247", keterangan: "Mencakup hadits-hadits tentang tata cara wudhu, sunnah-sunnah, dan pembatal wudhu." },
          { title: "Shahih Muslim", sumber: "Kitab Ath-Thaharah, No. 224-381", keterangan: "Hadits-hadits tentang wudhu, doa setelah wudhu, dan keutamaannya." },
          { title: "Sunan Abu Dawud", sumber: "Kitab Ath-Thaharah, No. 1-245", keterangan: "Hadits-hadits detail tentang tata cara wudhu dan pembatalnya." },
          { title: "Sunan At-Tirmidzi", sumber: "Kitab Ath-Thaharah, No. 1-150", keterangan: "Hadits tentang keutamaan wudhu dan doa setelah wudhu." },
          { title: "Bidayah Al-Mujtahid — Ibnu Rusyd", sumber: "Kitab Ath-Thaharah", keterangan: "Perbandingan pendapat ulama tentang syarat, rukun, dan pembatal wudhu." },
          { title: "Fathul Qarib — Syaikh Al-Ghazi", sumber: "Bab Thaharah", keterangan: "Ringkasan fikih Syafi'i tentang wudhu dan tata caranya." },
          { title: "Minhajul Muslim — Syaikh Abu Bakr Al-Jazairi", sumber: "Kitab Ath-Thaharah", keterangan: "Panduan lengkap thaharah berdasarkan Al-Qur'an dan Hadits." },
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
                Doa Setelah Wudhu
              </h3>
            </div>
            <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-blue-200/50 dark:border-blue-700/30">
              <p className="text-center leading-loose text-lg sm:text-xl text-foreground mb-4 font-arabic">
                أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ
              </p>
              <div className="border-t border-blue-200/50 dark:border-blue-700/30 pt-4">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic">
                  "Aku bersaksi bahwa tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya."
                </p>
              </div>
            </div>
          </div>
        </div>
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
