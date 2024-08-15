import React from 'react';

const Banner = () => {
	return (
		<div className='banner text-primary-400'>
			<div className='bannerContent'>
				<div className='fs-secondary-heading center-item'>
					DÜNYANIN EN İYİ ANTRENMANLARINI OLUŞTURUYORUZ.
				</div>
				<div className='even-columns'>
					<div style={{ width: 'fit-content' }}>
						<p className='test' data-width='wide'>
							140.000 eğitmenden oluşan ekibimizi, kendi
							büyüklüklerini keşfederken ve diğerlerine ellerinden
							gelenin en iyisi olmaları için ilham verirken
							destekliyoruz.
						</p>
					</div>
					<div style={{ width: 'fit-content' }}>
						<p className='test' data-width='wide'>
							Dünya çapında 20.000 kulüple ortaklık yaparak, dünya
							lideri grup fitness'ı sunmayı kolaylaştırıyoruz ve
							üyelerin fitness'a aşık olmasına yardımcı oluyoruz.
						</p>
					</div>
					<div style={{ width: 'fit-content' }}>
						<p className='test' data-width='wide'>
							Dünyanın en iyi müziği, en iyi hareketleri ve en iyi
							eğitmenleri. Bilim tarafından şekillendirilen,
							yaşamı değiştiren fitness deneyimini oluşturmak için
							hepsini bir araya getiriyoruz.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
