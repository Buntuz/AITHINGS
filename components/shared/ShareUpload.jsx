import { useState } from 'react';
import axios from 'axios';
import {Button,Box, TextField, Input} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material';
import { BASE_URL } from "../../config/baseurl";

const StyledInput = styled(Input)({
  fontSize: '16px', // Adjust the font size as needed
  fontFamily: 'Arial, sans-serif', // Adjust the font family as color="secondary"needed
  color: 'white',

  fontWeight: 'bold'
  // Add more styles as needed
});

const MyThemeComponent = styled('div')(({ theme }) =>({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'primary.contrastText',
  backgroundColor: 'primary.main',
  padding: 1,
  borderRadius: 5,
  backgroundColor: '#1A2027',
  display: 'flex',
}),
);


const FileUpload = ({ onUploadSuccess , londid, lastisertedid}) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(`${BASE_URL}/data/api/uploads/loan_comments/Nondwe.pdf`);
  const [commentAdded, setCommentAdded] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileName = selectedFile.name;
    const fileExtension = fileName.split('.').pop(); // Get the file extension
    //Rename the file (you can customize the new name as needed)
    const timestamp = Date.now();
    const newFileName = `${londid}-${lastisertedid}.${fileExtension}`;
    const renamedFile = new File([selectedFile], newFileName);
    setFile(renamedFile);
    //setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
   
    if (!file) {
      console.error('No file selected');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    try {
        
      const response = await axios.post(`${BASE_URL}/data/api/uploads/file_upload.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      //setCommentAdded(response);
      onUploadSuccess(); // Call the callback function after successful upload
      //console.log(response.data);
    } catch (error) {
      //console.error('Error uploading file:', error);
    }
  };

  return (
    <MyThemeComponent>
     
      <StyledInput
      type="file"
      onChange={handleFileChange}
      color="secondary"
    />

      <Button color="primary" onClick={handleUpload}>Upload</Button>
      {commentAdded && <b>Error: {JSON.stringify(commentAdded)}</b>}
    </MyThemeComponent>
  );
};

export default FileUpload;
