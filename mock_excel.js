const ExcelJS = require("exceljs");

// Create a new workbook and add a worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Etudiant");

// Define columns for the worksheet
worksheet.columns = [
  { header: "CIN", key: "cin", width: 15 },
  { header: "Name", key: "name", width: 25 },
  { header: "Email", key: "email", width: 30 },
  { header: "Date of Birth", key: "dte_naiss", width: 15 },
  { header: "Phone Number", key: "phone_nbr", width: 20 },
];

// Example data
const etudiants = [
  {
    cin: "12345678",
    name: "John Doe",
    email: "john.doe@example.com",
    dte_naiss: "2000-01-01",
    phone_nbr: "123-456-7890",
  },
  {
    cin: "87654321",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    dte_naiss: "1995-05-15",
    phone_nbr: "098-765-4321",
  },
  {
    cin: "11223344",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    dte_naiss: "1998-03-22",
    phone_nbr: "234-567-8901",
  },
  {
    cin: "44332211",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    dte_naiss: "1999-07-30",
    phone_nbr: "345-678-9012",
  },
  {
    cin: "55667788",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    dte_naiss: "2001-12-15",
    phone_nbr: "456-789-0123",
  },
  {
    cin: "99887766",
    name: "Diana Evans",
    email: "diana.evans@example.com",
    dte_naiss: "2002-02-19",
    phone_nbr: "567-890-1234",
  },
  {
    cin: "77665544",
    name: "Edward Foster",
    email: "edward.foster@example.com",
    dte_naiss: "1997-08-25",
    phone_nbr: "678-901-2345",
  },
  {
    cin: "33445566",
    name: "Fiona Green",
    email: "fiona.green@example.com",
    dte_naiss: "1996-11-12",
    phone_nbr: "789-012-3456",
  },
  {
    cin: "66554433",
    name: "George Harris",
    email: "george.harris@example.com",
    dte_naiss: "2000-04-08",
    phone_nbr: "890-123-4567",
  },
  {
    cin: "22334455",
    name: "Hannah Jones",
    email: "hannah.jones@example.com",
    dte_naiss: "1994-09-17",
    phone_nbr: "901-234-5678",
  },
];

// Add rows to the worksheet
etudiants.forEach((etudiant) => {
  worksheet.addRow(etudiant);
});

// Write to file
workbook.xlsx
  .writeFile("etudiants.xlsx")
  .then(() => {
    console.log("Excel file created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Excel file:", error);
  });
