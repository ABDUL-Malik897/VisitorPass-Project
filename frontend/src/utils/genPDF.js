import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import api from '../api';
import heroImage from "../Image/VisitorPass-logo.png";

const genPDF =  async (visitor) => {

    const doc = new jsPDF()

    console.log("Visitor received:", visitor);

    if (!visitor) {
        alert("Visitor is undefined");
        return;
    }

    const imageURL = `${api.defaults.baseURL}/upload/${visitor.Photo}`

    const getBaseImg = (url) => {
        return new Promise((resolve , reject) => {
            const img = new Image()

            img.crossOrigin = "Anonymous"

            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height

                const ctx = canvas.getContext('2d')
                ctx.drawImage(img ,0 ,0)
                resolve(canvas.toDataURL('image/jpeg'))
            }
            img.onerror = reject
            img.src = url
        })
    }

    // const qrData = 

    const qrString = JSON.stringify({visitorId : visitor._id})

    const qrImage = await QRCode.toDataURL(qrString)


    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 210, 30, "F");
    doc.addImage(heroImage,"PNG",62,10,10,10)

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("VISITOR PASS", 75, 18);

    doc.setFillColor(0, 170, 0);
    doc.roundedRect(155, 8, 40, 12, 2, 2, "F");

    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.text("APPROVED", 160, 16);

    doc.setDrawColor(180);
    doc.roundedRect(12, 35, 186, 235, 4, 4);

    doc.setTextColor(0, 102, 204);
    doc.setFontSize(16);
    doc.text("Visitor Details", 20, 48);

    doc.setDrawColor(0, 102, 204);
    doc.line(20, 52, 188, 52);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    doc.text("Name", 20, 70);
    doc.text(String(visitor.Name), 70, 70);

    doc.text("Email", 20, 84);
    doc.text(String(visitor.Email), 70, 84);

    doc.text("Phone", 20, 98);
    doc.text(String(visitor.Phone), 70, 98);

    doc.text("Purpose", 20, 112);
    doc.text(String(visitor.Purpose), 70, 112);

    doc.text("Visit Date", 20, 126);
    doc.text(
        new Date(visitor.VisitDate).toLocaleDateString("en-GB"),
        70,
        126
    );

    doc.text("Visit Slot", 20, 140);
    doc.text(String(visitor.VisitTime), 70, 140);

    const image = await getBaseImg(imageURL);

    doc.setDrawColor(120);
    doc.rect(145, 60, 40, 45);
    doc.addImage(image, "JPEG", 145, 60, 40, 45);

    doc.rect(145, 120, 40, 40);
    doc.addImage(qrImage, "PNG", 145, 120, 40, 40);

    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text("Scan to Verify", 148, 166);

    doc.setDrawColor(180);
    doc.line(20, 245, 190, 245);

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
        "Generated on : " + new Date().toLocaleString(),
        20,
        252
    );

    doc.text(
        "VisitorPass Management System",
        20,
        260
    );

    doc.text(
        "This pass is valid only for the approved visit.",
        20,
        267
    );

    doc.save(`VisitorPass-${visitor.Name}.pdf`)
}

export default genPDF;


