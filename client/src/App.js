import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    window.confirm("This application can only handle the receipts. Are you sure the one uploaded is the receipt? ");
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const rootUrl=process.env.NODE_ENV === "production"? "": "http://localhost:5000"
      const response = await fetch(
        `${rootUrl}/api/v1/textract/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>File Upload and Text Extraction with Amazon Textract</h1>

      <div className="upload-section">
        <label className="file-input-label">
          <input type="file" onChange={handleFileChange} />
          <span>Choose File</span>
        </label>
        {fileName && (
          <div className="file-info">
            <span className="file-name">{fileName}</span>
            <p className="remove-file-button" onClick={() => {
              setSelectedFile(null);
              setFileName('');
            }}>✕</p>
          </div>
        )}
        <button onClick={handleFileUpload}>Extract File</button>
      </div>

      {/* Display Result */}
      {result && (
        <div className="result">
          <h2>Text Extraction Result:</h2>
          <div>
            {result.Blocks &&
              result.Blocks.map((block, index) =>
                block.BlockType === 'LINE' ? <p key={index}>{block.Text}</p> : null
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
