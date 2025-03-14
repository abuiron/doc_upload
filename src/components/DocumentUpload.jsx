import React, { useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';

export default function DocumentUpload({ applicantId }) {
  const [fileName, setFileName] = useState('');

  const handleUpload = async (event) => {
    const file = event.files[0];
    if (!file || !fileName) return alert('Enter file name and select a file!');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('applicant_id', applicantId);
    formData.append('file_name', fileName);

    try {
      await axios.post('http://localhost:5000/api/documents', formData);
      alert('File uploaded successfully!');
    } catch (error) {
      alert('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="form-control mb-2"
      />
      <FileUpload name="file" customUpload uploadHandler={handleUpload} />
    </div>
  );
}
