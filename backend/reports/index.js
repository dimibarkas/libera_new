module.exports = ({ name, price1, price2, receiptId }) => {
  const today = new Date()
  const arr = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
  ]
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <style>
      table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
      }
  
      td,
      th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
      }
  </style>
  
  <body>
      <table>
          <tbody>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Wochentag</td>
                  <td>Datum</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Artikel</td>
                  <td>St&uuml;ck</td>
                  <td>&nbsp;</td>
                  <td>Artikel</td>
                  <td>St&uuml;ck</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Tomaten 5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Broccoli 5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Gurken 12st.</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Blumenkohl 6-8st</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Eisberg 8-12 st.</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Lauchzwiebeln Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Lollo Bionda</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Cherrytomaten</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Lollo Rosso</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Chinakohl Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Mixsalat</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Paprika Carli t&uuml;te</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Kopfsalat</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Paprika Dolma Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Papr. Gr&uuml;n 5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Paprika Palermo</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Papr. Rot 5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Fleischtomaten Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Papr.Gelb 5 kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Fenchel Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Paprika Mix 5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Feldsalat Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Auberginen 5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Chicor&eacute;e Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Champignons</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Austernpilze Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Riesenchampignons</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Staudensellerie Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Grillkartoffeln 25kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Knollensellerie Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Kartoffeln Festk.25kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Rotkohl 15 kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>M&ouml;hren Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Latuca Romana Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Radicchio Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Rote Beete 10 kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Radieschen 2,5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Baby Spinat</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Rucola Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Spinat Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Wei&szlig;kohl 15 kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Frisee Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Zitronen Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Drillinge 10kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Zucchini 5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Porree Sack</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Zwiebeln 25kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&Auml;pfel Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Zwiebeln Rot 10kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Clementinen</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Knoblauch 5kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Orangen Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Kr&auml;uter</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Wei&szlig;kohl geschnitten kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Petersilie krause Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>M&ouml;hren geschnitten kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Petersilie glatt (Bund)</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Eichenblattsalat</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Blattsellerie Kiste</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Endiviensalat</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Dill (Bund)</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Eier 30st</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Basilikum Schale</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Rote Pfeffer kg</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Oregano Schale</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Wildkr&auml;uter</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Rosmarin Schale</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Pfifferlinge</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Thymian Schale</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Salbei Schale</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Minze Schale</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Schnittlauch Schale</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>Estragon Schale</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>
          </tbody>
      </table>
  </body>
  
  </html>
    `
}
