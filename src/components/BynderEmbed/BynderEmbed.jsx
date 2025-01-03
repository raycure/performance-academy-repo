import React, { useEffect } from 'react';

const BynderEmbed = ({
	mediaId,
	width = '',
	accountUrl,
	language,
	autoplay = 'false',
	styleProp,
}) => {
	useEffect(() => {
		// Check if the script loaded
		if (!document.getElementById('bynder-Embeds-js')) {
			const script = document.createElement('script');
			script.id = 'bynder-widgets-js';
			script.src =
				'https://d8ejoa1fys2rk.cloudfront.net/bynder-embed/latest/bynder-embed.js';
			script.setAttribute('data-account-url', accountUrl);
			script.setAttribute('data-language', language);
			document.body.appendChild(script);
		}
	}, [mediaId, accountUrl, language]);

	return (
		<div
			style={{ ...styleProp }}
			data-bynder-widget='video-item'
			data-media-id={mediaId}
			data-width={width}
			data-autoplay={autoplay}
		></div>
	);
};

export default BynderEmbed;
