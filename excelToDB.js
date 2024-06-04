const ExcelJS = require("exceljs");
const Etudiant = require("./app/models/Etudiant.model");

// Function to read Excel file and save data to database
async function readExcelAndSaveToDatabase(filePath) {
  // Create a new workbook and read the Excel file
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  // Get the first worksheet
  const worksheet = workbook.getWorksheet(1);

  // Iterate through all rows in the worksheet
  for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
    const row = worksheet.getRow(rowIndex);
    const cin = row.getCell(1).value;
    const name = row.getCell(2).value;
    const email = row.getCell(3).value;
    const dte_naiss = row.getCell(4).value;
    const phone_nbr = row.getCell(5).value;

    // Save the row data to the database
    await Etudiant.create({ cin, name, email, dte_naiss, phone_nbr });
  }

  // Close the database connection

  //   console.log("Data has been saved to the database successfully.");
}

// Path to the Excel file
const excelFilePath = "etudiants.xlsx";

// Execute the function
readExcelAndSaveToDatabase(excelFilePath).catch((error) => {
  console.error("Error reading Excel file and saving to database:", error);
});
