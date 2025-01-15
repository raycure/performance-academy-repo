import React, { useEffect, useState } from 'react';
import './Cookies.css';
import { useTranslation } from 'react-i18next';
const CookieConsent = () => {
	const [showBanner, setShowBanner] = useState(false);
	const [isAccepted, setIsAccepted] = useState(false);
	const { i18n } = useTranslation('');
	useEffect(() => {
		const consent = localStorage.getItem('cookieConsent');
		if (consent !== 'accepted') {
			setShowBanner(true);
		} else {
			setIsAccepted(true);
		}
	}, []);
	const handleAccept = () => {
		setIsAccepted(true);
		setShowBanner(false);
		localStorage.setItem('cookieConsent', 'accepted');
	};

	if (!showBanner) return null;

	return (
		<div className='cookiesBanner user-select-none bg-primary-300'>
			{i18n.language === 'en' ? (
				<p>
					This website uses only essential cookies. For more information, please
					see our <a href='/kişisel-verilerin-korunması'>Privacy Policy</a>. By
					clicking 'Accept,' you consent to the use of these cookies.
				</p>
			) : (
				<p>
					Bu web sitesi yalnızca gerekli çerezleri kullanmaktadır. Daha fazla
					bilgi için lütfen
					<a href='/kişisel-verilerin-korunması'> Gizlilik Politikamızı </a>
					inceleyin. 'Kabul Et' butonuna tıklayarak bu çerezlerin kullanımını
					kabul etmiş olursunuz.
				</p>
			)}

			<button className='cookiesButton bg-accent-400' onClick={handleAccept}>
				{i18n.language === 'en' ? 'Accept' : 'Kabul Et'}
			</button>
		</div>
	);
};

export default CookieConsent;

{
	/* <div className='bottom-space'>
			<p>
				Genel Kullanılmakta olan Internet tarayıcısı aracılığı ile
				Internet ağ sunucusu tarafından kullanıcıların cihazlarına
				gönderilen küçük veri dosyaları çerez olarak anılmakta olup,
				Internet siteleri bu çerezler vasıtası ile kullanıcıları
				tanımaktadır. Çerezlerin ömrü tarayıcı ayarlarına bağlı olarak
				farklılaşmaktadır. Bu çerezler, Banka tarafından yönetilmekte
				olan sistemler aracılığıyla oluşturulmakla birlikte, aynı
				zamanda Banka tarafından yetkilendirilen bazı hizmet
				sağlayıcılar kullanıcıların cihazlarına benzeri teknolojiler
				yerleştirerek IP adresi, benzersiz tanımlayıcı ve cihaz
				tanımlayıcı bilgileri edinebilmektedir. Ayrıca, Banka
				sistemlerinde bulunan üçüncü taraflara ait linkler, bu üçüncü
				taraflara ait gizlilik politikalarına tabi olmakla birlikte,
				gizlilik uygulamalarına ait sorumluluk Banka’ya ait olmamaktadır
				ve bu bağlamda ilgili link kapsamındaki site ziyaret edildiğinde
				siteye ait gizlilik politikasının okunması önerilmektedir. Çerez
				Türleri Ana kullanım amacı kullanıcılara kolaylık sağlamak olan
				çerezler, temel olarak 4 ana grupta toplanmaktadır: Oturum
				Çerezleri: Internet sayfaları arasında bilgi taşınması ve
				kullanıcı tarafından girilen bilgilerin sistemsel olarak
				hatırlanması gibi çeşitli özelliklerden faydalanmaya olanak
				sağlayan çerezlerdir ve Banka. Internet sitesine ait
				fonksiyonların düzgün bir şekilde işleyebilmesi için gereklidir.
				Performans Çerezleri: Sayfaların ziyaret edilme frekansı, olası
				hata iletileri, kullanıcıların ilgili sayfada harcadıkları
				toplam zaman ile birlikte siteyi kullanım desenleri konularında
				bilgi toplayan çerezlerdir ve Banka Internet sitesinin
				performansını arttırma amacıyla kullanılmaktadır. Fonksiyonel
				Çerezler: Kullanıcıya kolaylık sağlanması amacıyla önceden
				seçili olan seçeneklerin hatırlatılmasını sağlayan çerezlerdir
				ve Banka Internet sitesi kapsamında kullanıcılara gelişmiş
				Internet özellikleri sağlanmasını hedeflemektedir. Reklam Ve
				Üçüncü Taraf Çerezleri: Üçüncü parti tedarikçilere ait
				çerezlerdir ve Banka Internet sitesindeki bazı fonksiyonların
				kullanımına ve reklam takibinin yapılmasına olanak
				sağlamaktadır. Çerezlerin Kullanım Amaçları Bankamız tarafından
				kullanılmakta olan çerezlere ait kullanım amaçları aşağıdaki
				gibidir: Operasyonel amaçlı kullanımlar: Bankamız, sistemlerinin
				idaresi ve güvenliğinin sağlanması amacıyla, bu sitedeki
				fonksiyonlardan yararlanmayı sağlayan veyahut düzensiz
				davranışları tespit eden çerezler kullanabilmektedir.
				İşlevselliğe yönelik kullanımlar: Bankamız, sistemlerinin
				kullanımını kolaylaştırmak ve kullanıcı özelinde kullanım
				özellikleri sağlamak amacıyla, kullanıcıların bilgilerini ve
				geçmiş seçimlerini hatırlatan çerezler kullanabilmektedir.
				Performansa yönelik kullanımlar: Bankamız, sistemlerinin
				performansının artırılması ve ölçülmesi amacıyla, gönderilen
				iletilerle olan etkileşimi ve kullanıcı davranışlarını
				değerlendiren ve analiz eden çerezler kullanabilmektedir. Reklam
				amaçlı kullanımlar: Bankamız, kendine veya üçüncü taraflara ait
				sistemlerin üzerinden kullanıcıların ilgi alanları kapsamında
				reklam ve benzeri içeriklerin iletilmesi amacıyla, bu
				reklamların etkinliğini ölçen veya tıklanma durumunu analiz eden
				çerezler kullanabilmektedir. Çerezleri Devre Dışı Bırakmak Çerez
				kullanımı birçok tarayıcıda önceden tanımlı bir şekilde seçili
				olarak bulunmaktadır ve kullanıcılar bu seçim durumunu tarayıcı
				ayarlarından değiştirebilmekte ve dolayısıyla mevcut çerezleri
				silip ileriki çerez kullanımlarını da reddedebilmektedir;
				nitekim çerez kullanımının iptal edilmesi halinde, Banka
				sistemlerindeki bir takım özelliklerden faydalanılamaması söz
				konusu olabilmektedir. Çerez kullanım seçiminin değiştirilmesine
				ait yöntem, tarayıcı tipine bağlı olarak değişmekte olup, ilgili
				hizmet sağlayıcıdan dilendiği zaman öğrenilebilmektedir. Web
				Sitesinde Bulunan Bilgi ve Materyal Bankamız web sitesinde
				bulunan bilgi, materyal ve bunların düzenlenmesi konusundaki
				telif hakları yine Bankamıza aittir. Web sitemizde yer alan ve
				üçüncü şahıslara ait materyaller dışında kalan bilgi ve
				materyale dair tüm telif hakları, tescilli marka, patent, fikri
				ve sair mülkiyet hakları Bankamızda saklıdır.
			</p>
		</div> */
}
