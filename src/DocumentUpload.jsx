import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FileUpload } from "primereact/fileupload";

export default function DocumentUpload() {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [newApplicantName, setNewApplicantName] = useState("");
  const [documents, setDocuments] = useState({});
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState("");
  const [uploadVisible, setUploadVisible] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/applicants")
      .then((response) => setApplicants(response.data))
      .catch((error) => console.error("Error fetching applicants:", error));
  }, []);

  useEffect(() => {
    if (selectedApplicant) {
      axios
        .get(`http://localhost:5000/api/documents/${selectedApplicant}`)
        .then((response) =>
          setDocuments((prev) => ({ ...prev, [selectedApplicant]: response.data }))
        )
        .catch((error) => console.error("Error fetching documents:", error));
    }
  }, [selectedApplicant]);

  const handleAddApplicant = () => {
    if (!newApplicantName) return;
    axios
      .post("http://localhost:5000/api/applicants", { name: newApplicantName })
      .then((response) => {
        setApplicants([...applicants, response.data]);
        setNewApplicantName("");
        setShowApplicantModal(false);
      })
      .catch((error) => console.error("Error adding applicant:", error));
  };
  
  const handleDeleteApplicant = (id) => {
    axios
      .delete(`http://localhost:5000/api/applicants/${id}`)
      .then(() => {
        setApplicants((prev) => prev.filter((applicant) => applicant.id !== id));
        if (selectedApplicant === id) setSelectedApplicant(null);
      })
      .catch((error) => console.error("Error deleting applicant:", error));
  };
  

  const handleAddDocument = () => {
    if (!newDocumentName) return;
    setDocuments((prev) => ({
      ...prev,
      [selectedApplicant]: [...(prev[selectedApplicant] || []), { name: newDocumentName }],
    }));
    setNewDocumentName("");
    setShowDocumentModal(false);
  };

  const handleUpload = (event, docName) => {
    const file = event.files[0];
    if (!file || !selectedApplicant || !docName) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("applicant_id", selectedApplicant);
    formData.append("file_name", docName);

    axios
      .post("http://localhost:5000/api/documents", formData)
      .then(() => alert("File uploaded successfully!"))
      .catch((error) => alert("Error uploading file:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Document Upload</h2>
      <Button variant="primary" onClick={() => setShowApplicantModal(true)}>
        + Add Applicant
      </Button>
      <hr />
      <Nav variant="underline" className="mt-3 fw-bold fs-5">
        {applicants.map((applicant) => (
          <Nav.Item key={applicant.id} className="d-flex align-items-center me-3">
            <Nav.Link
              active={selectedApplicant === applicant.id}
              onClick={() => setSelectedApplicant(applicant.id)}
              className={`px-3 py-2 ${selectedApplicant === applicant.id ? "active-nav" : ""}`}
            >
              {applicant.name}
            </Nav.Link>
            <Button variant="danger" size="sm" onClick={() => handleDeleteApplicant(applicant.id)}>
              🗑
            </Button>
          </Nav.Item>
        ))}
      </Nav>

      {selectedApplicant && (
        <div className="mt-4">
          <h4>Documents for {applicants.find((a) => a.id === selectedApplicant)?.name}</h4>
          <Button variant="success" onClick={() => setShowDocumentModal(true)}>
            + Add Document
          </Button>

          <ul className="list-group mt-3">
            {(documents[selectedApplicant] || []).map((doc, index) => (
              <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                <Button
                  variant="outline-primary"
                  className="doc-button"
                  onClick={() => setUploadVisible((prev) => ({ ...prev, [doc.name]: !prev[doc.name] }))}
                >
                  {doc.name}
                </Button>

                {uploadVisible[doc.name] && (
                  <FileUpload
                    name="file"
                    customUpload
                    uploadHandler={(e) => handleUpload(e, doc.name)}
                    aria-hidden="false"
                  />
                )}
              </li>
            ))}
          </ul>

          {!(documents[selectedApplicant] || []).length && <p>No documents uploaded.</p>}
        </div>
      )}

      <Modal show={showApplicantModal} onHide={() => setShowApplicantModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Applicant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={newApplicantName}
            onChange={(e) => setNewApplicantName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplicantModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddApplicant}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDocumentModal} onHide={() => setShowDocumentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter document name"
            value={newDocumentName}
            onChange={(e) => setNewDocumentName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDocumentModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddDocument}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
