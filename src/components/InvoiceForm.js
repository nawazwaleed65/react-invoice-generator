// InvoiceForm.js
import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";

function InvoiceForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [discountRate, setDiscountRate] = useState("");

  const [subTotal, setSubTotal] = useState("0.00");
  const [taxAmmount, setTaxAmmount] = useState("0.00");
  const [discountAmmount, setDiscountAmmount] = useState("0.00");
  const [total, setTotal] = useState("0.00");

  const [items, setItems] = useState([
    { id: Date.now(), name: "", description: "", price: "1.00", quantity: 1 },
  ]);

  const calculateTotal = useCallback(() => {
    let sub = 0;
    items.forEach((item) => {
      sub += parseFloat(item.price) * parseInt(item.quantity);
    });

    const tax = (sub * (parseFloat(taxRate) || 0)) / 100;
    const discount = (sub * (parseFloat(discountRate) || 0)) / 100;

    setSubTotal(sub.toFixed(2));
    setTaxAmmount(tax.toFixed(2));
    setDiscountAmmount(discount.toFixed(2));
    setTotal((sub - discount + tax).toFixed(2));
  }, [items, taxRate, discountRate]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  // Item editing
  const handleItemEdit = (e) => {
    const { id, name, value } = e.target;
    const updatedItems = items.map((item) =>
      item.id === Number(id) ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const addItem = () =>
    setItems([
      ...items,
      { id: Date.now(), name: "", description: "", price: "1.00", quantity: 1 },
    ]);

  const removeItem = (item) => setItems(items.filter((i) => i.id !== item.id));

  const editField = (setter) => (e) => setter(e.target.value);

  const openModal = (e) => {
    e.preventDefault();
    calculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  // Info object to pass to modal
  const info = {
    billTo,
    billToEmail,
    billToAddress,
    billFrom,
    billFromEmail,
    billFromAddress,
    dateOfIssue,
    invoiceNumber,
    notes,
  };

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 my-4">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <strong>Current Date:</strong> {new Date().toLocaleDateString()}
                <div className="mt-2 d-flex align-items-center">
                  <strong className="me-2">Due Date:</strong>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    onChange={editField(setDateOfIssue)}
                    style={{ maxWidth: 150 }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <strong className="me-2">Invoice #</strong>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  onChange={editField(setInvoiceNumber)}
                  style={{ maxWidth: 80 }}
                  min="1"
                />
              </div>
            </div>

            <hr />

            <Row>
              <Col>
                <Form.Label className="fw-bold">Bill To</Form.Label>
                <Form.Control
                  className="my-2"
                  value={billTo}
                  onChange={editField(setBillTo)}
                  placeholder="Who is this invoice to?"
                  required
                />
                <Form.Control
                  className="my-2"
                  value={billToEmail}
                  onChange={editField(setBillToEmail)}
                  placeholder="Email"
                  required
                />
                <Form.Control
                  className="my-2"
                  value={billToAddress}
                  onChange={editField(setBillToAddress)}
                  placeholder="Address"
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill From</Form.Label>
                <Form.Control
                  className="my-2"
                  value={billFrom}
                  onChange={editField(setBillFrom)}
                  placeholder="Who is this invoice from?"
                  required
                />
                <Form.Control
                  className="my-2"
                  value={billFromEmail}
                  onChange={editField(setBillFromEmail)}
                  placeholder="Email"
                  required
                />
                <Form.Control
                  className="my-2"
                  value={billFromAddress}
                  onChange={editField(setBillFromAddress)}
                  placeholder="Address"
                  required
                />
              </Col>
            </Row>

            <InvoiceItem
              items={items}
              currency={currency}
              onItemizedItemEdit={handleItemEdit}
              onRowAdd={addItem}
              onRowDel={removeItem}
            />

            <hr />

            <div className="text-end fw-bold">
              Total: {currency} {total}
            </div>

            <Form.Label className="fw-bold mt-3">Notes</Form.Label>
            <Form.Control
              as="textarea"
              value={notes}
              onChange={editField(setNotes)}
            />
          </Card>
        </Col>

        <Col md={4} lg={3}>
          <Button type="submit" className="w-100 mb-3">
            Review Invoice
          </Button>

          <InvoiceModal
            showModal={isOpen}
            closeModal={closeModal}
            info={info}
            items={items}
            currency={currency}
            subTotal={subTotal}
            taxAmmount={taxAmmount}
            discountAmmount={discountAmmount}
            total={total}
          />

          <Form.Select
            className="my-3"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="$">USD</option>
            <option value="£">GBP</option>
            <option value="¥">JPY</option>
            <option value="₿">BTC</option>
          </Form.Select>

          <InputGroup className="my-2">
            <Form.Control
              type="number"
              value={taxRate}
              onChange={editField(setTaxRate)}
              placeholder="Tax Rate"
            />
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>

          <InputGroup>
            <Form.Control
              type="number"
              value={discountRate}
              onChange={editField(setDiscountRate)}
              placeholder="Discount Rate"
            />
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}

export default InvoiceForm;
