import { format } from "date-fns"
import { de } from "date-fns/locale"
import fs from "fs"
import PDFDocument from "pdfkit"

const fontSize = 13

const rectHeight = 16
const rectNameWidth = 170
const rectNumberWidth = 80

const leftSideArticles = 45

const firstColumnX = 30
const secondColumnX = firstColumnX + rectNameWidth

//Rect

const rectOffset = 3

export default function generateBuylistPDF(buyListArray, searchDate) {
  let doc = new PDFDocument({ margin: 0 })
  const formatedDate = format(searchDate, "EEEE,dd.MM.yy", { locale: de })

  //Überschrift
  doc
    .text(`Einkaufsliste für ${formatedDate}`, firstColumnX, 15, {
      underline: true,
      align: "justify",
    })
    .fontSize(fontSize)

  generateBuylistTable(doc, buyListArray)

  doc.end()
  doc.pipe(fs.createWriteStream(`./reports/einkaufsliste.pdf`))
}

function generateBuylistTable(doc, buyListArray) {
  let i,
    invoiceTableTop = 20

  for (i = 0; i < leftSideArticles; i++) {
    const item = buyListArray[i]
    const position = invoiceTableTop + (i + 1) * rectHeight
    generateTableRow(
      doc,
      position,
      item.name,
      item.number === 0 ? "" : item.number,
    )
  }

  invoiceTableTop = 20

  for (i = leftSideArticles; i < buyListArray.length; i++) {
    const item = buyListArray[i]
    const position = invoiceTableTop + (i + 1 - leftSideArticles) * rectHeight
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
    .fontSize(fontSize)
    //Artikelbezeichnung
    .text(c1, firstColumnX, y, { indent: 5 })
    .rect(firstColumnX, y - rectOffset, rectNameWidth, rectHeight)
    .stroke()
    //Anzahl
    .text(c2, secondColumnX, y, { width: rectNumberWidth, align: "center" })
    .rect(secondColumnX, y - rectOffset, rectNumberWidth, rectHeight)
    .stroke()
}

function generateTableRowRightHand(doc, y, c1, c2) {
  doc
    .fontSize(fontSize)
    //Artikelbezeichnung
    .text(c1, 330, y, { indent: 5 })
    .rect(330, y - rectOffset, rectNameWidth, rectHeight)
    .stroke()
    //Anzahl
    .text(c2, 500, y, { width: rectNumberWidth, align: "center" })
    .rect(500, y - rectOffset, rectNumberWidth, rectHeight)
    .stroke()
}
