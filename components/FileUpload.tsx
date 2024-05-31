import { SetStateAction, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('https://revolvingloan.siyahlumainvest.co.za/data/api/uploads/loan_comments/Nondwe.pdf');

  const handleFileChange = (e: { target: { files: SetStateAction<null>[]; }; }) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    try {
        
      const response = await axios.post('https://revolvingloan.siyahlumainvest.co.za/data/api/uploads/file_upload.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
        {/* <div>
      <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
      </div> */}
      <div></div>
    </>);
};

export default FileUpload;
