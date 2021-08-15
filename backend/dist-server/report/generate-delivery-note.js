

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = generateDeliveryNotePDF

var _pdfkit = _interopRequireDefault(require("pdfkit"))

var _fs = _interopRequireDefault(require("fs"))

var _dateFns = require("date-fns")

var _locale = require("date-fns/locale")

//A4 size: A4 (595.28 x 841.89)
var documentOptions = {
  size: "A4",
  margin: 0,
}
var pageXEnd = 595.28
var pageYEnd = 841.98
var firstLinePosition = 198.425
var secondLinePosition = 396.85
var horinzontalLinePosition = 420.9
var headLineHeight = 10
var lineHeight = 15
var ordersPerPage = 6

function generateDeliveryNotePDF(ordersList) {
  var doc = new _pdfkit["default"](documentOptions) //Calculate the total number of pages needed

  var totalNumPages = calcTotalNumPages(ordersList)
  addCuttingLines(doc)
  var order_one = ordersList[0]
  var formatedDate_one = (0, _dateFns.format)(
    new Date(order_one.date),
    "dd.MM.yy",
    {
      locale: _locale.de,
    },
  )
  /**
   * Große For-Schleife
   */

  var _loop = function _loop(k) {
    if (k > 0) {
      doc.addPage()
      addCuttingLines(doc)
    }

    var _loop2 = function _loop2(i) {
      if (ordersList[i]) {
        doc
          .fontSize(9) //Kundenname
          .text(
            ordersList[i].customer_name,
            determineXPos(i) + 30,
            determineYPos(i, k) + headLineHeight,
            {
              underline: true,
              width: 115,
              align: "center",
            },
          ) //Datum
          .text(
            formatedDate_one,
            determineXPos(i) + 150,
            determineYPos(i, k) + headLineHeight,
            {
              underline: true,
              width: firstLinePosition - 150,
            },
          )
        ordersList[i].positions.forEach(function(position, j) {
          var number = position.number.replace(/\./g, ",")
          doc
            .fontSize(9) //Anzahl
            .text(
              number,
              determineXPos(i) + 0,
              determineYPos(i, k) + headLineHeight + 5 + lineHeight * (j + 1),
              {
                align: "right",
                width: 30,
              },
            ) //Artikelname
            .text(
              position.name,
              determineXPos(i) + 30,
              determineYPos(i, k) + headLineHeight + 5 + lineHeight * (j + 1),
              {
                indent: 5,
                width: 115,
              },
            ) //Unterstrich-Preis
            .text(
              "              ",
              determineXPos(i) + 150,
              determineYPos(i, k) + headLineHeight + 5 + lineHeight * (j + 1),
              {
                underline: true,
              },
            )
        })
      }
    }

    for (var i = 0 + k * 6; i < 6 + k * 6; i++) {
      _loop2(i)
    }
  }

  for (var k = 0; k < totalNumPages; k++) {
    _loop(k)
  }

  doc.end()
  doc.pipe(_fs["default"].createWriteStream("./reports/lieferscheine.pdf"))
}

function determineXPos(i) {
  var arg = i % 3

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
  var x = i

  if (x > 5) {
    x = x - 6 * (k + 1)
  }

  var arg = x > 2

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
    .stroke() //second vertical line

  doc
    .lineWidth(0.5)
    .moveTo(secondLinePosition, 0)
    .lineTo(secondLinePosition, pageYEnd)
    .dash(5)
    .stroke() //horizontal line

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
