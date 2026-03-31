import jsPDF from 'jspdf'

export function generatePDF(product, chapters, progress) {
  const doc = new jsPDF('p', 'mm', 'a5')
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - margin * 2
  let y = margin

  function checkPage(needed) {
    if (y + needed > pageHeight - margin) {
      doc.addPage()
      y = margin
    }
  }

  // Cover
  doc.setFillColor(248, 232, 238)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(74, 74, 74)
  doc.text(product.title, pageWidth / 2, pageHeight / 2 - 10, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  doc.text(product.description, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' })
  
  doc.setFontSize(10)
  doc.text('Debora di Bellucci', pageWidth / 2, pageHeight - 20, { align: 'center' })

  // Chapters
  chapters.forEach((chapter, ci) => {
    doc.addPage()
    y = margin

    // Chapter header
    doc.setFillColor(232, 224, 240)
    doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F')
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(74, 74, 74)
    doc.text(`Capitolo ${chapter.id}: ${chapter.title}`, pageWidth / 2, y + 13, { align: 'center' })
    y += 30

    // Pages
    chapter.pages?.forEach((page, pi) => {
      checkPage(40)
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(74, 74, 74)
      doc.text(`Pagina ${page.id}: ${page.title}`, margin, y)
      y += 8

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      
      const textLines = doc.splitTextToSize(page.text || '', contentWidth - 5)
      textLines.forEach(line => {
        checkPage(8)
        doc.text(line, margin + 2, y)
        y += 6
      })
      y += 8
    })

    // Progress
    const chapterProgress = progress[chapter.id] || []
    checkPage(20)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(168, 216, 184)
    doc.text(`Progresso: ${chapterProgress.length}/10 pagine completate`, margin, y)
  })

  // Save
  doc.save(`${product.title.replace(/\s+/g, '_')}.pdf`)
}
