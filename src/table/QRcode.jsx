import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ tablenumber }) => {
  const url = `http://localhost:3001/${tablenumber}/menu_order`;

  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <QRCodeCanvas value={url} size={64} />
      <p>{url}</p>
    </div>
  );
};

export default QRCodeGenerator;
