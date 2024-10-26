import { jsPDF } from 'jspdf';
import { getBase64ImageFromURL } from './convertImage';

export async function generateInvoicePDF(data: any) {
  const pdf = new jsPDF();

  try {
    const logoUrl = data.imageUrl; 
    const logoBase64 = await getBase64ImageFromURL(logoUrl);
    pdf.addImage(`data:image/png;base64,${logoBase64}`, 'PNG', 10, 10, 50, 30); 
  } catch (error) {
    console.error("Failed to add logo image to PDF:", error);
  }

  pdf.setFontSize(18);
  
  
  pdf.text('Invoice', 200, 23, { align: 'right' });
  
  
  pdf.setLineWidth(0.5);
  pdf.line(10, 42, 200, 42);
 

  pdf.setFontSize(12);
  pdf.text(data.fromHead || 'From:', 10, 50);
  pdf.text(data.from, 10, 55);
  pdf.text(data.toHead || 'To:', 150, 50);
  pdf.text(data.to, 150, 55);
  pdf.text(`Invoice #: ${data.invoiceNumber}`, 10, 70);
  pdf.text(`Date: ${data.invoiceDate}`, 10, 75);
  pdf.text(`Due Date: ${data.dueDate}`, 10, 80);

 
  pdf.text('No', 10, 95);
  pdf.text('Description', 20, 95);
  pdf.text('Quantity', 90, 95);
  pdf.text('Rate', 130, 95);
  pdf.text('Total', 170, 95);
  

  pdf.setLineWidth(0.5);
  pdf.line(10, 98, 200, 98); 

  let yOffset = 105;
  data.items.forEach((item: any,index:any) => {
    pdf.text(`${index+1}`, 10, yOffset);
    pdf.text(item.description, 20, yOffset);
    pdf.text(item.quantity.toString(), 90, yOffset);
    pdf.text(item.rate.toFixed(2), 130, yOffset);
    pdf.text((item.quantity * item.rate).toFixed(2), 170, yOffset);
    yOffset += 10;
  });


  pdf.setLineWidth(1);
  pdf.line(10, yOffset - 5, 200, yOffset - 5); 

  yOffset += 10;
  pdf.text(`Subtotal: ${data.subtotal.toFixed(2)}`, 130, yOffset);
  yOffset += 10;
  pdf.text(`Tax: ${data.tax.toFixed(2)}%`, 130, yOffset);
  yOffset += 10;
  pdf.text(`Discount: ${data.discount.toFixed(2)}`, 130, yOffset);
  yOffset += 10;
  pdf.text(`Shipping: ${data.shipping.toFixed(2)}`, 130, yOffset);

  yOffset += 10;
  pdf.text(`Total: ${data.total.toFixed(2)}`, 130, yOffset);
  yOffset += 10;
  pdf.text(`Amount Paid: ${data.amountPaid.toFixed(2)}`, 130, yOffset);
  yOffset += 10;
  pdf.text(`Balance Due: ${data.balanceDue.toFixed(2)}`, 130, yOffset);

  yOffset += 20;
  pdf.setFontSize(10);
  pdf.text(data.termsHead || 'Terms:', 10, yOffset);
  yOffset += 5;
  pdf.text(data.terms || '', 10, yOffset);
  yOffset += 10;
  pdf.text(data.footnoteHead || 'Foot Note:', 10, yOffset);
  yOffset += 5;
  pdf.text(data.footnote || '', 10, yOffset);

  return pdf.output('arraybuffer');
}
