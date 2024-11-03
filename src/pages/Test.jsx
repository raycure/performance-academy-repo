// import React from 'react';
// // import './testStyle.css';
// // import './Register-Login/formStyle.css';/
// import Notification from '../components/Notification/Notification';
// import { useState, useEffect } from 'react';
// import '../components/Notification/notificationStyle.css';

// function Test() {
// 	const [notification, setNotification] = useState(null);

// 	const showNotification = (message, type) => {
// 		setNotification({ message, type });
// 	};

// 	const handleCloseNotification = () => {
// 		setNotification(null);
// 	};

// 	return (
// 		// <div class='carddd'>
// 		// 	<textarea
// 		// 		className='custom-textarea'
// 		// 		placeholder='Mesajınız...'
// 		// 		rows='5'
// 		// 		data-role='none'
// 		// 	></textarea>
// 		// 	<span class='top'></span>
// 		// 	<span class='right'></span>
// 		// 	<span class='bottom'></span>
// 		// 	<span class='left'></span>
// 		// </div >
// 		<div className='testt'>
// 			<button
// 				onClick={() =>
// 					showNotification('Success! Operation completed.', 'success')
// 				}
// 			>
// 				Show Success Notification
// 			</button>
// 			<button
// 				onClick={() =>
// 					showNotification('Error! Something went wrong.', 'error')
// 				}
// 			>
// 				Show Error Notification
// 			</button>
// 			<button
// 				onClick={() =>
// 					showNotification('Info! Here is some information.', 'info')
// 				}
// 			>
// 				Show Info Notification
// 			</button>

// 			{notification && (
// 				<Notification
// 					message={notification.message}
// 					type={notification.type}
// 					onClose={handleCloseNotification}
// 				/>
// 			)}
// 		</div>
// 	);
// }

// export default Test;
<ul className='testul'>
	<li className='testListItem'>
		<CiGlobe className='testicon' />
		<h2 className='fs-minimal-heading'>Uluslararası Sertifikalar</h2>
	</li>
	<p id='testlistspan'>
		{/* Les Mills onaylı sertifikalarınız, tüm dünyada geçerli olan
						uluslararası bir standart sunarak kariyerinize yeni ve heyecan
						verici kapılar açacaktır. Bu sertifikalar, fitness ve eğitmenlik
						alanında küresel bir kalite damgası niteliğinde olup, dünyanın her
						yerindeki prestijli spor merkezleri ve sağlık kulüplerince
						tanınmaktadır. */}
		kurslarimizdan alacaginiz sertifikalar dunyanin her yerinde gecerlidir
	</p>
	<li className='testListItem'>
		<ChartNoAxesCombined className='testicon' />
		<h2 className='fs-minimal-heading'>Her Seviyeye uygun</h2>
	</li>
	<p id='testlistspan'>
		{/* İster yıllardır eğitmenlik yapıyor olun, ister yolculuğunuza yeni
						başlıyor olun, Les Mills kursları her seviyeden kullanıcıya uygun,
						kapsayıcı ve esnek eğitim programları sunmaktadır. Temel seviyeden
						profesyonel düzeye kadar, herkesin ihtiyacına ve hedefine özel
						içerikler geliştiren Les Mills, fitness dünyasında herkes için bir
						gelişim yolu sunmaktadır. Kendi hızınızda, kendi hedefinize uygun
						olarak ilerleyebileceğiniz bu programlar, size profesyonel gelişim
						için kusursuz bir platform sağlar. */}
		ister deneyimli olun ister yeni basliyor olun kurslarimiz her duzeye
		uygundur
	</p>
	<li className='testListItem'>
		<Gem className='testicon' />
		<h2 className='fs-minimal-heading'>Geleceğe Yatırım</h2>
	</li>
	<p id='testlistspan'>
		Les Mills sertifikaları, fitness endüstrisinde sadece bir eğitim değil, aynı
		zamanda geleceğe yapılmış stratejik bir yatırımdır. Hızla değişen sağlık ve
		fitness sektöründe sürekli güncellenen içerikleriyle size rekabet avantajı
		sağlayan bu kurslar, profesyonel gelişiminize uzun vadeli bir perspektif
		kazandırır. Dünya standartlarında bir eğitim modeliyle, sektörün ihtiyaç
		duyduğu nitelikleri kazanırken, aynı zamanda küresel bir kariyer hedefine
		doğru emin adımlarla ilerlersiniz.
	</p>
	<li className='testListItem'>
		<CalendarClock className='testicon' />
		<CalendarCheck2 className='testicon' />
		<Calendar1 className='testicon' />
		<CalendarFold className='testicon' />
		<Calendar className='testicon' />
		<CalendarRange className='testicon' />
		timed events
	</li>

	<li className='testListItem'>
		<HiUserGroup className='testicon' />
	</li>
</ul>;

// asil bu
