import PDFDocument from "pdfkit"
import fs from "fs"
import { format } from "date-fns"
import { de } from "date-fns/locale"

const documentOptions = {
  layout: "landscape",
  bufferPages: true,
  margin: 0,
}

export default function generateDeliveryNotePDF(ordersList) {
  let doc = new PDFDocument(documentOptions)

  // console.log(ordersList)

  const FIRST_POSITION = 100
  const SECOND_POSITION = 325
  const THIRD_POSITION = 550

  generateOrderColumn(doc, ordersList[0], FIRST_POSITION)
  generateOrderColumn(doc, ordersList[1], SECOND_POSITION)
  generateOrderColumn(doc, ordersList[2], THIRD_POSITION)

  doc.addPage()

  generateOrderColumn(doc, ordersList[3], FIRST_POSITION)
  generateOrderColumn(doc, ordersList[4], SECOND_POSITION)
  generateOrderColumn(doc, ordersList[5], THIRD_POSITION)

  doc.addPage()

  generateOrderColumn(doc, ordersList[6], FIRST_POSITION)
  generateOrderColumn(doc, ordersList[7], SECOND_POSITION)
  generateOrderColumn(doc, ordersList[8], THIRD_POSITION)

  doc.addPage()

  generateOrderColumn(doc, ordersList[9], FIRST_POSITION)
  generateOrderColumn(doc, ordersList[10], SECOND_POSITION)
  generateOrderColumn(doc, ordersList[11], THIRD_POSITION)

  doc.addPage()

  generateOrderColumn(doc, ordersList[12], FIRST_POSITION)
  generateOrderColumn(doc, ordersList[13], SECOND_POSITION)
  generateOrderColumn(doc, ordersList[14], THIRD_POSITION)

  doc.end()
  doc.pipe(fs.createWriteStream("./reports/lieferscheine.pdf"))
}

function generateOrderColumn(doc, order, xPos) {
  if (order) {
    const formatedDate = format(new Date(order.date), "dd.MM.yy", {
      locale: de,
    })
    let headerHeight = 30

    doc
      .fontSize(10)
      .text(order.customer_name, xPos, headerHeight, {
        underline: true,
        width: 150,
        align: "center",
      })
      .text(formatedDate, xPos + 150, headerHeight, { underline: true })

    order.positions.forEach((position, i) => {
      console.log(position)
      const newStr = position.number.replace(/\./g, ",")

      doc
        .fontSize(10)
        .text(newStr, xPos - 25, headerHeight + 10 + 16 * (i + 1), {
          align: "right",
          width: 20,
        })

      doc
        .fontSize(10)
        .text(position.name, xPos, headerHeight + 10 + 16 * (i + 1), {
          width: 150,
          indent: 10,
        })

      doc
        .fontSize(10)
        .text("              ", xPos + 150, headerHeight + 10 + 16 * (i + 1), {
          underline: true,
        })
    })
  }
}
