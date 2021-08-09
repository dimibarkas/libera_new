import fs from "fs"
import PDFDocument from "pdfkit"

export default function generateBuylistPDF(buyListArray, searchDate) {
  let doc = new PDFDocument({ margin: 50 })

  generateHeader(doc)
  generateBuylistTable(doc, buyListArray)

  doc.end()
  doc.pipe(fs.createWriteStream(`./ Einkaufsliste ${searchDate}.pdf`))
}

function generateHeader(doc) {
  doc
    .text(`Einkaufsliste`, 110, 57)
    .fontSize(10)
    .moveDown()
}

function generateBuylistTable(doc, buyListArray) {
  buyListArray.forEach((elem, i) => {
    generateTableRow(doc, i, elem.name, elem.number)
  })
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, { width: 90, align: "right", border: "1px solid black" })
    .text(c4, 370, y, { width: 90, align: "right" })
    .text(c5, 0, y, { align: "right" })
}
