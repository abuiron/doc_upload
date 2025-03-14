// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import { FileUpload } from 'primereact/fileupload';

// export default function App() {
//   const [applicants, setApplicants] = useState([]);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
//   const [showApplicantModal, setShowApplicantModal] = useState(false);
//   const [newApplicantName, setNewApplicantName] = useState('');
//   const [documents, setDocuments] = useState({});
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [newDocumentName, setNewDocumentName] = useState('');

//   // Fetch applicants
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/applicants')
//       .then(response => setApplicants(response.data))
//       .catch(error => console.error('Error fetching applicants:', error));
//   }, []);

//   // Fetch documents when applicant changes
//   useEffect(() => {
//     if (selectedApplicant) {
//       axios.get(`http://localhost:5000/api/documents/${selectedApplicant}`)
//         .then(response => setDocuments(prev => ({ ...prev, [selectedApplicant]: response.data })))
//         .catch(error => console.error('Error fetching documents:', error));
//     }
//   }, [selectedApplicant]);

//   // Add new applicant
//   const handleAddApplicant = () => {
//     if (!newApplicantName) return;
//     axios.post('http://localhost:5000/api/applicants', { name: newApplicantName })
//       .then(response => {
//         setApplicants([...applicants, response.data]);
//         setNewApplicantName('');
//         setShowApplicantModal(false);
//       })
//       .catch(error => console.error('Error adding applicant:', error));
//   };

//   // Delete an applicant
//   const handleDeleteApplicant = (id) => {
//     if (!window.confirm("Are you sure you want to delete this applicant?")) return;
//     axios.delete(`http://localhost:5000/api/applicants/${id}`)
//       .then(() => {
//         setApplicants(applicants.filter(applicant => applicant.id !== id));
//         if (selectedApplicant === id) setSelectedApplicant(null);
//       })
//       .catch(error => console.error('Error deleting applicant:', error));
//   };

//   // Add new document for selected applicant
//   const handleAddDocument = () => {
//     if (!newDocumentName) return;
//     setDocuments(prev => ({
//       ...prev,
//       [selectedApplicant]: [...(prev[selectedApplicant] || []), { name: newDocumentName }]
//     }));
//     setNewDocumentName('');
//     setShowDocumentModal(false);
//   };

//   // Handle file upload
//   const handleUpload = (event, docName) => {
//     const file = event.files[0];
//     if (!file || !selectedApplicant || !docName) return;

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('applicant_id', selectedApplicant);
//     formData.append('file_name', docName);

//     axios.post('http://localhost:5000/api/documents', formData)
//       .then(() => alert('File uploaded successfully!'))
//       .catch(error => alert('Error uploading file:', error));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Applicant Management</h2>

//       {/* Add Applicant Button */}
//       <Button variant="primary" onClick={() => setShowApplicantModal(true)}>+ Add Applicant</Button>

//       {/* Applicants List as Bootstrap Nav */}
//       <Nav variant="underline" className="mt-3">
//         {applicants.map(applicant => (
//           <Nav.Item key={applicant.id}>
//             <Nav.Link
//               active={selectedApplicant === applicant.id}
//               onClick={() => setSelectedApplicant(applicant.id)}
//             >
//               {applicant.name}
//             </Nav.Link>
//             <Button variant="danger" size="sm" onClick={() => handleDeleteApplicant(applicant.id)}>🗑</Button>
//           </Nav.Item>
//         ))}
//       </Nav>

//       {/* Document Upload Section */}
//       {selectedApplicant && (
//         <div className="mt-4">
//           <h4>Documents for {applicants.find(a => a.id === selectedApplicant)?.name}</h4>
//           <Button variant="success" onClick={() => setShowDocumentModal(true)}>+ Add Document</Button>

//           {/* Documents List */}
//           <ul className="list-group mt-3">
//             {(documents[selectedApplicant] || []).map((doc, index) => (
//               <li key={index} className="list-group-item">
//                 {doc.name}
//                 <FileUpload name="file" customUpload uploadHandler={(e) => handleUpload(e, doc.name)} />
//               </li>
//             ))}
//           </ul>

