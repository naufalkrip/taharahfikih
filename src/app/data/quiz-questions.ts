export interface QuizQuestion {
  id: string;
  topic: "wudhu" | "ghusl" | "tayammum" | "najis";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ========== WUDHU ==========
  // EASY
  {
    id: "wudhu-e1",
    topic: "wudhu",
    difficulty: "easy",
    category: "Syarat",
    question: "Berikut ini yang termasuk syarat sah wudhu adalah…",
    options: [
      "Membasuh kaki kanan terlebih dahulu",
      "Berakal (tidak gila)",
      "Membaca basmalah",
      "Berkumur-kumur tiga kali",
    ],
    correctIndex: 1,
    explanation:
      "Berakal (tidak gila) adalah salah satu syarat sah wudhu. Membasuh kaki kanan, basmalah, dan berkumur termasuk sunnah, bukan syarat.",
  },
  {
    id: "wudhu-e2",
    topic: "wudhu",
    difficulty: "easy",
    category: "Rukun",
    question: "Rukun wudhu yang pertama dan sangat menentukan sah atau tidaknya wudhu adalah…",
    options: ["Membasuh muka", "Niat", "Tertib", "Mengusap kepala"],
    correctIndex: 1,
    explanation:
      "Niat adalah rukun wudhu yang pertama. Tanpa niat, wudhu tidak sah. Niat cukup di dalam hati ketika akan memulai wudhu.",
  },
  {
    id: "wudhu-e3",
    topic: "wudhu",
    difficulty: "easy",
    category: "Pembatal",
    question: "Yang termasuk pembatal wudhu adalah…",
    options: [
      "Makan dan minum",
      "Keluar sesuatu dari qubul dan dubur",
      "Berbicara saat wudhu",
      "Tertawa terbahak-bahak",
    ],
    correctIndex: 1,
    explanation:
      "Keluar sesuatu dari qubul (kemaluan) dan dubur, seperti buang air kecil, buang air besar, atau buang angin, termasuk pembatal wudhu.",
  },
  {
    id: "wudhu-e4",
    topic: "wudhu",
    difficulty: "easy",
    category: "Rukun",
    question: "Berikut adalah anggota tubuh yang wajib dibasuh saat wudhu, KECUALI…",
    options: ["Muka", "Kedua tangan sampai siku", "Kedua telinga", "Kedua kaki sampai mata kaki"],
    correctIndex: 2,
    explanation:
      "Membasuh kedua telinga termasuk sunnah wudhu, bukan rukun. Rukun wudhu meliputi: niat, basuh muka, basuh tangan, usap kepala, basuh kaki, dan tertib.",
  },
  // MEDIUM
  {
    id: "wudhu-m1",
    topic: "wudhu",
    difficulty: "medium",
    category: "Syarat",
    question: "Yang dimaksud dengan \"tamyiz\" dalam syarat wudhu adalah…",
    options: [
      "Sudah baligh",
      "Dapat membedakan baik dan buruk",
      "Beragama Islam",
      "Suci dari hadas besar",
    ],
    correctIndex: 1,
    explanation:
      "Tamyiz berarti sudah dapat membedakan antara yang baik dan buruk, atau sudah mencapai usia akal (sekitar 7 tahun). Ini merupakan salah satu syarat sah wudhu.",
  },
  {
    id: "wudhu-m2",
    topic: "wudhu",
    difficulty: "medium",
    category: "Rukun",
    question: "Arti dari \"tertib\" dalam rukun wudhu adalah…",
    options: [
      "Membaca doa setelah wudhu",
      "Melakukan secara berurutan sesuai ketentuan",
      "Membasuh tiga kali setiap anggota",
      "Mendahulukan anggota kanan",
    ],
    correctIndex: 1,
    explanation:
      "Tertib berarti melakukan rukun wudhu secara berurutan: niat → basuh muka → basuh tangan → usap kepala → basuh kaki. Tidak boleh ada yang terlewat atau tertukar urutannya.",
  },
  {
    id: "wudhu-m3",
    topic: "wudhu",
    difficulty: "medium",
    category: "Sunnah",
    question: "Manakah yang termasuk sunnah dalam pelaksanaan wudhu?",
    options: [
      "Membasuh muka tiga kali",
      "Membasuh kedua tangan sampai siku",
      "Niat di dalam hati",
      "Mengusap sebagian kepala",
    ],
    correctIndex: 0,
    explanation:
      "Membasuh setiap anggota tiga kali adalah sunnah wudhu. Sedangkan membasuh tangan sampai siku, niat, dan mengusap kepala termasuk rukun (wajib).",
  },
  {
    id: "wudhu-m4",
    topic: "wudhu",
    difficulty: "medium",
    category: "Pembatal",
    question: "Apakah tidur membatalkan wudhu?",
    options: [
      "Ya, semua jenis tidur membatalkan wudhu",
      "Tidak, tidur tidak membatalkan wudhu",
      "Ya, jika tidur dengan posisi tidak stabil/duduk yang kukuh",
      "Hanya jika tidur sambil berdiri",
    ],
    correctIndex: 2,
    explanation:
      "Tidur membatalkan wudhu jika dilakukan dengan posisi tidak stabil/duduk yang kukuh. Jika tidur dalam posisi tetap (misal duduk tegak yang stabil), wudhu tidak batal menurut sebagian ulama.",
  },
  // HARD
  {
    id: "wudhu-h1",
    topic: "wudhu",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Bagaimana hukum wudhu apabila seseorang memakai cat kuku (nail polish)?",
    options: [
      "Wudhu tetap sah karena cat kuku bukan najis",
      "Wudhu tidak sah karena cat kuku menghalangi air sampai ke kuku",
      "Wudhu sah asalkan cat kuku tidak berwarna mencolok",
      "Wudhu sah jika cat kuku sudah kering",
    ],
    correctIndex: 1,
    explanation:
      "Wudhu tidak sah jika masih ada cat kuku karena cat tersebut menghalangi sampainya air ke kuku, padahal membasuh tangan termasuk rukun wudhu yang mensyaratkan air mengenai seluruh permukaan kulit.",
  },
  {
    id: "wudhu-h2",
    topic: "wudhu",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Seseorang memiliki luka di tangan yang diperban. Bagaimana cara wudhunya?",
    options: [
      "Wudhu tetap seperti biasa, air mengalir di atas perban",
      "Cukup mengusap perban tanpa perlu membasuh bagian lainnya",
      "Membasuh bagian yang sehat, dan mengusap perban sebagai pengganti",
      "Tidak perlu wudhu, cukup tayammum",
    ],
    correctIndex: 2,
    explanation:
      "Cara wudhu yang benar adalah membasuh bagian anggota tubuh yang sehat, lalu mengusap perban sebagai pengganti bagian yang terluka. Ini berdasarkan kaidah \"masyaqqah tajlibu at-taysir\" (kesulitan mendatangkan kemudahan).",
  },
  {
    id: "wudhu-h3",
    topic: "wudhu",
    difficulty: "hard",
    category: "Pembatal",
    question: "Menurut sebagian ulama, bersentuhan kulit antara laki-laki dan perempuan yang bukan mahram…",
    options: [
      "Tidak membatalkan wudhu sama sekali",
      "Membatalkan wudhu keduanya",
      "Hanya membatalkan jika disertai syahwat",
      "Membatalkan wudhu jika keduanya sudah baligh",
    ],
    correctIndex: 1,
    explanation:
      "Bersentuhan kulit antara laki-laki dan perempuan yang bukan mahram termasuk pembatal wudhu menurut mazhab Syafi'i. Wudhu keduanya menjadi batal, meskipun tanpa syahwat.",
  },

  // ========== GHUSL (MANDI WAJIB) ==========
  // EASY
  {
    id: "ghusl-e1",
    topic: "ghusl",
    difficulty: "easy",
    category: "Sebab Mandi Wajib",
    question: "Manakah yang termasuk sebab seseorang wajib mandi (ghusl)?",
    options: [
      "Kencing dan buang air besar",
      "Keluarnya mani karena mimpi basah",
      "Buang angin",
      "Tertidur pulas",
    ],
    correctIndex: 1,
    explanation:
      "Keluarnya mani karena mimpi basah (ihtilam) termasuk salah satu sebab wajib mandi. Kencing, buang angin, dan tidur hanya membatalkan wudhu, bukan mewajibkan mandi.",
  },
  {
    id: "ghusl-e2",
    topic: "ghusl",
    difficulty: "easy",
    category: "Rukun",
    question: "Berapa jumlah rukun mandi wajib?",
    options: ["1", "2", "4", "6"],
    correctIndex: 1,
    explanation:
      "Rukun mandi wajib ada 2: (1) Niat, dan (2) Meratakan air ke seluruh tubuh, termasuk rambut dan kulit. Ini adalah minimal yang wajib dilakukan.",
  },
  {
    id: "ghusl-e3",
    topic: "ghusl",
    difficulty: "easy",
    category: "Rukun",
    question: "Apakah setelah mandi wajib (ghusl) masih perlu berwudhu untuk melaksanakan shalat?",
    options: [
      "Ya, tetap harus wudhu",
      "Tidak perlu, ghusl sudah mencakup wudhu",
      "Hanya jika hadas kecil masih ada",
      "Tergantung niat saat mandi",
    ],
    correctIndex: 1,
    explanation:
      "Setelah mandi wajib, tidak perlu wudhu lagi untuk shalat karena ghusl yang sempurna sudah mencakup wudhu di dalamnya. Mandi wajib menghilangkan hadas besar dan kecil sekaligus.",
  },
  {
    id: "ghusl-e4",
    topic: "ghusl",
    difficulty: "easy",
    category: "Sebab Mandi Wajib",
    question: "Apakah bersetubuh tanpa keluar mani mewajibkan mandi?",
    options: [
      "Ya, tetap wajib mandi",
      "Tidak, karena tidak keluar mani",
      "Hanya jika keduanya berniat",
      "Tidak, cukup wudhu saja",
    ],
    correctIndex: 0,
    explanation:
      "Bersetubuh meskipun tanpa keluar mani tetap mewajibkan mandi. Ini berdasarkan hadits bahwa bertemunya dua kemaluan (khitan) sudah mewajibkan mandi.",
  },
  // MEDIUM
  {
    id: "ghusl-m1",
    topic: "ghusl",
    difficulty: "medium",
    category: "Tata Cara",
    question: "Dalam tata cara sunnah mandi wajib, mendahulukan anggota tubuh bagian…",
    options: [
      "Kiri terlebih dahulu",
      "Kanan terlebih dahulu",
      "Bebas, tidak ada ketentuan",
      "Kepala terakhir",
    ],
    correctIndex: 1,
    explanation:
      "Dalam tata cara sunnah mandi wajib, dianjurkan mendahulukan anggota tubuh bagian kanan, kemudian bagian kiri. Hal ini mencontohkan kebiasaan Rasulullah ﷺ yang suka mendahulukan yang kanan.",
  },
  {
    id: "ghusl-m2",
    topic: "ghusl",
    difficulty: "medium",
    category: "Sunnah",
    question: "Yang termasuk sunnah dalam pelaksanaan mandi wajib adalah…",
    options: [
      "Niat di dalam hati",
      "Meratakan air ke seluruh tubuh",
      "Membasuh kemaluan terlebih dahulu",
      "Air mengenai pangkal rambut",
    ],
    correctIndex: 2,
    explanation:
      "Membasuh kemaluan terlebih dahulu sebelum mandi termasuk sunnah mandi wajib. Niat dan meratakan air ke seluruh tubuh termasuk rukun (wajib), bukan sunnah.",
  },
  {
    id: "ghusl-m3",
    topic: "ghusl",
    difficulty: "medium",
    category: "Sebab Mandi Wajib",
    question: "Kapan seorang wanita diwajibkan mandi setelah masa haid?",
    options: [
      "Setelah 3 hari haid",
      "Setelah darah haid berhenti total",
      "Setelah mandi wajib di hari ke-7",
      "Cukup wudhu setelah haid berhenti",
    ],
    correctIndex: 1,
    explanation:
      "Seorang wanita wajib mandi setelah darah haid berhenti total. Ini karena haid termasuk salah satu sebab wajib mandi (nifas juga termasuk).",
  },
  {
    id: "ghusl-m4",
    topic: "ghusl",
    difficulty: "medium",
    category: "Tata Cara",
    question: "Apakah wajib menggunakan sabun atau shampoo saat mandi wajib?",
    options: [
      "Ya, wajib agar bersih sempurna",
      "Tidak, cukup air merata ke seluruh tubuh",
      "Hanya shampoo yang wajib",
      "Ya, jika menggunakan air keran",
    ],
    correctIndex: 1,
    explanation:
      "Tidak wajib menggunakan sabun atau shampoo. Yang wajib hanyalah meratakan air ke seluruh tubuh hingga ke pangkal rambut dan kulit. Sabun/shampoo adalah sunnah untuk membersihkan.",
  },
  // HARD
  {
    id: "ghusl-h1",
    topic: "ghusl",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Bagaimana hukum mandi wajib bagi orang yang sedang sakit dan tidak boleh terkena air?",
    options: [
      "Tidak perlu mandi, cukup shalat seperti biasa",
      "Tayammum sebagai pengganti mandi wajib",
      "Mandi dengan air sedikit sesuai kondisi",
      "Cukup berwudhu",
    ],
    correctIndex: 1,
    explanation:
      "Jika seseorang sakit dan tidak boleh terkena air, ia boleh bertayammum sebagai pengganti mandi wajib. Ini berdasarkan firman Allah dalam QS. Al-Maidah: 6 tentang rukhsah (keringanan) bagi yang sakit.",
  },
  {
    id: "ghusl-h2",
    topic: "ghusl",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Seseorang baru saja menjalani operasi dan memiliki luka terbuka. Bagaimana cara mandi wajibnya?",
    options: [
      "Mandi seperti biasa, air mengalir di atas perban",
      "Mandi pada bagian yang sehat saja, bagian luka ditayammum",
      "Cukup tayammum seluruhnya, tidak perlu mandi",
      "Niat mandi lalu usap seluruh tubuh dengan handuk basah",
    ],
    correctIndex: 1,
    explanation:
      "Caranya adalah mandi pada bagian tubuh yang sehat, dan untuk bagian yang luka atau diperban cukup ditayammum. Ini menggabungkan antara dua metode bersuci karena adanya uzur (halangan).",
  },
  {
    id: "ghusl-h3",
    topic: "ghusl",
    difficulty: "hard",
    category: "Niat",
    question: "Kapan waktu yang tepat untuk membaca niat mandi wajib?",
    options: [
      "Setelah selesai mandi",
      "Saat pertama kali air mengenai tubuh",
      "Sebelum membasuh kemaluan",
      "Setelah wudhu sebelum menyiram kepala",
    ],
    correctIndex: 1,
    explanation:
      "Niat mandi wajib dibaca saat pertama kali air mengenai tubuh. Niat cukup di dalam hati, tidak perlu dilafadzkan. Yang penting adalah kesengajaan untuk menghilangkan hadas besar.",
  },

  // ========== TAYAMMUM ==========
  // EASY
  {
    id: "tayammum-e1",
    topic: "tayammum",
    difficulty: "easy",
    category: "Syarat",
    question: "Tayammum dilakukan sebagai pengganti wudhu atau mandi wajib ketika…",
    options: [
      "Sedang dalam perjalanan jauh",
      "Tidak menemukan air atau tidak bisa menggunakan air",
      "Cuaca sedang panas",
      "Sedang sibuk bekerja",
    ],
    correctIndex: 1,
    explanation:
      "Tayammum disyariatkan ketika seseorang tidak menemukan air atau tidak bisa menggunakan air karena alasan syar'i seperti sakit. Ini berdasarkan QS. Al-Maidah: 6.",
  },
  {
    id: "tayammum-e2",
    topic: "tayammum",
    difficulty: "easy",
    category: "Media",
    question: "Media yang boleh digunakan untuk tayammum adalah…",
    options: ["Air bersih", "Tanah atau debu yang bersih", "Pasir pantai", "Batu kerikil"],
    correctIndex: 1,
    explanation:
      "Media tayammum adalah tanah atau debu yang bersih (suci). Juga boleh menggunakan pasir, batu, atau debu di dinding. Yang penting adalah media tersebut termasuk jenis bumi (ash-shu'aid).",
  },
  {
    id: "tayammum-e3",
    topic: "tayammum",
    difficulty: "easy",
    category: "Rukun",
    question: "Rukun tayammum yang pertama adalah…",
    options: [
      "Mengusap muka",
      "Niat",
      "Mengusap tangan",
      "Menepuk tanah",
    ],
    correctIndex: 1,
    explanation:
      "Rukun tayammum yang pertama adalah niat. Sama seperti wudhu, niat dilakukan di dalam hati ketika akan memulai tayammum.",
  },
  // MEDIUM
  {
    id: "tayammum-m1",
    topic: "tayammum",
    difficulty: "medium",
    category: "Tata Cara",
    question: "Berapa kali menepuk tangan ke media (tanah/debu) dalam tayammum?",
    options: [
      "Satu kali",
      "Dua kali",
      "Tiga kali",
      "Tergantung kebutuhan",
    ],
    correctIndex: 0,
    explanation:
      "Dalam tayammum, cukup satu kali menepuk tangan ke media (tanah/debu). Satu tepukan digunakan untuk mengusap muka dan kedua tangan. Ini berdasarkan hadits dari Ammar bin Yasir.",
  },
  {
    id: "tayammum-m2",
    topic: "tayammum",
    difficulty: "medium",
    category: "Pembatal",
    question: "Apa yang terjadi jika seseorang sudah bertayammum, lalu setelah itu menemukan air?",
    options: [
      "Tayammumnya tetap sah, shalat boleh dilanjutkan",
      "Tayammumnya batal dan wajib wudhu/mandi",
      "Tayammum sah jika sudah shalat, batal jika belum",
      "Tayammum tetap sah selama sehari semalam",
    ],
    correctIndex: 2,
    explanation:
      "Jika sudah melaksanakan shalat lalu menemukan air, tayammum tetap sah dan shalat tidak perlu diulang. Namun jika menemukan air sebelum shalat, tayammum batal dan wajib berwudhu/mandi.",
  },
  {
    id: "tayammum-m3",
    topic: "tayammum",
    difficulty: "medium",
    category: "Pembatal",
    question: "Tayammum berlaku untuk berapa kali shalat fardhu?",
    options: [
      "Hanya untuk satu kali shalat fardhu",
      "Untuk satu hari penuh",
      "Untuk beberapa shalat selama masih dalam perjalanan",
      "Sampai waktu shalat berikutnya",
    ],
    correctIndex: 0,
    explanation:
      "Tayammum hanya berlaku untuk satu kali shalat fardhu. Jika hendak melaksanakan shalat fardhu berikutnya, harus bertayammum kembali. Namun untuk shalat sunnah, satu tayammum bisa digunakan berkali-kali.",
  },
  {
    id: "tayammum-m4",
    topic: "tayammum",
    difficulty: "medium",
    category: "Perbandingan",
    question: "Apa perbedaan utama antara wudhu dan tayammum dari segi anggota yang dibasuh?",
    options: [
      "Tayammum hanya mengusap muka dan tangan, wudhu lebih banyak anggota",
      "Tayammum mengusap muka saja",
      "Tayammum tidak perlu tertib",
      "Tidak ada perbedaan, sama saja",
    ],
    correctIndex: 0,
    explanation:
      "Perbedaan utamanya: tayammum hanya mengusap muka dan kedua tangan (sampai siku), sedangkan wudhu membasuh muka, tangan, kepala, dan kaki. Tayammum lebih ringkas sebagai bentuk keringanan.",
  },
  // HARD
  {
    id: "tayammum-h1",
    topic: "tayammum",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Bagaimana hukum tayammum bagi seseorang yang berada di daerah bersalju dan tidak bisa mendapatkan air?",
    options: [
      "Tidak sah, karena salju bukan media tayammum",
      "Sah, karena salju termasuk jenis bumi",
      "Harus menunggu sampai salju mencair menjadi air",
      "Shalat tetap wajib meski tanpa bersuci",
    ],
    correctIndex: 1,
    explanation:
      "Salju termasuk jenis bumi (ash-shu'aid), sehingga tayammum dengan salju hukumnya sah. Orang tersebut boleh bertayammum dengan salju dan shalat tetap wajib dilaksanakan.",
  },
  {
    id: "tayammum-h2",
    topic: "tayammum",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Bolehkah tayammum karena khawatir akan kehabisan waktu shalat jika harus mencari air?",
    options: [
      "Tidak boleh, harus tetap mencari air",
      "Boleh jika waktu shalat benar-benar sempit",
      "Hanya boleh bagi musafir",
      "Tidak boleh, lebih baik shalat qadha",
    ],
    correctIndex: 1,
    explanation:
      "Boleh bertayammum jika waktu shalat sudah sangat sempit sehingga dikhawatirkan akan habis jika harus mencari air. Ini termasuk salah satu syarat yang membolehkan tayammum.",
  },
  {
    id: "tayammum-h3",
    topic: "tayammum",
    difficulty: "hard",
    category: "Pembatal",
    question: "Yang termasuk pembatal tayammum adalah…",
    options: [
      "Makan dan minum",
      "Semua yang membatalkan wudhu ditambah menemukan air",
      "Berbicara saat tayammum",
      "Tertidur setelah tayammum",
    ],
    correctIndex: 1,
    explanation:
      "Pembatal tayammum adalah: (1) semua yang membatalkan wudhu, (2) menemukan air (jika tayammum karena tidak ada air), (3) hilangnya uzur (misal sembuh dari sakit), dan (4) habisnya waktu shalat menurut sebagian ulama.",
  },

  // ========== NAJIS ==========
  // EASY
  {
    id: "najis-e1",
    topic: "najis",
    difficulty: "easy",
    category: "Jenis Najis",
    question: "Berapa jenis najis dalam pembagian fikih?",
    options: ["1 jenis", "2 jenis", "3 jenis", "4 jenis"],
    correctIndex: 2,
    explanation:
      "Najis dibagi menjadi 3 jenis: Mukhaffafah (ringan), Mutawassithah (sedang), dan Mughalladzah (berat). Masing-masing memiliki cara pensucian yang berbeda.",
  },
  {
    id: "najis-e2",
    topic: "najis",
    difficulty: "easy",
    category: "Jenis Najis",
    question: "Najis mukhaffafah (ringan) adalah najis yang berasal dari…",
    options: [
      "Darah dan kotoran hewan",
      "Air kencing bayi laki-laki yang belum makan selain ASI",
      "Anjing dan babi",
      "Keringat dan air liur",
    ],
    correctIndex: 1,
    explanation:
      "Najis mukhaffafah adalah air kencing bayi laki-laki yang belum berusia 2 tahun dan belum makan makanan selain ASI. Cara mensucikannya cukup dengan memercikkan air ke area yang terkena.",
  },
  {
    id: "najis-e3",
    topic: "najis",
    difficulty: "easy",
    category: "Jenis Najis",
    question: "Najis mughalladzah (berat) berasal dari…",
    options: [
      "Darah haid",
      "Kotoran ayam",
      "Anjing dan babi serta turunannya",
      "Air kencing manusia",
    ],
    correctIndex: 2,
    explanation:
      "Najis mughalladzah adalah najis yang berasal dari anjing dan babi beserta turunannya (seperti air liur, keringat). Ini adalah najis kategori paling berat dalam fikih.",
  },
  {
    id: "najis-e4",
    topic: "najis",
    difficulty: "easy",
    category: "Jenis Najis",
    question: "Yang termasuk contoh najis mutawassithah (sedang) adalah…",
    options: [
      "Air kencing bayi laki-laki",
      "Darah, urine, dan kotoran manusia",
      "Air liur anjing",
      "Debu dan tanah",
    ],
    correctIndex: 1,
    explanation:
      "Najis mutawassithah adalah najis tingkat sedang yang paling sering ditemui sehari-hari, seperti darah, urine (air kencing), kotoran manusia, muntahan, dan bangkai (kecuali ikan dan belalang).",
  },
  // MEDIUM
  {
    id: "najis-m1",
    topic: "najis",
    difficulty: "medium",
    category: "Cara Mensucikan",
    question: "Cara mensucikan najis mutawassithah adalah…",
    options: [
      "Cukup dijemur di bawah sinar matahari",
      "Dibasuh dengan air hingga hilang warna, bau, dan rasanya",
      "Disiram air satu kali",
      "Dibasuh tujuh kali dengan tanah",
    ],
    correctIndex: 1,
    explanation:
      "Najis mutawassithah disucikan dengan membasuhnya menggunakan air hingga hilang tiga sifat najisnya: warna, bau, dan rasa. Air mengalir atau air yang cukup untuk menghilangkan sifat najis tersebut.",
  },
  {
    id: "najis-m2",
    topic: "najis",
    difficulty: "medium",
    category: "Cara Mensucikan",
    question: "Berapa kali cucian yang diperlukan untuk mensucikan najis mughalladzah?",
    options: [
      "3 kali cucian",
      "5 kali cucian",
      "7 kali cucian, salah satunya dengan tanah",
      "Cukup 1 kali cucian dengan sabun",
    ],
    correctIndex: 2,
    explanation:
      "Najis mughalladzah (dari anjing/babi) disucikan dengan 7 kali cucian, dan salah satunya harus menggunakan tanah (atau debu). Ini berdasarkan hadits tentang cara mensucikan bejana yang dijilat anjing.",
  },
  {
    id: "najis-m3",
    topic: "najis",
    difficulty: "medium",
    category: "Hewan",
    question: "Manakah hewan berikut yang dianggap suci dalam fikih?",
    options: [
      "Anjing",
      "Babi",
      "Kucing",
      "Bangkai ayam",
    ],
    correctIndex: 2,
    explanation:
      "Kucing termasuk hewan yang dianggap suci. Anjing dan babi adalah najis mughalladzah. Bangkai umumnya najis kecuali ikan dan belalang. Kucing dimaafkan (ma'fu) karena sulit dihindari.",
  },
  {
    id: "najis-m4",
    topic: "najis",
    difficulty: "medium",
    category: "Hukum",
    question: "Bagaimana hukum najis yang jumlahnya sedikit dan sulit dihindari?",
    options: [
      "Wajib dibersihkan bagaimanapun keadaannya",
      "Dimaafkan (ma'fu) menurut sebagian ulama",
      "Tidak dianggap najis",
      "Hanya najis besar yang dimaafkan",
    ],
    correctIndex: 1,
    explanation:
      "Menurut sebagian ulama, najis yang jumlahnya sedikit dan sulit dihindari (seperti percikan darah kecil) dimaafkan (ma'fu). Prinsipnya adalah \"al-masyaqqah tajlibu at-taysir\" — kesulitan mendatangkan kemudahan.",
  },
  // HARD
  {
    id: "najis-h1",
    topic: "najis",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Bagaimana cara membersihkan najis pada handphone atau perangkat elektronik yang tidak bisa terkena air?",
    options: [
      "Cukup dilap dengan tisu kering",
      "Disemprot air secukupnya",
      "Dibersihkan dengan kain lembab atau tisu basah hingga najis hilang",
      "Tidak perlu dibersihkan karena najis tidak menempel",
    ],
    correctIndex: 2,
    explanation:
      "Untuk perangkat elektronik, cukup dibersihkan dengan kain lembab atau tisu basah hingga sifat najis (warna, bau, rasa) hilang. Setelah kering, perangkat dianggap suci. Ini termasuk keringanan karena kesulitan.",
  },
  {
    id: "najis-h2",
    topic: "najis",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Seseorang ragu apakah pakaiannya terkena najis atau tidak. Apa yang harus dilakukan?",
    options: [
      "Pakaian dianggap najis, harus dicuci",
      "Pakaian dianggap suci karena hukum asal adalah suci",
      "Shalat tidak sah jika ragu-ragu",
      "Harus mencari kepastian dengan bertanya pada orang lain",
    ],
    correctIndex: 1,
    explanation:
      "Hukum asal segala sesuatu adalah suci (al-ashlu fii al-asy-yaa-i ath-thahaarah). Jika ragu apakah terkena najis, maka pakaian tetap dianggap suci. Keraguan tidak menghilangkan keyakinan.",
  },
  {
    id: "najis-h3",
    topic: "najis",
    difficulty: "hard",
    category: "Cara Mensucikan",
    question: "Bagaimana cara mensucikan karpet masjid yang terkena najis dalam jumlah besar?",
    options: [
      "Cukup disemprot pewangi",
      "Dicabut bagian yang terkena najis lalu dicuci",
      "Disiram air dalam jumlah banyak hingga najis hilang, lalu dikeringkan",
      "Karpet harus diganti seluruhnya",
    ],
    correctIndex: 2,
    explanation:
      "Karpet besar yang terkena najis disucikan dengan menyiramkan air dalam jumlah banyak ke area yang terkena hingga sifat najis (warna, bau, rasa) hilang. Setelah itu air diserap dan dikeringkan. Tidak perlu mencabut atau mengganti karpet.",
  },
  {
    id: "najis-h4",
    topic: "najis",
    difficulty: "hard",
    category: "Permasalahan Khusus",
    question: "Air yang terkena najis namun tidak berubah warna, bau, dan rasanya, hukumnya…",
    options: [
      "Tetap najis karena pernah terkena najis",
      "Suci dan mensucikan karena sifatnya tidak berubah",
      "Suci tapi tidak mensucikan",
      "Makruh digunakan untuk ibadah",
    ],
    correctIndex: 1,
    explanation:
      "Air yang terkena najis namun tidak berubah salah satu sifatnya (warna, bau, rasa) tetap dianggap suci dan mensucikan, selama jumlah air mencapai dua qullah (sekitar 270 liter) atau merupakan air mengalir.",
  },
];

