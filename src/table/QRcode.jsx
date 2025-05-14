import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@mui/material';

const QRCodeGenerator = ({ tablenumber }) => {
  const url = `https://lanchan-restaurant-frontend.vercel.app/${tablenumber}/menu_order`;
  const qrRef = useRef();

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/jpg');

    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `table_${tablenumber}_qrcode.jpg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ textAlign: 'center', margin: '10px',overflowX:'auto' }} ref={qrRef}>
      <QRCodeCanvas value={url} size={130} />
      <p>{url}</p>
      <Button
        variant="outlined"
        size="small"
        onClick={downloadQRCode}
        sx={{ mt: 1 }}
      >
        ดาวน์โหลด QR code
      </Button>
    </div>
  );
};

export default QRCodeGenerator;
