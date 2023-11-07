import PropTypes from 'prop-types';
const PdfPreview = ({ pdfLink }) => {
  const isGoogleDriveLink = pdfLink.includes('https://drive.google.com');

  return (
    <div className="pdf-preview">
      {isGoogleDriveLink ? (
        <iframe
          src={pdfLink.replace('/view', '/preview')}
          width="100%"
          height="500"
          title="PDF Preview"
        ></iframe>
      ) : (
        <iframe
          src={pdfLink}
          width="100%"
          height="500"
          title="PDF Preview"
        ></iframe>
      )}
    </div>
  );
};
PdfPreview.propTypes = {
    pdfLink: PropTypes.string.isRequired,
  };
export default PdfPreview;
