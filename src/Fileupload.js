 /* import { useRef, useState } from "react"
import axios from 'axios';

export default function Fileupload(){
    const [file, setFile] = useState();
    const[fileName, setFileName] = useState("");
    const fileInput = useRef();


    const saveFile = ()=>{
        setFile(fileInput.current.files[0])
        setFileName(fileInput.current.files[0].name)

    }

    const uploadFile = async()=>{
        const formData =new FormData();
        formData.append('file',file );
        formData.append('fileName',fileName );

        try{
            axios.post("http://localhost:8000/upload", formData)


        }catch(err){
              console.error("Upload failed", err);
              alert("Upload failed: " + err.message);
        }

    }

    return(
        <div className="mt-5">
            <input type="file" ref={fileInput} onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
        </div>
        
    )
} 

    import { useRef, useState } from "react";
import axios from 'axios';

export default function Fileupload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState(""); // ✅ for response
  const fileInput = useRef();

  const saveFile = () => {
    setFile(fileInput.current.files[0]);
    setFileName(fileInput.current.files[0].name);
    setStatus(""); // clear previous status
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      setStatus(`✅ ${response.data.message}`);
    } catch (err) {
      console.error("Upload failed", err);
      if (err.response?.data?.message) {
        setStatus(`❌ ${err.response.data.message}`);
      } else {
        setStatus("❌ Upload failed due to network/server error");
      }
    }
  };

  return (
    <div className="mt-5">
      <input type="file" ref={fileInput} onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
      <p style={{ fontWeight: 'bold', color: 'green' }}>{status}</p>
    </div>
  );
}  

  import { useRef, useState } from "react";
import axios from 'axios';

export default function Fileupload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const fileInput = useRef();

  const saveFile = () => {
    setFile(fileInput.current.files[0]);
    setFileName(fileInput.current.files[0].name);
    setStatus(""); // clear previous status
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus("❌ Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      setStatus(`✅ ${response.data.message}`);
    } catch (err) {
      console.error("Upload failed", err);
      if (err.response?.data?.message) {
        setStatus(`❌ ${err.response.data.message}`);
      } else {
        setStatus("❌ Upload failed due to network/server error");
      }
    }
  };

  return (
    <div className="mt-5" style={{ maxWidth: "500px" }}>
      <input
        type="file"
        ref={fileInput}
        onChange={saveFile}
        className="form-control mb-3"
      />
      <button
        className="btn btn-primary w-100"
        onClick={uploadFile}
      >
        Upload
      </button>
      {status && (
        <p className="mt-3 fw-bold" style={{ color: status.startsWith("✅") ? "green" : "red" }}>
          {status}
        </p>
      )}
    </div>
  );
}  

  import { useRef, useState } from "react";
import axios from 'axios';

// ✅ Function to extract and format timestamp from filename
const extractFormattedDateFromFilename = (filename) => {
  const match = filename.match(/_(\d+)\./);
  if (match) {
    const timestamp = parseInt(match[1], 10);
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-IN', options); // Ex: July 10, 2025, 11:03:32 PM
  }
  return '';
};

export default function Fileupload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadDate, setUploadDate] = useState(""); // ✅ for showing date/time
  const fileInput = useRef();

  const saveFile = () => {
    const selectedFile = fileInput.current.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setStatus("");
    setImageURL("");
    setUploadDate(""); // clear previous upload info
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus("❌ Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      setStatus(`✅ ${response.data.message}`);

      // ✅ Get filename from response and build image URL
      if (response.data.filename) {
        const imagePath = `http://localhost:8000/images/${response.data.filename}`;
        setImageURL(imagePath);

        // ✅ Extract and set upload date
        const readableDate = extractFormattedDateFromFilename(response.data.filename);
        setUploadDate(readableDate);
      }

    } catch (err) {
      console.error("Upload failed", err);
      if (err.response?.data?.message) {
        setStatus(`❌ ${err.response.data.message}`);
      } else {
        setStatus("❌ Upload failed due to network/server error");
      }
    }
  };

  return (
    <div className="mt-5" style={{ maxWidth: "500px" }}>
      <input
        type="file"
        ref={fileInput}
        onChange={saveFile}
        className="form-control mb-3"
      />
      <button className="btn btn-primary w-100" onClick={uploadFile}>
        Upload
      </button>

      {status && (
        <p className="mt-3 fw-bold" style={{ color: status.startsWith("✅") ? "green" : "red" }}>
          {status}
        </p>
      )}

      {imageURL && (
        <div className="mt-3">
          <h5>Uploaded Image:</h5>
          <img src={imageURL} alt="Uploaded" className="img-fluid rounded shadow" />
          {uploadDate && (
            <p className="text-muted mt-2">📅 Uploaded on: {uploadDate}</p>
          )}
        </div>
      )}
    </div>
  );
}  

  import { useRef, useState } from "react";
import axios from 'axios';

// Format timestamp in filename to readable date
const extractFormattedDateFromFilename = (filename) => {
  const match = filename.match(/_(\d+)\./);
  if (match) {
    const timestamp = parseInt(match[1], 10);
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-IN', options);
  }
  return '';
};

export default function Fileupload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const fileInput = useRef();

  const saveFile = () => {
    const selectedFile = fileInput.current.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setStatus("");
    setImageURL("");
    setUploadDate("");
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus("❌ Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      setStatus(`✅ ${response.data.message}`);

      if (response.data.filename && response.data.folder) {
        const fullPath = `http://localhost:8000/${response.data.folder}/${response.data.filename}`;
        setImageURL(fullPath);
        const readableDate = extractFormattedDateFromFilename(response.data.filename);
        setUploadDate(readableDate);
      }

    } catch (err) {
      console.error("Upload failed", err);
      if (err.response?.data?.message) {
        setStatus(`❌ ${err.response.data.message}`);
      } else {
        setStatus("❌ Upload failed due to network/server error");
      }
    }
  };

  return (
    <div className="mt-5" style={{ maxWidth: "500px" }}>
      <input
        type="file"
        ref={fileInput}
        onChange={saveFile}
        className="form-control mb-3"
      />
      <button className="btn btn-primary w-100" onClick={uploadFile}>
        Upload
      </button>

      {status && (
        <p className="mt-3 fw-bold" style={{ color: status.startsWith("✅") ? "green" : "red" }}>
          {status}
        </p>
      )}

      {imageURL && (
        <div className="mt-3">
          <h5>Uploaded Image:</h5>
          <img src={imageURL} alt="Uploaded" className="img-fluid rounded shadow" />
          {uploadDate && (
            <p className="text-muted mt-2">📅 Uploaded on: {uploadDate}</p>
          )}
        </div>
      )}
    </div>
  );
} 



import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const extractFormattedDateFromFilename = (filename) => {
  const match = filename.match(/_(\d+)\./);
  if (match) {
    const timestamp = parseInt(match[1], 10);
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-IN', options);
  }
  return '';
};

export default function Fileupload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const fileInput = useRef();
  const navigate = useNavigate();

  // ✅ Check if user already uploaded
  useEffect(() => {
    if (localStorage.getItem("uploadedOnce") === "true") {
      navigate("/thankyou");
    }
  }, [navigate]);

  const saveFile = () => {
    const selectedFile = fileInput.current.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setStatus("");
    setImageURL("");
    setUploadDate("");
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus("❌ Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await axios.post("https://imageup-backend.onrender.com/upload", formData)

      setStatus(`✅ ${response.data.message}`);

      if (response.data.filename && response.data.folder) {
        const fullPath = `http://localhost:8000/${response.data.folder}/${response.data.filename}`;
        setImageURL(fullPath);
        setUploadDate(extractFormattedDateFromFilename(response.data.filename));

        // ✅ Mark user as uploaded
        localStorage.setItem("uploadedOnce", "true");

        // ✅ Redirect after short delay
        setTimeout(() => {
          navigate("/thankyou");
        }, 1500);
      }

    } catch (err) {
      console.error("Upload failed", err);
      if (err.response?.data?.message) {
        setStatus(`❌ ${err.response.data.message}`);
      } else {
        setStatus("❌ Upload failed due to network/server error");
      }
    }
  };

  return (
    <div className="mt-5" style={{ maxWidth: "500px" }}>
      <input
        type="file"
        ref={fileInput}
        onChange={saveFile}
        className="form-control mb-3"
        disabled={localStorage.getItem("uploadedOnce") === "true"}
      />
      <button
        className="btn btn-primary w-100"
        onClick={uploadFile}
        disabled={localStorage.getItem("uploadedOnce") === "true"}
      >
        Upload
      </button>

      {status && (
        <p className="mt-3 fw-bold" style={{ color: status.startsWith("✅") ? "green" : "red" }}>
          {status}
        </p>
      )}

      {imageURL && (
        <div className="mt-3">
          <h5>Uploaded Image:</h5>
          <img src={imageURL} alt="Uploaded" className="img-fluid rounded shadow" />
          {uploadDate && (
            <p className="text-muted mt-2">📅 Uploaded on: {uploadDate}</p>
          )}
        </div>
      )}
    </div>
  );
}  
   */