export const topicInfo: Record<string, { title: string; icon: string; color: string; gradient: string; bgLight: string; imageSrc: string }> = {
  wudhu: {
    title: "Wudhu",
    icon: "Droplets",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
    imageSrc: "/assets/wudhu.png",
  },
  ghusl: {
    title: "Mandi Wajib",
    icon: "Sparkles",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    imageSrc: "/assets/mandi.png",
  },
  tayammum: {
    title: "Tayammum",
    icon: "Wind",
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
    imageSrc: "/assets/tayamum.png",
  },
  najis: {
    title: "Najis & Bersuci",
    icon: "Trash2",
    color: "red",
    gradient: "from-red-500 to-rose-500",
    bgLight: "bg-red-50 dark:bg-red-950/30",
    imageSrc: "/assets/najis.png",
  },
};

export function getQuestionsByTopic(topic: string): QuizQuestion[] {
  return quizQuestions
    .filter((q) => q.topic === topic)
    .sort(() => Math.random() - 0.5);
}

export function getTotalQuestions(topic: string): number {
  return quizQuestions.filter((q) => q.topic === topic).length;
}

export function getAllQuestions(perTopic = 8): QuizQuestion[] {
  const topics = ["wudhu", "ghusl", "tayammum", "najis"];
  const selected: QuizQuestion[] = [];
  for (const topic of topics) {
    const pool = quizQuestions.filter((q) => q.topic === topic);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, perTopic));
  }
  return selected.sort(() => Math.random() - 0.5);
}
