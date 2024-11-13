import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LesmillsPrograms from '../../assets/LesmillsPrograms';

function UserInfo() {
	const { t } = useTranslation('programs');
	const lesMillsPrograms = LesmillsPrograms();

	const programCategories = [
		{
			label: t('cat1.title'),
			selector: t('cat1.title'),
		},
		{
			label: t('cat2.title'),
			selector: t('cat2.title'),
		},
		{
			label: t('cat3.title'),
			selector: t('cat3.title'),
		},
	];

	const [programImages, setProgramImages] = useState([]);

	useEffect(() => {
		const processedImages = Object.entries(lesMillsPrograms).map(
			([category, programs]) => ({
				category,
				programs: programs.map((program) => ({
					title: program.title,
					images: program.additionalPictures || [],
				})),
			})
		);

		setProgramImages(processedImages);
	}, [lesMillsPrograms]);

	return (
		<div className='p-4'>
			{programImages.map((category, categoryIndex) => (
				<div key={categoryIndex} className='mb-8'>
					<h2 className='text-xl font-bold mb-4'>
						{programCategories[categoryIndex]?.label || category.category}
					</h2>

					{category.programs.map((program, programIndex) => (
						<div key={programIndex} className='mb-6'>
							<h3 className='text-lg font-semibold mb-3'>{program.title}</h3>

							<div className='flex flex-wrap gap-4'>
								{program.images.map((image, imageIndex) => (
									<img
										key={imageIndex}
										src={image.url}
										alt={
											image.alt || `${program.title} image ${imageIndex + 1}`
										}
										className='w-48 h-48 rounded-lg object-cover'
										loading='lazy'
									/>
								))}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default UserInfo;
