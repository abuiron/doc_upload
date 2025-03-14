import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import ApplicantList from "./ApplicantList";
import DocumentUpload from "./DocumentUpload";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <Row>
          {/* Applicant List */}
          <Col md={4}>
            <ApplicantList onSelectApplicant={setSelectedApplicant} />
          </Col>

          {/* Document Upload Section */}
          <Col md={8}>
            {selectedApplicant ? (
              <DocumentUpload applicant={selectedApplicant} />
            ) : (
              <h5 className="text-center">Select an applicant to manage documents.</h5>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
