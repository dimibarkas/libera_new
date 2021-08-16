import { format } from "date-fns"
import { de } from "date-fns/locale"
import fs from "fs"
import PDFDocument from "pdfkit"

export default function generateBuylistPDF(buyListArray, searchDate) {
  let doc = new PDFDocument({ margin: 20 })
  const formatedDate = format(searchDate, "EEEE,dd.MM.yy", { locale: de })

  generateHeader(doc, formatedDate)
  generateBuylistTable(doc, buyListArray)

  doc.end()
  doc.pipe(fs.createWriteStream(`./reports/einkaufsliste.pdf`))
}

function generateHeader(doc, formatedDate) {
  doc
    .text(`Einkaufsliste für ${formatedDate}`, 50, 20, {
      underline: true,
      align: "justify",
    })
    .fontSize(10)
}

function generateBuylistTable(doc, buyListArray) {
  let i,
    invoiceTableTop = 30

  for (i = 0; i < 41; i++) {
    const item = buyListArray[i]
    const position = invoiceTableTop + (i + 1) * 16
    generateTableRow(
      doc,
      position,
      item.name,
      item.number === 0 ? "" : item.number,
    )
  }

  invoiceTableTop = 30

  for (i = 41; i < buyListArray.length; i++) {
    const item = buyListArray[i]
    const position = invoiceTableTop + (i + 1 - 41) * 16
    generateTableRowRightHand(
      doc,
      position,
      item.name,
      item.number === 0 ? "" : item.number,
    )
  }
}

function generateTableRow(doc, y, c1, c2) {
  doc
    .fontSize(10)
    .text(c1, 50, y, { indent: 5 })
    .rect(50, y - 4, 150, 16)
    .stroke()
    .text(c2, 200, y, { width: 80, align: "center" })
    .rect(200, y - 4, 80, 16)
    .stroke()
}

function generateTableRowRightHand(doc, y, c1, c2) {
  doc
    .fontSize(10)
    .text(c1, 330, y, { indent: 5 })
    .rect(330, y - 4, 150, 16)
    .stroke()
    .text(c2, 480, y, { width: 80, align: "center" })
    .rect(480, y - 4, 80, 16)
    .stroke()
}
