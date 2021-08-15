import PDFDocument from "pdfkit"
import fs from "fs"
import { format } from "date-fns"
import { de } from "date-fns/locale"

//A4 size: A4 (595.28 x 841.89)

const documentOptions = {
  size: "A4",
  margin: 0,
}

const pageXEnd = 595.28
const pageYEnd = 841.98

const firstLinePosition = 198.425
const secondLinePosition = 396.85
const horinzontalLinePosition = 420.9

const headLineHeight = 10
const lineHeight = 15

const ordersPerPage = 6

export default function generateDeliveryNotePDF(ordersList) {
  let doc = new PDFDocument(documentOptions)

  //Calculate the total number of pages needed
  const totalNumPages = calcTotalNumPages(ordersList)

  addCuttingLines(doc)
  const order_one = ordersList[0]
  const formatedDate_one = format(new Date(order_one.date), "dd.MM.yy", {
    locale: de,
  })

  /**
   * Große For-Schleife
   */
  for (let k = 0; k < totalNumPages; k++) {
    if (k > 0) {
      doc.addPage()
      addCuttingLines(doc)
    }
    for (let i = 0 + k * 6; i < 6 + k * 6; i++) {
      if (ordersList[i]) {
        doc
          .fontSize(9)
          //Kundenname
          .text(
            ordersList[i].customer_name,
            determineXPos(i) + 30,
            determineYPos(i, k) + headLineHeight,
            { underline: true, width: 115, align: "center" },
          )
          //Datum
          .text(
            formatedDate_one,
            determineXPos(i) + 150,
            determineYPos(i, k) + headLineHeight,
            { underline: true, width: firstLinePosition - 150 },
          )

        ordersList[i].positions.forEach((position, j) => {
          const number = position.number.replace(/\./g, ",")
          doc
            .fontSize(9)
            //Anzahl
            .text(
              number,
              determineXPos(i) + 0,
              determineYPos(i, k) + headLineHeight + 5 + lineHeight * (j + 1),
              { align: "right", width: 30 },
            )
            //Artikelname
            .text(
              position.name,
              determineXPos(i) + 30,
              determineYPos(i, k) + headLineHeight + 5 + lineHeight * (j + 1),
              { indent: 5, width: 115 },
            )
            //Unterstrich-Preis
            .text(
              "              ",
              determineXPos(i) + 150,
              determineYPos(i, k) + headLineHeight + 5 + lineHeight * (j + 1),
              { underline: true },
            )
        })
      }
    }
  }

  doc.end()
  doc.pipe(fs.createWriteStream("./reports/lieferscheine.pdf"))
}

function determineXPos(i) {
  const arg = i % 3
  switch (arg) {
    case 0:
      return 0
    case 1:
      return firstLinePosition
    case 2:
      return secondLinePosition
    default:
      break
  }
}

function determineYPos(i, k) {
  let x = i
  if (x > 5) {
    x = x - 6 * (k + 1)
  }
  const arg = x > 2
  switch (arg) {
    case false:
      return 0
    case true:
      return horinzontalLinePosition
    default:
      break
  }
}

function addCuttingLines(doc) {
  //first vertical line
  doc
    .lineWidth(0.5)
    .moveTo(firstLinePosition, 0)
    .lineTo(firstLinePosition, pageYEnd)
    .dash(5)
    .stroke()

  //second vertical line
  doc
    .lineWidth(0.5)
    .moveTo(secondLinePosition, 0)
    .lineTo(secondLinePosition, pageYEnd)
    .dash(5)
    .stroke()

  //horizontal line
  doc
    .lineWidth(0.5)
    .moveTo(0, horinzontalLinePosition)
    .lineTo(pageXEnd, horinzontalLinePosition)
    .dash(5)
    .stroke()

  doc.undash()
}

function calcTotalNumPages(ordersList) {
  return Math.ceil(ordersList.length / ordersPerPage)
}