//           {/* No documents message */}
//           {!(documents[selectedApplicant] || []).length && <p>No documents uploaded.</p>}
//         </div>
//       )}

//       {/* Add Applicant Modal */}
//       <Modal show={showApplicantModal} onHide={() => setShowApplicantModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Applicant</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control type="text" placeholder="Enter name" value={newApplicantName} onChange={e => setNewApplicantName(e.target.value)} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowApplicantModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleAddApplicant}>Save</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add Document Modal */}
//       <Modal show={showDocumentModal} onHide={() => setShowDocumentModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Document</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control type="text" placeholder="Enter document name" value={newDocumentName} onChange={e => setNewDocumentName(e.target.value)} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDocumentModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleAddDocument}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

//<------------------------------------------------------------------------------------------------------------------------------------------------------------------->


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FileUpload } from 'primereact/fileupload';

export default function App() {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [newApplicantName, setNewApplicantName] = useState('');
  const [documents, setDocuments] = useState({});
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [uploadVisible, setUploadVisible] = useState({});


  useEffect(() => {
    axios.get('http://localhost:5000/api/applicants')
      .then(response => setApplicants(response.data))
      .catch(error => console.error('Error fetching applicants:', error));
  }, []);

  useEffect(() => {
    if (selectedApplicant) {
      axios.get(`http://localhost:5000/api/documents/${selectedApplicant}`)
        .then(response => setDocuments(prev => ({ ...prev, [selectedApplicant]: response.data })))
        .catch(error => console.error('Error fetching documents:', error));
    }
  }, [selectedApplicant]);

  const handleAddApplicant = () => {
    if (!newApplicantName) return;
    axios.post('http://localhost:5000/api/applicants', { name: newApplicantName })
      .then(response => {
        setApplicants([...applicants, response.data]);
        setNewApplicantName('');
        setShowApplicantModal(false);
      })
      .catch(error => console.error('Error adding applicant:', error));
  };

  const handleDeleteApplicant = (id) => {
    if (!window.confirm("Are you sure you want to delete this applicant?")) return;
    axios.delete(`http://localhost:5000/api/applicants/${id}`)
      .then(() => {
        setApplicants(applicants.filter(applicant => applicant.id !== id));
        if (selectedApplicant === id) setSelectedApplicant(null);
      })
      .catch(error => console.error('Error deleting applicant:', error));
  };

  const handleAddDocument = () => {
    if (!newDocumentName) return;
    setDocuments(prev => ({
      ...prev,
      [selectedApplicant]: [...(prev[selectedApplicant] || []), { name: newDocumentName }]
    }));
    setNewDocumentName('');
    setShowDocumentModal(false);
  };

  const handleUpload = (event, docName) => {
    const file = event.files[0];
    if (!file || !selectedApplicant || !docName) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('applicant_id', selectedApplicant);
    formData.append('file_name', docName);

    axios.post('http://localhost:5000/api/documents', formData)
      .then(() => alert('File uploaded successfully!'))
      .catch(error => alert('Error uploading file:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Document Upload</h2>
      <Button variant="primary" onClick={() => setShowApplicantModal(true)}>+ Add Applicant</Button>
      <hr size="pixels" />
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
    <h4>Documents for {applicants.find(a => a.id === selectedApplicant)?.name}</h4>
    <Button variant="success" onClick={() => setShowDocumentModal(true)}>+ Add Document</Button>
    
    <ul className="list-group mt-3">
      {(documents[selectedApplicant] || []).map((doc, index) => (
        <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
          {/* Document Name as a Button */}
          <Button
            variant="primary"
            className="doc-button"
            onClick={() => setUploadVisible((prev) => ({ ...prev, [doc.name]: !prev[doc.name] }))}
          >
            {doc.name}
          </Button>

          {/* File Upload (Visible Only When Button is Clicked) */}
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
          <Form.Control type="text" placeholder="Enter name" value={newApplicantName} onChange={e => setNewApplicantName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplicantModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddApplicant}>Save</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDocumentModal} onHide={() => setShowDocumentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Enter document name" value={newDocumentName} onChange={e => setNewDocumentName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDocumentModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddDocument}>Save</Button>
        </Modal.Footer>
      </Modal>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Button variant="primary">Back</Button>
        <Button variant="primary">Next</Button>
      </div>

      <hr />
    </div>
  );
}



//<-------------------------------------------------------------------------------------------------------------------------------------------------------------------->
// import React, { useState } from 'react';
// import { Nav } from 'react-bootstrap';
// import { FileUpload } from 'primereact/fileupload';
// import './App.css';

// export default function App() {
//     const [applicants, setApplicants] = useState([]);
//     const [activeApplicant, setActiveApplicant] = useState(null);
//     const [documents, setDocuments] = useState({});
//     const [newApplicantName, setNewApplicantName] = useState('');
//     const [newDocumentName, setNewDocumentName] = useState('');

//     const addApplicant = () => {
//         if (newApplicantName.trim()) {
//             setApplicants([...applicants, newApplicantName]);
//             setDocuments({ ...documents, [newApplicantName]: [] });
//             setNewApplicantName('');
//         }
//     };

//     const removeApplicant = (name) => {
//         const updatedApplicants = applicants.filter(applicant => applicant !== name);
//         const updatedDocuments = { ...documents };
//         delete updatedDocuments[name];
//         setApplicants(updatedApplicants);
//         setDocuments(updatedDocuments);
//         if (activeApplicant === name) setActiveApplicant(null);
//     };

//     const addDocument = () => {
//         if (newDocumentName.trim() && activeApplicant) {
//             setDocuments({
//                 ...documents,
//                 [activeApplicant]: [...documents[activeApplicant], { name: newDocumentName, file: null }]
//             });
//             setNewDocumentName('');
//         }
//     };

//     const uploadFile = (event, documentName) => {
//         const file = event.files[0];
//         if (!file) return;
        
//         const formData = new FormData();
//         formData.append('applicant', activeApplicant);
//         formData.append('document', documentName);
//         formData.append('file', file);
        
//         fetch('http://localhost:5000/api/documents', {
//             method: 'POST',
//             body: formData
//         }).then(response => response.json())
//           .then(data => console.log('Upload successful', data))
//           .catch(error => console.error('Upload error:', error));
//     };

//     return (
//         <div className="container">
//             <h1>Applicant Management</h1>
//             <div className="applicant-section">
//                 <input
//                     type="text"
//                     placeholder="Enter Applicant Name"
//                     value={newApplicantName}
//                     onChange={(e) => setNewApplicantName(e.target.value)}
//                 />
//                 <button onClick={addApplicant}>+ Add Applicant</button>
//                 <Nav variant="underline">
//                     {applicants.map((name) => (
//                         <Nav.Item key={name} className={activeApplicant === name ? 'active' : ''}>
//                             <Nav.Link onClick={() => setActiveApplicant(name)}>{name}</Nav.Link>
//                             <button className="delete-btn" onClick={() => removeApplicant(name)}>X</button>
//                         </Nav.Item>
//                     ))}
//                 </Nav>
//             </div>

//             {activeApplicant && (
//                 <div className="document-section">
//                     <h2>Documents for {activeApplicant}</h2>
//                     <input
//                         type="text"
//                         placeholder="Enter Document Name"
//                         value={newDocumentName}
//                         onChange={(e) => setNewDocumentName(e.target.value)}
//                     />
//                     <button onClick={addDocument}>+ Add</button>
//                     {documents[activeApplicant]?.length === 0 && <p>No documents uploaded.</p>}
//                     {documents[activeApplicant]?.map((doc, index) => (
//                         <div key={index} className="file-upload-row">
//                             <span>{doc.name}</span>
//                             <FileUpload name="file" customUpload accept="image/*"
//                                 uploadHandler={(e) => uploadFile(e, doc.name)} />
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
