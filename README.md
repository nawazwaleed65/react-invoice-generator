
# React Invoice Generator

A React.js web application for creating and managing invoices dynamically. Users can add multiple items, edit invoice details, calculate totals with tax and discount, and export invoices as PDF.

## Features

- Add, edit, and delete invoice items
- Set invoice number, billing info, and issue date
- Calculate subtotal, tax, discount, and total automatically
- Export invoices as PDF
- Responsive design using Bootstrap

## Tech Stack

- React.js
- Bootstrap 5
- React-Bootstrap
- html2canvas & jsPDF for PDF export
- React Icons

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/react-invoice-generator.git
````

2. Navigate to the project directory:

```bash
cd react-invoice-generator
```

3. Install dependencies:

```bash
npm install
```

4. Run the project:

```bash
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000).

## Usage

1. Fill out billing information for **Bill To** and **Bill From**
2. Add invoice items with name, description, quantity, and price
3. Apply tax and discount rates if needed
4. Click **Review Invoice** to preview the invoice
5. Download or send the invoice as PDF

## Folder Structure

```
react-invoice-generator/
├── public/
├── src/
│   ├── components/
│   │   ├── EditableField.js
│   │   ├── InvoiceForm.js
│   │   ├── InvoiceItem.js
│   │   └── InvoiceModal.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add some feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