import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const extractFormattedDateFromFilename = (filename) => {
  const match = filename.match(/_(\d+)\./);
  if (match) {
    const timestamp = parseInt(match[1], 10);
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-IN', options);
  }
  return '';
};

export default function Fileupload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const fileInput = useRef();
  const navigate = useNavigate();

  // Redirect if already uploaded once
  useEffect(() => {
    if (localStorage.getItem("uploadedOnce") === "true") {
      navigate("/thankyou");
    }
  }, [navigate]);

  const saveFile = () => {
    const selectedFile = fileInput.current.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setStatus("");
    setImageURL("");
    setUploadDate("");
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus("❌ Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await axios.post("https://imageup-backend.onrender.com/upload", formData);

      setStatus(`✅ ${response.data.message}`);

      if (response.data.filename && response.data.folder) {
        // Use your Render backend URL here, not localhost
        const fullPath = `https://imageup-backend.onrender.com/${response.data.folder}/${response.data.filename}`;
        setImageURL(fullPath);
        setUploadDate(extractFormattedDateFromFilename(response.data.filename));

        // Mark user as uploaded once
        localStorage.setItem("uploadedOnce", "true");

        // Redirect after 1.5 seconds
        setTimeout(() => {
          navigate("/thankyou");
        }, 1500);
      }

    } catch (err) {
      console.error("Upload failed", err);
      if (err.response?.data?.message) {
        setStatus(`❌ ${err.response.data.message}`);
      } else {
        setStatus("❌ Upload failed due to network/server error");
      }
    }
  };

  return (
    <div className="mt-5" style={{ maxWidth: "500px" }}>
      <input
        type="file"
        ref={fileInput}
        onChange={saveFile}
        className="form-control mb-3"
        disabled={localStorage.getItem("uploadedOnce") === "true"}
      />
      <button
        className="btn btn-primary w-100"
        onClick={uploadFile}
        disabled={localStorage.getItem("uploadedOnce") === "true"}
      >
        Upload
      </button>

      {status && (
        <p className="mt-3 fw-bold" style={{ color: status.startsWith("✅") ? "green" : "red" }}>
          {status}
        </p>
      )}

      {imageURL && (
        <div className="mt-3">
          <h5>Uploaded Image:</h5>
          <img src={imageURL} alt="Uploaded" className="img-fluid rounded shadow" />
          {uploadDate && (
            <p className="text-muted mt-2">📅 Uploaded on: {uploadDate}</p>
          )}
        </div>
      )}
    </div>
  );
}

  

