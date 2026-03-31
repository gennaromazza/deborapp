import jsPDF from 'jspdf'

const COLORS = {
  primary: [248, 232, 238],
  secondary: [232, 224, 240],
  accent: [255, 183, 178],
  text: [74, 74, 74],
  textLight: [120, 120, 120],
  success: [168, 216, 184],
  yellow: [255, 230, 180],
}

function addPageNumber(doc, pageNum, totalPages, pageWidth) {
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.textLight)
  doc.text(`${pageNum}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
}

function drawChapterHeader(doc, chapter, margin, contentWidth, y) {
  const headerHeight = 25
  
  doc.setFillColor(...COLORS.secondary)
  doc.roundedRect(margin, y, contentWidth, headerHeight, 4, 4, 'F')
  
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.text)
  doc.text(`Capitolo ${chapter.id}`, margin + 10, y + 10)
  
  doc.setFontSize(18)
  doc.text(chapter.title || '', margin + 10, y + 18)
  
  return y + headerHeight + 10
}

function drawTextBox(doc, text, x, y, maxWidth, maxLines = 50) {
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.textLight)
  
  const lines = doc.splitTextToSize(text, maxWidth)
  const displayLines = lines.slice(0, maxLines)
  
  displayLines.forEach((line, i) => {
    doc.text(line, x, y + (i * 6))
  })
  
  return y + (displayLines.length * 6) + 8
}

export function generatePDF(product, chapters, progress = {}) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = margin
  let pageNum = 1

  function checkPage(needed, forceNew = false) {
    if (y + needed > pageHeight - margin || forceNew) {
      addPageNumber(doc, pageNum, 0, pageWidth)
      pageNum++
      doc.addPage()
      y = margin
      return true
    }
    return false
  }

  // ============ COVER PAGE ============
  // Background gradient effect
  doc.setFillColor(...COLORS.primary)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  
  // Decorative shapes
  doc.setFillColor(255, 230, 230)
  doc.circle(30, 40, 25, 'F')
  doc.setFillColor(235, 225, 255)
  doc.circle(pageWidth - 40, 60, 30, 'F')
  doc.setFillColor(230, 245, 240)
  doc.circle(50, pageHeight - 50, 35, 'F')
  
  // Main content
  y = pageHeight / 2 - 30
  
  // Title
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.text)
  const titleLines = doc.splitTextToSize(product.title, contentWidth)
  titleLines.forEach((line, i) => {
    doc.text(line, pageWidth / 2, y + (i * 14), { align: 'center' })
  })
  
  y += titleLines.length * 14 + 10
  
  // Subtitle
  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.textLight)
  const descLines = doc.splitTextToSize(product.description, contentWidth - 40)
  descLines.forEach((line, i) => {
    doc.text(line, pageWidth / 2, y + (i * 8), { align: 'center' })
  })
  
  y += descLines.length * 8 + 40
  
  // Author
  doc.setFontSize(12)
  doc.setTextColor(...COLORS.text)
  doc.text('di Debora di Bellucci', pageWidth / 2, y, { align: 'center' })
  
  // Bottom info
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.textLight)
  doc.text(' volume 1', pageWidth / 2, pageHeight - 30, { align: 'center' })
  doc.text('Matematica per bambini', pageWidth / 2, pageHeight - 22, { align: 'center' })
  
  pageNum++

  // ============ TABLE OF CONTENTS ============
  checkPage(60, true)
  
  y = margin + 10
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.text)
  doc.text('Indice', pageWidth / 2, y, { align: 'center' })
  y += 20
  
  doc.setFontSize(12)
  chapters.forEach((chapter, i) => {
    checkPage(15)
    doc.setFillColor(250, 250, 250)
    doc.roundedRect(margin, y - 5, contentWidth, 12, 2, 2, 'F')
    
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...COLORS.text)
    doc.text(`${chapter.id}.`, margin + 10, y + 2)
    
    doc.setFont('helvetica', 'normal')
    doc.text(chapter.title || '', margin + 25, y + 2)
    
    const chapterProgress = progress[chapter.id]?.length || 0
    const progressText = `${chapterProgress}/10`
    doc.setTextColor(...COLORS.textLight)
    doc.text(progressText, pageWidth - margin - 10, y + 2)
    
    y += 15
  })

  // ============ CHAPTERS ============
  chapters.forEach((chapter) => {
    checkPage(50, true)
    
    y = margin
    
    // Chapter divider
    doc.setFillColor(...COLORS.primary)
    doc.rect(0, y, pageWidth, 60, 'F')
    
    y += 20
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...COLORS.text)
    doc.text(`Capitolo ${chapter.id}`, pageWidth / 2, y, { align: 'center' })
    
    y += 12
    doc.setFontSize(18)
    doc.text(chapter.title || '', pageWidth / 2, y, { align: 'center' })
    
    y += 20
    
    // Get pages for this chapter - we'll create placeholder content since
    // actual content is in React components
    const chapterPages = progress[chapter.id] || []
    const completedCount = chapterPages.length
    
    doc.setFontSize(11)
    doc.setTextColor(...COLORS.textLight)
    doc.text(`Pagine completate: ${completedCount}`, margin, y)
    
    y += 20
    
    // Add activity section placeholder
    const activities = [
      { title: 'Attività di conteggio', desc: 'Esercizi per contare oggetti' },
      { title: 'Riconoscimento numeri', desc: 'Impara a riconoscere i numeri' },
      { title: 'Sequenze logiche', desc: 'Completa le sequenze di numeri' },
      { title: 'Operazioni base', desc: 'Introduzione ad addizioni e sottrazioni' },
    ]
    
    activities.forEach((activity, i) => {
      checkPage(25)
      
      doc.setFillColor(252, 252, 252)
      doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F')
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...COLORS.text)
      doc.text(`${i + 1}. ${activity.title}`, margin + 5, y + 8)
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...COLORS.textLight)
      doc.text(activity.desc, margin + 5, y + 15)
      
      y += 25
    })
    
    // Chapter summary box
    checkPage(30)
    y += 10
    
    doc.setFillColor(...COLORS.yellow)
    doc.roundedRect(margin, y, contentWidth, 25, 3, 3, 'F')
    
    y += 8
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...COLORS.text)
    doc.text('Riepilogo del capitolo', margin + 10, y)
    
    y += 8
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...COLORS.textLight)
    doc.text(`Hai completato ${completedCount} pagine su 10 in questo capitolo.`, margin + 10, y)
    
    if (completedCount >= 10) {
      doc.text('Capitolo completato! 🎉', margin + 10, y + 6)
    }
    
    y += 30
  })

  // ============ CERTIFICATE PAGE ============
  checkPage(60, true)
  
  y = pageHeight / 2 - 40
  
  doc.setFillColor(...COLORS.primary)
  doc.rect(0, y - 20, pageWidth, 100, 'F')
  
  y += 10
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.text)
  doc.text('Certificato di Completamento', pageWidth / 2, y, { align: 'center' })
  
  y += 20
  doc.setFontSize(14)
  doc.setTextColor(...COLORS.textLight)
  doc.text('Questo certificato attesta che', pageWidth / 2, y, { align: 'center' })
  
  y += 15
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.text)
  doc.text('Hai completato il percorso!', pageWidth / 2, y, { align: 'center' })
  
  y += 15
  doc.setFontSize(12)
  doc.setTextColor(...COLORS.textLight)
  doc.text(product.title, pageWidth / 2, y, { align: 'center' })
  
  y += 30
  const totalCompleted = Object.values(progress).flat().length
  doc.setFontSize(11)
  doc.text(`Pagine totali completate: ${totalCompleted}`, pageWidth / 2, y, { align: 'center' })
  
  y += 20
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.textLight)
  doc.text('Debora di Bellucci', pageWidth / 2, y, { align: 'center' })
  doc.text(new Date().toLocaleDateString('it-IT'), pageWidth / 2, y + 5, { align: 'center' })

  // ============ BACK COVER ============
  checkPage(40, true)
  
  y = margin + 20
  
  doc.setFillColor(...COLORS.secondary)
  doc.rect(margin, y, contentWidth, 40, 'F')
  
  y += 15
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.text)
  doc.text('Altri prodotti di Debora di Bellucci', pageWidth / 2, y, { align: 'center' })
  
  y += 25
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.textLight)
  doc.text('Scopri altri libri e attività sul sito!', pageWidth / 2, y, { align: 'center' })

  // Add final page number
  addPageNumber(doc, pageNum, 0, pageWidth)

  // Save
  doc.save(`${product.title?.replace(/\s+/g, '_') || 'libro'}.pdf`)
}

export function generateSimplePDF(product, downloadLink) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  
  // Simple cover
  doc.setFillColor(...COLORS.primary)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.text)
  doc.text(product.title, pageWidth / 2, pageHeight / 2 - 10, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setTextColor(...COLORS.textLight)
  doc.text(product.description || '', pageWidth / 2, pageHeight / 2 + 10, { align: 'center' })
  
  doc.setFontSize(10)
  doc.text('Debora di Bellucci', pageWidth / 2, pageHeight - 20, { align: 'center' })
  
  doc.save(`${product.title?.replace(/\s+/g, '_') || 'prodotto'}.pdf`)
}