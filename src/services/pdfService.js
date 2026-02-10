import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateSovereignPDF = (data) => {
    const { marketTitle, quadrants, gates, outcome } = data;
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString('it-IT');

    // Branding & Header
    doc.setFillColor(15, 15, 20); // Dark background for header
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(212, 175, 55); // Gold color
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('ARCHITETTURA SOVRANA', 105, 25, { align: 'center' });

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(`Generato il: ${timestamp}`, 200, 35, { align: 'right' });

    // Market Title Section
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.text('ASSET SOVRANO VALIDATO:', 20, 55);

    doc.setDrawColor(140, 43, 238); // Violet accent
    doc.setLineWidth(1);
    doc.line(20, 58, 190, 58);

    doc.setFontSize(18);
    doc.setTextColor(140, 43, 238);
    doc.text(marketTitle.toUpperCase(), 20, 68);

    // Analysis Quadrants
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.text('CONFIGURAZIONE DEL POTENZIALE:', 20, 85);

    const quadrantData = [
        ['RITUALE', (quadrants.ritual || []).join(', ') || '-'],
        ['SANDBOX', (quadrants.sandbox || []).join(', ') || '-'],
        ['MISCHIEF', (quadrants.mischief || []).join(', ') || '-'],
        ['CRAFT', (quadrants.craft || []).join(', ') || '-']
    ];

    autoTable(doc, {
        startY: 90,
        head: [['Quadrante', 'Elementi Estratti']],
        body: quadrantData,
        headStyles: { fillColor: [140, 43, 238] },
        styles: { fontSize: 10, cellPadding: 5 },
        columnStyles: { 0: { fontStyle: 'bold', width: 40 } }
    });

    // Validation Status
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text('TEST DI VALIDAZIONE:', 20, finalY);

    const isSuccess = outcome?.type === 'success';
    doc.setFontSize(10);
    doc.setTextColor(isSuccess ? 34 : 239, isSuccess ? 197 : 68, isSuccess ? 94 : 68);
    doc.text(`ESITO FINALE: ${isSuccess ? 'VALIDATO' : 'CALIBRAZIONE NECESSARIA'}`, 20, finalY + 7);
    doc.setTextColor(30, 30, 30);

    const gateData = [
        ['Risonanza Unica', gates.resonance ? 'SUPERATO' : 'NON SUPERATO'],
        ['Craft Scalabile', gates.scalability ? 'SUPERATO' : 'NON SUPERATO'],
        ['Autorità Sovrana', gates.authority ? 'SUPERATO' : 'NON SUPERATO']
    ];

    autoTable(doc, {
        startY: finalY + 12,
        body: gateData,
        styles: { fontSize: 10 },
        columnStyles: {
            0: { width: 80 },
            1: { fontStyle: 'bold', halign: 'center' }
        },
        didParseCell: function (data) {
            if (data.column.index === 1) {
                if (data.cell.raw === 'SUPERATO') {
                    data.cell.styles.textColor = [34, 197, 94]; // Green
                } else {
                    data.cell.styles.textColor = [239, 68, 68]; // Red
                }
            }
        }
    });

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    const footerText = 'SOVEREIGN POTENTIAL ENGINE - Sistema di Cristallizzazione Asset';
    doc.text(footerText, 105, pageHeight - 10, { align: 'center' });

    // Save
    const fileName = `Architettura_Sovrana_${marketTitle.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
};
