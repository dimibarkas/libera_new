

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = generateDeliveryNotePDF

var _pdfkit = _interopRequireDefault(require("pdfkit"))

var _fs = _interopRequireDefault(require("fs"))

var _dateFns = require("date-fns")

var _locale = require("date-fns/locale")

var documentOptions = {
  layout: "landscape",
  bufferPages: true,
  margin: 0,
}

function generateDeliveryNotePDF(ordersList) {
  var doc = new _pdfkit["default"](documentOptions) // console.log(ordersList)

  var FIRST_POSITION = 100
  var SECOND_POSITION = 325
  var THIRD_POSITION = 550
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
  doc.pipe(_fs["default"].createWriteStream("./reports/lieferscheine.pdf"))
}

function generateOrderColumn(doc, order, xPos) {
  if (order) {
    var formatedDate = (0, _dateFns.format)(new Date(order.date), "dd.MM.yy", {
      locale: _locale.de,
    })
    var headerHeight = 30
    doc
      .fontSize(10)
      .text(order.customer_name, xPos, headerHeight, {
        underline: true,
        width: 150,
        align: "center",
      })
      .text(formatedDate, xPos + 150, headerHeight, {
        underline: true,
      })
    order.positions.forEach(function(position, i) {
      console.log(position)
      var newStr = position.number.replace(/\./g, ",")
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
