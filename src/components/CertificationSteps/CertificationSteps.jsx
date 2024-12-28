import React, { useRef, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Container from '../Containers/Container';
import { useTranslation } from 'react-i18next';
import './CertificationSteps.css';
function CertificationSteps() {
	const { t } = useTranslation('translation');
	const certificationData = [
		{
			title: t('CertificationSteps.Title.0'),
			text: t('CertificationSteps.Content.0'),
		},
		{
			title: t('CertificationSteps.Title.1'),
			text: t('CertificationSteps.Content.1'),
		},
		{
			title: t('CertificationSteps.Title.2'),
			text: t('CertificationSteps.Content.2'),
		},
		{
			title: t('CertificationSteps.Title.3'),
			text: t('CertificationSteps.Content.3'),
		},
		{
			title: t('CertificationSteps.Title.4'),
			text: t('CertificationSteps.Content.4'),
		},
	];
	const [activeStep, setActiveStep] = useState(0);
	const progressStepContainerRefs = useRef(
		certificationData.map(() => React.createRef())
	);
	const progressStepLineRefs = useRef(
		certificationData.map(() => React.createRef())
	);

	const NextStepHandler = () => {
		if (activeStep < certificationData.length - 1) {
			setActiveStep((prevStep) => prevStep + 1);
		}
		if (progressStepContainerRefs.current) {
			progressStepContainerRefs.current.forEach((ref, index) => {
				if (ref.current) {
					if (activeStep + 1 == index) {
						ref.current.classList.remove('inActiveStepNumber');
						ref.current.classList.add('activeStepNumber');
					}
				}
			});
		}
		if (progressStepLineRefs.current) {
			progressStepLineRefs.current.forEach((ref, index) => {
				if (ref.current) {
					if (activeStep == index) {
						ref.current.classList.remove('inActiveLine');
						ref.current.classList.add('activeLine');
					}
				}
			});
		}
	};

	function previousStepHandler() {
		if (activeStep > 0) {
			setActiveStep((prevStep) => prevStep - 1);
			if (progressStepContainerRefs.current) {
				progressStepContainerRefs.current.forEach((ref, index) => {
					if (ref.current) {
						if (activeStep == index) {
							ref.current.classList.add('inActiveStepNumber');
						}
					}
				});
			}
			console.log('af', activeStep);

			if (progressStepLineRefs.current) {
				progressStepLineRefs.current.forEach((ref, index) => {
					if (ref.current) {
						if (activeStep - 1 == index) {
							ref.current.classList.add('inActiveLine');
						}
					}
				});
			}
		}
	}

	return (
		<Container
			className='certftn-prcss-outer-con'
			styleProp={{ margin: '30vh auto' }}
		>
			<div className='stepText'>
				<button
					className='nextButton center-item'
					onClick={previousStepHandler}
				>
					<ArrowUp strokeWidth={1.25} />
				</button>
				<h3 className='fs-700'>{certificationData[activeStep].title}</h3>
				<p className='fs-500'>{certificationData[activeStep].text}</p>
				<button onClick={NextStepHandler} className='center-item'>
					<ArrowDown strokeWidth={1.25} />
				</button>
			</div>
			<div className='stepProgressBarContainer'>
				{certificationData.map((step, index) => (
					<div
						className='stepProgressBar'
						style={{
							marginBottom: '40px',
						}}
						key={index}
					>
						<div
							className='programStepContainers'
							style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
						>
							<span className='programStepNumbers user-select-none'>
								{index + 1}
							</span>
							<span
								className='stepNumberAnimation'
								style={{ backgroundColor: index === 0 ? 'red' : '' }}
								ref={progressStepContainerRefs.current[index]}
							></span>
							{index < 4 && <span className='progressLine'></span>}
							{index < 4 && (
								<span ref={progressStepLineRefs.current[index]}></span>
							)}
						</div>
						<h3 className='fs-600'>{step.title}</h3>
					</div>
				))}
			</div>
		</Container>
	);
}
export default CertificationSteps;
