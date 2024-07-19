import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookRead = () => {
  const { bookId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [pdfUrl, setPdfUrl] = React.useState('');
  const [loading, setLoading] = React.useState(true); // State to manage loading state

  React.useEffect(() => {
    const fetchBookPdfUrl = async () => {
      try {
        const response = await axios.get(`https://book-api-5bl8.onrender.com/api/books/${bookId}`);
        if (response.data.pdfFile) {
          setPdfUrl(`https://book-api-5bl8.onrender.com/${response.data.pdfFile}`);
        } else {
          toast.error('No PDF URL found for this book.');
        }
      } catch (error) {
        toast.error('Error fetching PDF URL. Please try again later.');
        console.error('Error fetching PDF URL:', error);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchBookPdfUrl();
  }, [bookId]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <div>Loading PDF...</div>; // Show loading indicator while fetching
  }

  if (!pdfUrl) {
    return <div>Failed to load PDF. Please check the URL or try again later.</div>;
  }

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div style={{ height: '750px' }}>
          <Viewer fileUrl={pdfUrl} />
        </div>
      </Worker>
    </div>
  );
};

export default BookRead;
