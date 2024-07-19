import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://book-api-5bl8.onrender.com/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        setError('Error fetching book details. Please try again later.');
        toast.error('Error fetching book details. Please try again later.');
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description || 'No description available'}</p>
      {book.coverImage && (
        <Link to={`/read/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={`https://book-api-5bl8.onrender.com/${book.coverImage}`} alt={book.title || 'Book cover'} style={{ maxWidth: '100%', cursor: 'pointer' }} />
        </Link>
      )}
      {book.pdfUrl && (
        <Link to={`/read/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button style={{ marginTop: '20px', padding: '10px 20px', background: '#ff0000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Read
          </button>
        </Link>
      )}
    </div>
  );
};

export default BookDetails;
