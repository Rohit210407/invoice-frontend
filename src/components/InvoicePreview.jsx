import { forwardRef } from "react";
import { formatInvoiceData } from "../utils/formatInvoiceData.js";
import { templateComponents } from "../utils/invoiceTemplates.js";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
  const formattedData = formatInvoiceData(invoiceData);

  // Serialize raw invoice data for public sharing and auto-download on scan
  let qrCodeUrl = "";
  try {
    // CRITICAL: Strip large base64 image logo and thumbnail strings to keep the QR payload lightweight and readable!
    const sanitizedData = {
      ...invoiceData,
      logo: "", 
      thumbnailUrl: ""
    };
    const rawString = JSON.stringify(sanitizedData);
    const serialized = btoa(unescape(encodeURIComponent(rawString)));
    const origin = typeof window !== "undefined" ? window.location.origin : "https://smartinvoice.vercel.app";
    const qrData = `${origin}/preview?data=${serialized}&download=true`;
    qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}&color=111827&bgcolor=ffffff`;
  } catch (err) {
    console.error("Failed to generate QR Code URL", err);
  }

  // Inject qrCodeUrl into formatted data
  formattedData.qrCodeUrl = qrCodeUrl;

  const SelectedTemplate =
    templateComponents[template] || templateComponents["template1"];

  return (
    <div
      ref={ref}
      className="invoice-preview container px-2 py-3 overflow-x-auto"
    >
      <SelectedTemplate data={formattedData} />
    </div>
  );
});

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;
