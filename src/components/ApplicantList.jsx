import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';

export default function ApplicantList({ onSelectApplicant }) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/applicants')
      .then(response => setApplicants(response.data))
      .catch(error => console.error('Error fetching applicants:', error));
  }, []);

  return (
    <Nav variant="underline" defaultActiveKey="">
      {applicants.map(applicant => (
        <Nav.Item key={applicant.id}>
          <Nav.Link onClick={() => onSelectApplicant(applicant.id)}>
            {applicant.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
