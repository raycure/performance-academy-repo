import { useTranslation } from 'react-i18next';
function LesmillsPrograms() {
	const { t, i18n } = useTranslation('programs');
	const lesMillsPrograms = {
		[t('cat1.title')]: [
			{
				title: t('cat1.program1.title'),
				logo: t('cat1.program1.logo'),
				picture: t('cat1.program1.picture'),
				id: t('cat1.program1.id'),
				sum: t('cat1.program1.sum'),
				description: t('cat1.program1.description'),
				whyMember: t('cat1.program1.whyMember'),
				whyYou: t('cat1.program1.whyYou'),
				type: t('cat1.program1.type'),
				lessons: t('cat1.program1.lessons'),
				equipment: t('cat1.program1.equipment'),
				for: t('cat1.program1.for'),
				result: t('cat1.program1.result'),
			},
			{
				title: t('cat1.program2.title'),
				logo: t('cat1.program2.logo'),
				picture: t('cat1.program2.picture'),
				id: t('cat1.program2.id'),
				sum: t('cat1.program2.sum'),
				description: t('cat1.program2.description'),
				whyMember: t('cat1.program2.whyMember'),
				whyYou: t('cat1.program2.whyYou'),
				type: t('cat1.program2.type'),
				lessons: t('cat1.program2.lessons'),
				equipment: t('cat1.program2.equipment'),
				for: t('cat1.program2.for'),
				result: t('cat1.program2.result'),
			},
			{
				title: 'LES MILLS BODYBALANCE',
				logo: '/classLogo/BODYBALANCE.png',
				picture: '',
				id: 'LES-MILLS-BODYBALANCE',
				sum: 'Herkes için ideal olan LES MILLS BODYBALANCE, müzik eşliğinde Tai Chi ve Pilates unsurlarıyla modern bir yoga yorumudur.  Bir fitness kulübü ortamı için bilimsel olarak tasarlanmış olup zihninizi, bedeninizi ve yaşamınızı iyileştirecektir.',
				description:
					'LES MILLS BODYBALANCE™ esnekliğini, temel kuvvetini ve zindelik duygusunu geliştirmek isteyen herkes için yoga temelli bir egzersizdir.\nYogaya yeni başlayanlar için LES MILLS BODYBALANCE harika bir başlangıçtır ve daha zorlu egzersizler için pek çok seçenek vardır.  Daha deneyimli olanlar için, yoga egzersizlerinin yanı sıra Tai Chi ve Pilates hareketlerini de içeren geleneksel bir yoga dersinden daha fazla çeşitlilik sunar.  LES MILLS BODYBALANCE, stres seviyelerini azaltırken ve kalıcı bir esenlik ve sakinlik duygusu yaratmak için zihni odaklarken esnekliği ve core gücünü geliştirir.',
				whyMember:
					'Üyelerinizin çoğu meşgul ve stresli modern hayatlar sürüyor ve denge arıyor.  LES MILLS BODYBALANCE, yoganın fiziksel ve zihinsel faydalarını, mevcut fitness alışkanlıklarının bir parçası haline getirmenin kolay olduğu kulüp ortamına getiriyor.\nEsneklik ve temel kuvvete odaklanan LES MILLS BODYBALANCE, diğer LES MILLS programlarının etkinliğini temel alır.  Bir butik yoga veya pilates stüdyosunu ziyaret etmek zorunda kalmadan stresi azaltmak ve zindeliği artırmak isteyen üyeler için mükemmel bir seçenektir.  Ve LES MILLS Eğitmenleri, her düzeydeki üyeye ilham verici ve güvenli bir antrenman sunacak eğitime sahiptir.',
				whyYou:
					'30, 45 veya 55 dakikalık bir formatta çalıştırılabilen LES MILLS BODYBALANCE size Program Çizelgenizde esneklik sağlar.  Diğer popüler programlardan hemen sonra planlayabilirsiniz, böylece üyeler bunu birleşik bir antrenmanın parçası haline getirebilir.\nAkıl ve beden kategorisi(mind and body) şu anda fitness endüstrisindeki en hızlı büyüyen alanlardan biri ve butik kulüpler son yıllarda önemli ölçüde artıyor.  LES MILLS BODYBALANCE, bu deneyimi kulübünüze geri getiriyor.  Üyeleri gençleştirmek ve yaptıkları diğer antrenmanların yanı sıra güçlerini, zihinlerini ve motivasyonlarını sıfırlamak için mükemmel bir sınıftır.  En son motive edici müziğin dahil edilmesi, diğer stüdyolardan farklı, unutulmaz bir deneyim yaratılmasına yardımcı olur.',
				type: 'Esneklik',
				lessons: '30, 45 veya 55 dakika.  Canlı, sanal ve isteğe bağlı.',
				equipment: 'Yoga matı (isteğe bağlı)',
				for: 'Herkes',
				result: 'Geliştirilmiş Core gücü ve esnekliği, stres azaltma',
			},
			{
				title: 'LES MILLS CORE',
				logo: '/classLogo/CORE.png',
				picture: '',
				id: 'LES-MILLS-CORE',
				sum: 'Seçkin atletik antrenman ilkelerinden ilham alan LES MILLS CORE™, harika bir core gücü ve spor performansı oluşturmak için bilimsel  ve temel antrenmandır.  Üyeleriniz daha güçlü core gücü oluşturacak ve diğer antrenmanlardan daha iyi sonuçlar alacak.',
				description:
					'LES MILLS CORE™, tüm kondisyon seviyeleri için hızlı sonuçlar veren 30 dakikalık bir temel antrenman antrenmanıdır.\nÇekirdek çevresindeki kasları çalıştıran LES MILLS CORE, daha güçlü bir vücut için hayati içeriği sağlar.  Daha güçlü bir core, kulübünüzdeki diğer spor aktiviteleri de dahil olmak üzere, üyelerinizin yaptıkları her şeyde daha iyi olmasını sağlar.  Sonuç?  Daha iyi sonuçlar, katılım ve motivasyon.',
				whyMember:
					'Güçlü bir core  sahip olmak, üyelerinizin kulübünüzde yaptıkları herhangi bir egzersiz aktivitesinde yaralanmalardan kaçınmasını ve performanslarını artırmasını sağlamanın anahtarıdır.  LES MILLS CORE sadece 30 dakikadır, böylece üyeler diğer derslerin sonunda kolayca sığdırabilir veya hızlı bir antrenman için uğrayabilir.\nLES MILLS Eğitmenleri, her seviyedeki üyeye ilham verici ve güvenli bir antrenman sunmak için özel olarak eğitilmiştir.',
				whyYou:
					'LES MILLS CORE, zaman çizelgenizdeki boşlukları doldurmak ve daha motive üyelerinize ekstra seçenekler sunmak için harika bir sınıftır.  BODYPUMP veya BODYATTACK gibi popüler derslerden hemen sonra planlayın, böylece üyeler az önce yaptıkları işi geliştirebilirler.',
				type: 'Core Antrenmanı',
				lessons: '30 dakika.  Canlı, Sanal ve İsteğe Bağlı.',
				equipment: 'Egzersiz bandı, ağırlık plakası',
				for: 'Herkes',
				result:
					'Geliştirilmiş Core gücü, vücud postürünü geliştirme ve  vücutta kas kitlesini artırma',
			},
			{
				title: 'BODYATTACK',
				logo: '/classLogo/BODYATTACK.png',
				picture: '',
				id: 'BODYATTACK',
				sum: 'Kalori yakmak, kas kitlesini artırmak  ve zayıflamak gibi genel vücut antrenmanı arayan kulüp üyeleri için Les Mills BODYATTACK idealdir.  Tüm fitness seviyelerine uygun seçeneklerle BODYATTACK, son derece motive edici bir egzersiz için kardiyo, çeviklik ve kuvvet egzersizlerini birleştirir.',
				description:
					'BODYATTACK™, kardiyo fitness, dayanıklılık ve çevikliğe odaklanan yüksek enerjili, eğlenceli ve atletik bir antrenmandır.\nKoşma, zıplama ve zıplama gibi atletik hareketleri şınav ve squat gibi kuvvet egzersizleriyle birleştirerek bir antrenman sırasında 730 kaloriye* kadar yakabilirsiniz.  Spordan ilham alan bu egzersizler aynı zamanda kardiyo dayanıklılığı geliştirecek, koordinasyonu ve çevikliği artıracak.',
				whyMember:
					'Araştırmalar, hayata uyum sağlamanın sırrının yavaş bir yapı olduğunu gösteriyor.  BODYATTAACK, üyelerinizin kendi seviyelerinde antrenman yapmalarına ve antrenmanı mevcut kondisyon seviyelerine uyacak şekilde ayarlayarak zaman içinde gelişmelerine olanak tanır.  Haftada 2-3 dersle başlayabilir ve oradan inşa edebilirler.\nBODYATTACK, atletik takım antrenmanının motivasyonunu ve mücadelesini seven, ancak yoğun hayatlarında bir spor takımına katılmaya vakti olmayan üyeler için de harika bir seçenektir.',
				whyYou:
					'30, 45 veya 55 dakikalık formatta çalıştırılabilen BODYATTACK, size Program Çizelgenizde esneklik sağlar. Üyelerinizin düzenli olarak erişebilmelerini sağlamak için, tam bir saat aralığı olmadığında bile en yoğun zamanlarda planlayabilirsiniz.\nBODYATTAK, günlük yaşam için fonksiyonel zindelik sağlayan eğlenceli, popüler ve bağımlılık yapan bir egzersizdir.  Hiçbir ekipman gerektirmez, bu nedenle stüdyonuza yerleştirmesi kolay bir programdır.  Ve LES MILLS Eğitmenleri, her düzeyde deneyime sahip üyeler için ilham verici bir çalışma sunacak eğitime sahiptir.',
				type: 'Kardiyo',
				lessons: '30, 45 veya 55 dakika.  Canlı ve Talep Üzerine.',
				equipment: 'Yok',
				for: 'Herkes',
				result:
					'Geliştirilmiş kardiyo kondisyon ve dayanıklılık, tonlama ve şekillendirme, geliştirilmiş çeviklik',
			},
			{
				title: 'RPM',
				logo: '/classLogo/RPM.png',
				picture: '',
				id: 'RPM',
				sum: 'Grup aktivitelerine yeni başlayanlar için mükemmel bir başlangıç olan LES MILLS RPM, üyelerinizin kalori yakmasına, kardiyo kondisyon seviyesinin  geliştirmesine ve kondisyon seviyelerine uyacak şekilde yoğunluğu artırmasına  olanak tanıyan oldukça motive edici ve genellikle bağımlılık yapan bir Bisiklet antrenmanıdır.',
				description:
					'RPM™, yoğunluğunu kontrol ettiğiniz bir iç mekan  Grup  Bisiklet antrenmanıdır.  Eğlenceli ve düşük  yoğunluklu bir seansta 500 kaloriye kadar yakabilirsiniz.\nHarika müzik  ile grup bütünleşir ve Eğitmeniniz sizi tepe tırmanışları, sprintler ve düz sürüş yolculuğuna çıkarır.  Bir RPM antrenmanında, kardiyo zirvesine ulaşmak için pedalları tekrar tekrar çevirirsiniz, ardından kişisel performansınızı yükseltmek ve kardiyo kondisyonunuzu artırmak için program hızına ayak uydurarak yavaşlarsınız.\nRPM, kişisel başarı duygunuzu geliştirmenin harika bir yoludur.  Grubun enerjisinden faydalanabilir ve müzikte ritminizi bulabilirsiniz.  Kendi direnç seviyenizi ve hızınızı kontrol edersiniz, böylece zaman içinde zindelik seviyenizi yükseltebilirsiniz.  Bu bir yolculuk, yarış değil!',
				whyMember:
					'RPM, yeni üyeler için ideal bir giriş seviyesi antrenmanıdır çünkü bireyler kendi direnç seviyelerini kontrol eder.  Yeni başlayanlar, sınıfın geri kalanına ayak uydurabilirken, daha deneyimli biniciler bunu hızlandırabilir ve kendilerine meydan okuyabilir.  Ve LES MILLS Eğitmenleri, her seviyedeki üyeye ilham verici ve güvenli bir antrenman sunmak için özel olarak eğitilmiştir.\nBir RPM antrenmanı 45 dakikadır ve antrenman için tam bir saat ayıramayan yoğun zamanlarda üyeler için uygun bir uzunluktur.  Ve RPM Virtual, program Çizelgenizde üyelerinize zaman uygunluğu seçeneği sunan bir seçenektir.',
				whyYou:
					"RPM, yeni üyelerin fitness'a hızla aşık olmasını sağlamanın harika bir yoludur.  Bu tür bir egzersizde yeniyseler, RPM yolculuklarında kardiyo sonuçlarını çok yakında görecekler ve motive kalmalarını ve geri dönmeye devam etmeleri için ilham almalarını sağlayacaklar.\nBir Bisiklet stüdyosu, fitness butiklerini kendi oyunlarında alt etmenin ve üyelerinize sunulan seçenekleri çeşitlendirmenin de harika bir yoludur.",
				type: 'Kardiyo zirvesi, Cycle eğitimi',
				lessons: '45 dakika.  Canlı, sanal ve Talep Üzerine',
				equipment: 'Sabit Bisiklet',
				for: 'Herkes',
				result: 'Geliştirilmiş kardiyo fitness, yağ kaybı',
			},
			{
				title: 'SH’BAM',
				logo: '/classLogo/SH’BAM.png',
				picture: '',
				id: 'SH’BAM',
				sum: "Eğlenceyi seven, delicesine bağımlılık yapan bir dans çalışması olan Les Mills SH'BAM, egodan arınmış bir bölgedir - dans deneyimi gerektirmez.  Yüksek enerjili bir kardiyo egzersizi yaparken, eğitmenlerinizin partiyi getirmesine ve üyelerinizin sahip olduklarını hiç bilmedikleri hareketleri bulmalarına yardımcı olmasına izin verin.",
				description:
					"SH'BAM™, zindeliği geliştiren ve anlamlı hareketi teşvik eden taze ve eğlenceli bir dans çalışmasıdır.\nEn yeni parti şarkılarını ve en küstah dans hareketlerini karıştıran bir SH'BAM sınıfı, üyelerinizin gevşemesi ve hareketin keyfini çıkarması için bir bahanedir.  Parti için geliyorlar ama aynı zamanda vücutlarını çok çalıştırıyorlar ve çevikliklerini ve kardiyo kondisyonlarını geliştiriyorlar.",
				whyMember:
					"SH'BAM'i kesinlikle her yaştan ve zindelik seviyesinden herkes yapabilir.  Onlar kendileri için iyi olan bir şey yaparken biraz eğlenmek için harika bir bahane.  Üyeler, ilham verici eğitmenler ve harika müzik onları hareket ettirirken çalıştıklarını unutacaklar.\nCanlı veya Sanal olarak sunulan 45 veya 30 dakikalık bir derstir, bu nedenle onlara da uygun zamanlarda programınıza yerleştirmek kolaydır.",
				whyYou:
					"SH'BAM, üyelerinize sunduklarınıza ekstra bir boyut katar ve yeni bir izleyici kitlesi çekmenin harika bir yoludur.  Birçok kadın ve erkek için favori bir egzersiz yöntemidir.  SH'BAM üyelerinize farkı seviyelerde sonuçlar sunar. enerji ve eğlence üyelerinizi ğlenceli bir party ortamına taşıyacak.",
				type: 'Dans',
				lessons: '45 veya 30 dakika.  Canlı, Sanal ve İsteğe Bağlı.',
				equipment: 'Yok',
				for: 'Herkes',
				result: 'Gelişmiş kardiyo Seviyesi ve çeviklik, Güçlenme',
			},
			{
				title: 'BODYJAM',
				logo: '/classLogo/BODYJAM.png',
				picture: '',
				id: 'BODYJAM',
				sum: "Üyeleriniz dans etmeyi seviyorsa, tamamen benzersiz dans programımız Les Mills BODYJAM'e aşık olacaklar.  Dünyanın her yerinden en taze hareketlerden ve en trend müziklerden ilham alan BODYJAM, fitness stüdyonuzu bir dans pistine dönüştüren yüksek enerjili kardiyo egzersizidir.",
				description:
					'BODYJAM™, hızlı hareket etmenizi ve vücudunuzu çalıştırmanızı sağlamak için tasarlanmış, dansa dayalı bir antrenmandır.\nDünyanın her yerindeki dansçılardan ilham alan ve onu House, Hip-hop, Drum n Bass, Trap ve elektronik dans müziğinin tüm tarzlarıyla karıştıran BODYJAM, stüdyonuza bir doz ruh getiriyor.  Aynı zamanda, kalori yakan ve her derste kardiyo kondisyonu geliştiren öldürücü bir dans egzersizdir.',
				whyMember:
					"BODYJAM'in parti atmosferi, egzersize benzersiz bir boyut getiriyor.  Harika bir sürüm, stresi yok ediyor ve günlük hayattan kaçışa izin veriyor.\nBODYJAM'e giren yaratıcılık, onu üyelerinizin kullanabileceği diğer tüm dans egzersizlerinden ayırır.  Sınıf tamamen vücudun müzikle nasıl hareket edebildiğinden ilham alıyor.  BODYJAMin dansa dayalı hareketleri, egzersiz yapma fikrine karşı çıkan üyeler için grup fitness'a eğlenceli bir ilk adımdır.\nProgram 30, 45 veya 55 dakikalık bir formatta çalıştırılabilir, bu da BODYJAM'in üyeleriniz için en uygun zamanlarda kulübünüzün zaman çizelgesinde çalışmasını kolaylaştırır.",
				whyYou:
					'BODYJAM, üyelerin geri gelmesini sağlayan çok büyük bir iyi hissetme faktörüne sahiptir.  Parti havası müdavimler arasında bir bağ kurar, bu da düzenli olarak bir araya gelip sahaya çıkmak için pozitif bir baskı anlamına gelir.',
				type: 'Dans',
				lessons: '30, 45 veya 55 dakika',
				equipment: 'Yok',
				for: 'Herkes',
				result:
					'Geliştirilmiş kardiyo kondisyon ve çeviklik, artan kalori yakma',
			},
			{
				title: 'BODYSTEP',
				logo: '/classLogo/BODYSTEP.png',
				picture: '',
				id: 'BODYSTEP',
				sum: 'Les Mills BODYSTEP ile üyelerinize bacakları ve kalçaları sıkılaştıran etkili  Tüm Vücud Kardiyo çalışması sunun.  Canlandırıcı, eğlenceli ve sonuçlara dayalı yüksek enerjili bir program oluşturmak için 25 yılı aşkın süredir orijinal Step Programı geliştiriyoruz.',
				description:
					"BODYSTEP™, formda olmak ve forma girmek isteyen herkes için canlandırıcı ve etkili bir  tüm vücud kardiyo çalışmasıdır.\nTemel adımlama, BODYSTEP'in kalbinde yer alır.  Kardiyo blokları, her antrenmanda 620 kaloriye kadar yakarak ve kardiyo kondisyonunu artırarak vücudu yüksek vitese geçirirken, lunge, squat ve diğer egzersizler kasları sıkılaştırmak ve güçlendirmek için bacakları ve kalça kaslarını çalıştırır.",
				whyMember:
					"Yıllarca süren araştırma ve iyileştirme, BODYSTEP'in gerçek sonuçlar almasını sağlamıştır.  Kalori yakmak ve kasları güçlendirmek birçok fitness kulübü üyesi için büyük bir odak noktasıdır ve BODYSTEP bunu sağlar.  Bu başarı duygusu, motivasyonlarını artırır ve geri gelmelerini sağlar.\nLES MILLS Eğitmenleri, her seviyedeki üyeye ilham verici ve güvenli bir antrenman sunmak için özel olarak eğitilmiştir.",
				whyYou:
					'BODYSTEP size Program çizelgenizde zaman esnekliği sağlamak için 30, 45 veya 55 dakikalık bir formatta çalıştırılabilir.  Size daha da fazla seçenek sunan Atletik veya Klasik formatta da çalıştırılabilir.  BODYSTEP Athletic, güç ve kondisyon egzersizleri eklemeye odaklanırken, BODYSTEP Classic tamamen daha hızlı adım atma ve ritimle ilgilidir.\nÜyeleriniz sonuç istiyor ve BODYSTEP bunu gerçekleştiriyor.  Onlara aradıkları fiziksel sonuçları verir ve eğitmenlerinizi ve üyelerinizi motive eden ve egzersizlerinden birlikte zevk alan eğlenceli ve canlandırıcı bir programdır.',
				type: 'Kardiyo',
				lessons: '30, 45 veya 55 dakika.  Canlı ve Talep Üzerine',
				equipment: 'Step ve serbest ağırlıklar',
				for: 'Herkes',
				result:
					'Geliştirilmiş kardiyo seviyesi, bacaklar ve kalçalarda kas tonu gelişimi',
			},
			{
				title: 'LES MILLS TONE',
				logo: '/classLogo/TONE.png',
				picture: '',
				id: 'LES-MILLS-TONE',
				sum: 'Etkili güç blokları, kardiyo ve core egzersizleri sunan eğlenceli ve işlevsel bir eğitim programı mı sunmak istiyorsunuz, LES MILLS TONE tam size göre.  Bu tüm vücut antrenmanı tüm üyeleri kapsar ve kondisyon seviyeleri ne olursa olsun kendi hızlarında antrenman yapmalarına olanak tanır.',
				description:
					'LES MILLS TONE, güç, kardiyo ve core antrenman bloklarını tek bir eksiksiz ve kullanışlı antrenmanda birleştirir.\nLES MILLS TONE antrenmanı, tüm vücudu çalıştırmak ve kalp atış hızını yükseltmek için bir dizi egzersiz içerir.  Çoklu zirve antrenmanı, enerji seviyelerini, esnekliği, dengeyi, çevikliği ve çekirdek gücünü geliştirirken kalori yakmaya ve zindelik ve güç oluşturmaya yardımcı olur.  Üyeler, her yönden fonksiyonel zindelik için kendilerini güçlenmiş hissederek ayrılırlar.',
				whyMember:
					'LES MILLS TONE, çok çeşitli fitness seviyelerine uyacak şekilde tasarlandığından, yüksek performanslı sonuçlar yerine güçlendirici ve kapsayıcı, hepsi bir arada fitness deneyimi arayan üyeler için iyi çalışır.  Ve LES MILLS Eğitmenleri, her seviyedeki üyeye ilham verici ve güvenli bir antrenman sunmak için özel olarak eğitilmiştir.\nKardiyo, güç ve temel antrenman kombinasyonu, aynı zamanda zamanı kısıtlı üyeler için harika bir seçenek haline getiriyor - bir seferde üç antrenman seansı alabilirler. Daha fazla zaman esnekliğine sahip üyeler arasında genellikle popüler olduğundan, programınızdaki yoğun olmayan zamanlar için harika bir seçenektir.',
				whyYou:
					'LES MILLS TONE geniş bir kitleye sahiptir, bu nedenle her türden üyeyi kendine çeker.  Katılımcıların kendi hızlarında çalışabilmeleri için tasarlanmış olup, grup kondisyonuna harika bir giriş noktasıdır ve diğer LES MILLS programlarına bir basamak olabilir.',
				type: 'Cross Training: Güç, Kardiyo ve Core',
				lessons: '45 dakika',
				equipment: 'Direnç bandı ve hafif serbest ağırlıklar',
				for: 'Herkes',
				result: 'Güç, kardiyo ve Core antrenmanı',
			},
			{
				title: 'THE TRIP',
				logo: '/classLogo/THE-TRIP.png',
				picture: '',
				id: 'THE-TRIP',
				sum: 'THE TRIP gibisini bulamazsınız!  Bu, bizim efor-eğlence dediğimiz kondisyonun geleceğine bir yolculuktur.  Sinemadan, canlı konser deneyimlerinden ve etkileşimli oyunlardan ilham alan THE TRIP, amaca yönelik bir stüdyo, canlı eğitmenler ve sürükleyici videoyu birleştiren sürükleyici bir fitness deneyimidir.  Bu antrenmanın potansiyeli sınırsızdır.',
				description:
					'THE TRIP™, 40 dakikalık Çoklu zirve bisiklet antrenmanını dijital olarak yaratılmış dünyalarda bir yolculukla birleştiren, tamamen sürükleyici bir antrenman deneyimidir.  THE TRIP, sinema bilgisayarındaki ekran ve ses sistemi ile motivasyonu ve enerji çıkışını bir üst seviyeye taşıyarak ciddi kalori yakıyor.',
				whyMember:
					'THE TRIP, üyeleriniz için gerçekten benzersiz ve kalıcı bir şey sunmak için, diğer kulüplerde benzeri olmayan bir fırsattır.  Giderek artan bir şekilde, Millennial ve Gen Z üyeleri, kulüplerde sadece bir egzersiz değil, deneyimler arama ve fitness konusunda yeni olan üyeler, bu egzersiz "hissi" olmadan sonuç vermeye başlayacak.  Üyeleriniz yeni deneyimler için can atıyorsa ve ortalama bir antrenmandan maksimum talep ediyorsa, cevap THE TRIP\'tir.',
				whyYou:
					"THE TRIP'i kullanan  bir stüdyo kurmak, sizin mevcut üyelerinizi heyecanlandıracak ve tamamen yeni bir şey deneyimlemek isteyen potansiyel üyeleri çekecek kesinlikle eşsiz bir teklif sunuyor.  Ve her üç ayda bir yayınlanan yeni içerikle, üyeleriniz için THE TRIP deneyiminin heyecanını taze tutabilirsiniz.",
				type: 'Sürükleyici fitness ve Cycle',
				lessons: '40 dakika. Canlı ve Talep Üzerine.',
				equipment: 'Sürükleyici fitness stüdyosu',
				for: 'Herkes',
				result: 'Geliştirilmiş kardiyo kondisyon',
			},
			{
				title: 'LES MILLS BARRE',
				logo: '/classLogo/BARRE.png',
				picture: '',
				id: 'LES-MILLS-BARRE',
				sum: "Bale için eğitim almış veya sadece yeni bir kendini ifade etme arayışında olan herkes LES MILLS BARRE'yi sevecektir.  Üyeleriniz için geleneksel bale barından kurtulmuş, benzersiz bir şekilde zarif bir kuvvet ve stabilite antrenmanı olan LES MILLS BARRE, harika yağ yakımı sağlar.",
				description:
					'LES MILLS BARRE™, klasik bale eğitiminin modern bir ifadesidir;  kasları şekillendirmek ve sıkılaştırmak, core gücü oluşturmak ve üyelerinizin günlük hayattan kaçmalarını sağlamak için tasarlanmış 30 dakikalık bir egzersiz.',
				whyMember:
					'Güzel zayıf demek değildir.  Bale dansçıları dünyanın en güçlü sporcularıdır, zarafetleri yoğun eğitimle şekillenir.  LES MILLS BARRE zarafet duygularını kaybetmeden gerçek güç ve core stabilitesi oluşturmak isteyen üyelere hitap ediyor.\nÜyeleriniz Bale dersinden kaçınmak ve  sadece farklı bir egzersiz deneyimi arıyorlarsa, LES MILLS BARRE sıradanlıktan kaçmak ve inanılmaz fiziksel sonuçlar veren etkileyici, güzel bir antrenmanda kendilerini kaybetmek için mükemmel bir yoldur.',
				whyYou:
					'LES MILLS BARRE, mevcut üyeleriniz için yeni bir deneyim sağlayan ve sizi daha önce düşünmemiş olabilecek bir izleyici kitlesinin ilgisini çeken, güzel hazırlanmış ve otantik baleden ilham alan bir antrenman sunuyor.\nAyrıca, kulübünüzün yerel butik stüdyolara karşı rekabet etmesine yardımcı olacak, dans geçmişi olan Eğitmenlerin yeteneklerinden yararlanacak ve onlara kulübünüzün izleyici kitlesini geliştirmenize ve büyütmenize yardımcı olacak yeni bir fırsat sunan yeni, trend bir antrenman ekliyor.  .\nBale barınız yoksa kurmanıza gerek yok.  Üyelerin, antrenmanı tamamlamaları için yalnızca iki küçük el ağırlığına ve özellikle core gücüne ihtiyaçları vardır.',
				type: 'Dans',
				lessons: '30 dakika.  Canlı ve Talep Üzerine.',
				equipment: '2 küçük el ağırlığı',
				for: '',
				result: 'Artan güç ve kararlılık, güçlenme',
			},
		],
		'ÇOCUK VE GENÇ PROGRAMLARI': [
			{
				title: 'BORN TO MOVE',
				logo: '/classLogo/BORNTOMOVE.png',
				picture: '',
				id: 'BORN-TO-MOVE',
				subTitles: [
					'BORN TO MOVE 2-3 YAŞ',
					'BORN TO MOVE 4-5 YAŞ',
					'BORN TO MOVE 6-7 YAŞ',
					'BORN TO MOVE 8-12 YAŞ',
					'BORN TO MOVE 13-16 YAŞ',
				],
				sum: "Modern yaşam, çocukları aktif tutmayı zorlaştırıyor.  Ancak genç yaşta sağlıklı alışkanlıklar edinmenin ömür boyu sürecek faydaları vardır.  Bu nedenle, gençlerin hareket yoluyla daha mutlu ve sağlıklı olmalarına yardımcı olmak için tasarlanmış, her yaşa uygun programlanmış bir ders olan BORN TO MOVE'u yarattık.",
				description:
					"BORN TO MOVE™, farklı yaş grupları 2-3 yaş, 4-5, 6-7, 8-12 ve 13-16 için hareket serilerinden oluşan bir derstir.\nÇocuklarımız, yeni nesil fark yaratanlar, motive edenler, liderler ve karar vericilerdir.  Onları desteklemenin en iyi yolu, sağlıklı ve aktif bir yaşam sürmelerine yardımcı olmaktır.  Bu nedenle de BORN TO MOVE'u yarattık.  Harika müzik ve tamamen çocuklara yönelik eğlenceli hareketlerle yüksek enerji sınıfları.",
				why: "Bir spor salonu veya sağlık kulübüyseniz, üyeleriniz kendi sağlıklarıyla ilgilenmek ister.  Ve eğer ebeveyn iseler, muhtemelen çocukları için neyin sağlıklı olduğunun da bilincinde olacaklardır.  BORN TO MOVE, kulübünüzü çocuklu üyeler için daha da çekici hale getirebilecek benzersiz bir tekliftir.  Akıllı zamanlama, çocuklar BORN TO MOVE'un keyfini çıkarırken ebeveynlerin en sevdikleri antrenmanları yapmaları için fırsatlar yaratabilir.\nBir okul veya topluluk grubuysanız, çocuklara daha sağlıklı, daha aktif bir yaşam sürmeleri için fırsatlar vermek, yaptığınız işin hayati bir parçasıdır.  BORN TO MOVE, özel olarak eğitilmiş LES MILLS eğitmenleri tarafından yönetilen, organize sporun rekabetçi baskıları olmadan çocukları aktif tutmak için size kolay bir seçenek sunar.\nHepimizin daha iyi bir geleceği şekillendirmeye yardımcı olma sorumluluğu var.  Küresel bir topluluk olarak, gelecek nesiller için yapabileceğimiz en iyi şeylerden biri, onların daha mutlu ve sağlıklı yaşamlar sürmelerine yardımcı olmaktır.  BORN TO MOVE, çocuklara daha iyi bir gelecek sağlamak için özel olarak oluşturulmuş, profesyonelce tasarlanmış, dünya çapında başarılı, bilimsel olarak kanıtlanmış bir program sunar.",
				type: 'Çocuk ve Gençlerin Eğitimi',
				lessons:
					'Dersler 30 ile 55 dakika arasında değişmektedir.  Canlı, Sanal ve İsteğe Bağlı.',
				equipment: 'Yok',
				for: '2-16 yaş arası çocuklar ve gençler',
				result: 'Güven, enerji, sağlıklı bedenler ve zihinler',
			},
		],
		'YÜKSEK YOĞUNLUKLU INTERVAL PROGRAMLAR': [
			{
				title: 'LES MILLS SPRINT',
				logo: '/classLogo/SPRINT.png',
				picture: '',
				id: 'LES-MILLS-SPRINT',
				sum: "Bisiklet stüdyonuzda yeni bir challenge sunmak ister misiniz?  LES MILLS SPRINT, hızlı sonuçlar veren yüksek yoğunluklu bir antrenman olan bisiklet üzerinde HIIT'tir.  Heyecan ve motivasyonun fiziksel ve zihinsel sınırları zorlamaktan geldiği kısa, yoğun bir eğitim tarzıdır.",
				description:
					'LES MILLS SPRINT™, hızlı sonuçlar elde etmek için kapalı alan bisikletinin kullanıldığı 30 dakikalık bir Yüksek Yoğunluklu Aralıklı Antrenman (HIIT) antrenmanıdır.\nHIIT eğitiminin, kulüp üyelerinin sınırları zorlaması ve sonuçları görmesi için en etkili yol olduğu bilimsel olarak kanıtlanmıştır.  Her antrenman, üyeleri zorlamak için en son müzik ve eğitim tekniklerini kullanır, mümkün olduğunca sıkı çalıştıkları yoğunluk yüklemeleri, onları bir sonraki yüklemeye hazırlayan dinlenme dönemleriyle birleştirir.',
				whyMember:
					"LES MILLS SPRINT antrenmanı yapmak için harcanan 30 dakika, vücudun saatlerce kalori yakmasını sağlar.  Bu zorlu bir antrenman, ancak getirisi, fitness hedeflerini gerçekleştirmek için hızlı bir yoldur.\nLES MILLS SPRINT, RPM'den hoşlanan ancak yeni bir challange arayan üyeler için çıtayı yükseltmenin ideal bir yoludur.  Özel olarak eğitilmiş LES MILLS SPRINT koçları, üyelerinizi daha önce hiç görmedikleri sonuçlara ulaşmaları için motive edecek ve yönlendirecektir.",
				whyYou:
					"Sadece 30 dakika olduğu ama inanılmaz derecede etkili olduğu için, zamanı az olan üyeler bunu değerli zamanlarını harcamak için daha iyi bir yol olarak görecekler.  Kısa sınıf uzunluğu, en yüksek talebi karşılamak için daha sık planlayabileceğiniz anlamına gelir ve bu, ders teklifinizden onlara daha fazla çeşitlilik sağlar.\nLES MILLS SPRINT'i sunmak, butik cycle stüdyolarından, özellikle de hızlı sonuç veren ve rutinlerine kolayca uyan antrenmanlar isteyen Y kuşağı üyelerini kazanmak için bir fırsattır.  HIIT antrenmanları, etkinliklerini destekleyen bilimle dünya çapında büyüyen bir trend, bu nedenle giderek daha fazla üye onları arıyor.  Halihazırda bir cycle stüdyonuz varsa, LES MILLS SPRINT, HIIT'i zaman çizelgenize eklemenin basit bir yoludur.",
				type: 'Yüksek Yoğunluklu Aralıklı Egzersiz (H.I.I.T)ve Döngü',
				lessons: '30 dakika.  Canlı ve Talep Üzerine.',
				equipment: 'Indoor Bike',
				for: 'Herkes',
				result: 'Geliştirilmiş kardiyovasküler kondisyon, Artan kalori yakımı',
			},
			{
				title: 'LES MILLS GRIT',
				logo: '/classLogo/GRIT.png',
				picture: '',
				id: 'LES-MILLS-GRIT',
				subTitles: ['GRIT Strenght', 'GRIT Cardio', 'GRIT Athletic'],
				sum: 'Üyeler sonuç istiyor.  Ve hiçbir şey, yoğun, atletik antrenman yoluyla inanılmaz sonuçlar vermek için bilimsel olarak tasarlanmış 30 dakikalık HIIT antrenman serimiz LES MILLS GRIT kadar sonuç veremez.  Bu Kardiyo, Kuvvet ve Atletik antrenmanlar, üyelerinizin daha hızlı ve daha fit olmalarını sağlayacaktır.',
				description:
					'LES MILLS GRIT™, hızlı bir şekilde inanılmaz fitness sonuçları sağlayan 30 dakikalık yüksek yoğunluklu interval  (HIIT) antrenmanları serisidir.\nLES MILLS GRIT antrenmanlarının her biri - Kardiyo, Kuvvet ve Atletik - vücudu farklı şekillerde çalıştırmak için tasarlanmıştır.  Üçü de, üyelerinizi fitness yolculuklarında daha ileriye taşımak ve  motive etmek için en iyi eğitim tekniklerini, müziği ve egzersiz koreografisini kullanır.',
				whyMember:
					'LES MILLS GRIT serisi, kondisyonunuzu bir sonraki seviyeye taşımak için bilimsel olarak tasarlanmıştır.  Vücudu aerobik zindeliği artırmaya yönlendirir, hızlı kasılan kas liflerini serbest bırakır ve yağ yakarak yağsız kas dokusunun büyümesine yardımcı olur.\n30 dakikalık bir antrenman olarak LES MILLS GRIT, minimum sürede maksimum sonuç isteyen üyeler, özellikle de Y kuşağı izleyicileri için idealdir.  Ve hedeflerine odaklanmalarını sağlamak için zaman çizelgeniz boyunca haftada birden fazla sınıf planlayabilirsiniz - sonuçları gördüklerinde, bağımlısı olacaklar. Özel olarak eğitilmiş LES MILLS GRIT koçları, üyelerinizi daha önce hiç görmedikleri sonuçlara ulaşmaları için motive edecek ve yönlendirecektir.',
				whyYou:
					"İşletmenize sağlayacağı fayda basittir.  Üyeler, GRIT'in sunduğu sonuçları ister ve sonuçlar elde tutmayı sağlar.  30 dakika uzunluğunda, talebi karşılamak için daha fazla ders planlayabilirsiniz.  Kardiyo, Güç ve Atletik seçenekleri, programınızın temelde üç programdan oluşması anlamına gelir ve size zaman çizelgeniz için daha fazla çeşitlilik sunar.  Ve özel bir HIIT teklifiyle, butik stüdyoları kendi oyunlarında yenebilir ve kalıcı ve sadık üyelikler kazanabilirsiniz.",
				type: 'Yüksek Yoğunluklu Aralıklı Antrenman (H.I.I.T)',
				lessons: '30 dakika.  Canlı, Sanal ve İsteğe Bağlı.',
				equipment:
					'\nSerbest ağırlıklar (GRIT CARDIO)\nStep, halter ve serbest ağırlıklar (GRIT STRENGTH)\nStep ve serbest ağırlıklar (GRIT Athletic)',
				for: 'Kondisyonlarını bir sonraki seviyeye taşımak isteyen üyeler',
				result:
					'Geliştirilmiş kardiyo zindeliği ve çevikliği, yağsız kas büyümesi, artan kalori yakma ve yağ kaybı',
			},
		],
	};
	return lesMillsPrograms;
}
export default LesmillsPrograms;
