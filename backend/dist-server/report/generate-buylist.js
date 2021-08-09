

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = generateBuylistPDF

var _fs = _interopRequireDefault(require("fs"))

var _pdfkit = _interopRequireDefault(require("pdfkit"))

function generateBuylistPDF(buyListArray, searchDate) {
  var doc = new _pdfkit["default"]({
    margin: 50,
  })
  generateHeader(doc)
  generateBuylistTable(doc, buyListArray)
  doc.end()
  doc.pipe(
    _fs["default"].createWriteStream(
      "./ Einkaufsliste ".concat(searchDate, ".pdf"),
    ),
  )
}

function generateHeader(doc) {
  doc
    .text("Einkaufsliste", 110, 57)
    .fontSize(10)
    .moveDown()
}

function generateBuylistTable(doc, buyListArray) {
  buyListArray.forEach(function(elem, i) {
    generateTableRow(doc, i, elem.name, elem.number)
  })
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, {
      width: 90,
      align: "right",
      border: "1px solid black",
    })
    .text(c4, 370, y, {
      width: 90,
      align: "right",
    })
    .text(c5, 0, y, {
      align: "right",
    })
}
