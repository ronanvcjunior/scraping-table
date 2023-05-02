const needle = require("needle");
const cheerio = require("cheerio");

async function main() {
  const response = await needle(
      "get", 
      "https://www.codingwithstefan.com/table-example/"
    );

  if (response.statusCode === 200) {
    const $ = cheerio.load(response.body);
    const scrapedRows = [];
    const tableHeaders = [];
    $("body > table > tbody > tr").each((index, element) => {
      if (!index) {
        const ths = $(element).find("th")
        ths.each((index, element) => {
          const header = $(element)
          tableHeaders.push(header.text().trim().toLowerCase())
        });
        return;
      }

      const tds = $(element).find("td");
      const scrapedRow = {};
      tds.each((index, element) => {
        scrapedRow[tableHeaders[index]] = $(element).text()
      })
      scrapedRows.push(scrapedRow);
    });
    console.log(scrapedRows);
  } else {
    console.error(`Request failed with status code ${response.statusCode}`);
  }

}

main();