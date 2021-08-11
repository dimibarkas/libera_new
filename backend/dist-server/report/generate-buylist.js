

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = generateBuylistPDF

var _dateFns = require("date-fns")

var _locale = require("date-fns/locale")

var _fs = _interopRequireDefault(require("fs"))

var _pdfkit = _interopRequireDefault(require("pdfkit"))

function generateBuylistPDF(buyListArray, searchDate) {
  var doc = new _pdfkit["default"]({
    margin: 50,
  })
  var formatedDate = (0, _dateFns.format)(searchDate, "EEEE,dd.MM.yy", {
    locale: _locale.de,
  })
  generateHeader(doc, formatedDate)
  generateBuylistTable(doc, buyListArray)
  doc.end()
  doc.pipe(_fs["default"].createWriteStream("./reports/einkaufsliste.pdf"))
}

function generateHeader(doc, formatedDate) {
  doc
    .text("Einkaufsliste f\xFCr ".concat(formatedDate), {
      underline: true,
      align: "justify",
    })
    .fontSize(10)
}

function generateBuylistTable(doc, buyListArray) {
  var i,
    invoiceTableTop = 60

  for (i = 0; i < 37; i++) {
    var item = buyListArray[i]
    var position = invoiceTableTop + (i + 1) * 16
    generateTableRow(
      doc,
      position,
      item.name,
      item.number === 0 ? "" : item.number,
    )
  }

  invoiceTableTop = 60

  for (i = 38; i < buyListArray.length; i++) {
    var _item = buyListArray[i]

    var _position = invoiceTableTop + (i + 1 - 38) * 16

    generateTableRowRightHand(
      doc,
      _position,
      _item.name,
      _item.number === 0 ? "" : _item.number,
    )
  }
}

function generateTableRow(doc, y, c1, c2) {
  doc
    .fontSize(10)
    .text(c1, 50, y, {
      indent: 5,
    })
    .rect(50, y - 4, 150, 16)
    .stroke()
    .text(c2, 200, y, {
      width: 80,
      align: "center",
    })
    .rect(200, y - 4, 80, 16)
    .stroke()
}

function generateTableRowRightHand(doc, y, c1, c2) {
  doc
    .fontSize(10)
    .text(c1, 330, y, {
      indent: 5,
    })
    .rect(330, y - 4, 150, 16)
    .stroke()
    .text(c2, 480, y, {
      width: 80,
      align: "center",
    })
    .rect(480, y - 4, 80, 16)
    .stroke()
}
