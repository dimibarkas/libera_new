

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = generateBuylistPDF

var _dateFns = require("date-fns")

var _locale = require("date-fns/locale")

var _fs = _interopRequireDefault(require("fs"))

var _pdfkit = _interopRequireDefault(require("pdfkit"))

var fontSize = 13
var rectHeight = 16
var rectNameWidth = 170
var rectNumberWidth = 80
var leftSideArticles = 45
var firstColumnX = 30
var secondColumnX = firstColumnX + rectNameWidth //Rect

var rectOffset = 3

function generateBuylistPDF(buyListArray, searchDate) {
  var doc = new _pdfkit["default"]({
    margin: 0,
  })
  var formatedDate = (0, _dateFns.format)(searchDate, "EEEE,dd.MM.yy", {
    locale: _locale.de,
  }) //Überschrift

  doc
    .text("Einkaufsliste f\xFCr ".concat(formatedDate), firstColumnX, 15, {
      underline: true,
      align: "justify",
    })
    .fontSize(fontSize)
  generateBuylistTable(doc, buyListArray)
  doc.end()
  doc.pipe(_fs["default"].createWriteStream("./reports/einkaufsliste.pdf"))
}

function generateBuylistTable(doc, buyListArray) {
  var i,
    invoiceTableTop = 20

  for (i = 0; i < leftSideArticles; i++) {
    var item = buyListArray[i]
    var position = invoiceTableTop + (i + 1) * rectHeight
    generateTableRow(
      doc,
      position,
      item.name,
      item.number === 0 ? "" : item.number,
    )
  }

  invoiceTableTop = 20

  for (i = leftSideArticles; i < buyListArray.length; i++) {
    var _item = buyListArray[i]

    var _position = invoiceTableTop + (i + 1 - leftSideArticles) * rectHeight

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
    .fontSize(fontSize) //Artikelbezeichnung
    .text(c1, firstColumnX, y, {
      indent: 5,
    })
    .rect(firstColumnX, y - rectOffset, rectNameWidth, rectHeight)
    .stroke() //Anzahl
    .text(c2, secondColumnX, y, {
      width: rectNumberWidth,
      align: "center",
    })
    .rect(secondColumnX, y - rectOffset, rectNumberWidth, rectHeight)
    .stroke()
}

function generateTableRowRightHand(doc, y, c1, c2) {
  doc
    .fontSize(fontSize) //Artikelbezeichnung
    .text(c1, 330, y, {
      indent: 5,
    })
    .rect(330, y - rectOffset, rectNameWidth, rectHeight)
    .stroke() //Anzahl
    .text(c2, 500, y, {
      width: rectNumberWidth,
      align: "center",
    })
    .rect(500, y - rectOffset, rectNumberWidth, rectHeight)
    .stroke()
}
