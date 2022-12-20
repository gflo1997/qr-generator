import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import BackgroundAnimation from "./BackgroundAnimation";
import './QRGenerator.css'

const QRGenerator = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef();
  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };
  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#fff"}
      level={"H"}
    />
  );
  return (
    <div>
      <div class="context">
        
        <div className="welcomeText">
          <h1 className="title">QR Wizard</h1>
          <h2 className="subtitle">Generate QR Codes on the Spot</h2>
          <h3 className="paragraph">
            Welcome to Instant QR, the fastest and easiest way to generate QR
            codes on the spot! With our user-friendly platform, you can create
            custom QR codes in just a few clicks. Whether you're a business
            owner looking to streamline your marketing efforts or an individual
            looking to share contact information quickly and easily, our QR code
            generator has you covered. Simply choose your desired data type
            (e.g. text, URL, email, etc.), input your information, and let our
            tool do the rest. In no time at all, you'll have a professional,
            high-quality QR code ready to use. Try it out now and see the power
            of Instant QR for yourself!
          </h3>
        </div>
        <div className="qrcode__container">
          <div className="input__group">
            <form onSubmit={downloadQRCode}>
              <label>Enter URL</label>
              <input
                type="text"
                value={url}
                onChange={qrCodeEncoder}
                placeholder="www.example.com"
              />
              <button className="center-btn" type="submit" disabled={!url}>
                Download QR code
              </button>
            </form>
          </div>
          <div className="qr-center" ref={qrRef}>
            {qrcode}
          </div>
        </div>
      </div>
      <BackgroundAnimation />
    </div>
  );
};

export default QRGenerator;
