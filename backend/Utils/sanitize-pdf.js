import PDFDocument from 'pdf-lib';
const sanitizePdf = async (file) => {
	const pdfDoc = await PDFDocument.load(file.buffer);
	pdfDoc.removeForms();
	pdfDoc.removeJavaScript();
	pdfDoc.removeAnnotations();

	const pages = await pdfDoc.getPages();
	for (const page of pages) {
		const links = await page.getLinks();
		for (const link of links) {
			if (link.url && link.url.startsWith('http')) {
				await page.removeLink(link);
			}
		}
	}

	const embeddedFiles = await pdfDoc.getEmbeddedFiles();
	for (const file of embeddedFiles) {
		await pdfDoc.removeEmbeddedFile(file);
	}

	return await pdfDoc.save();
};

export default sanitizePdf;
