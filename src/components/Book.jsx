import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://book-api-5bl8.onrender.com/api/books');
        setBooks(response.data);
      } catch (error) {
        setError('Error fetching books. Please try again later.');
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to fetch books only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (books.length === 0) {
    return <div>No books found</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {books.map(book => (
        <div key={book._id} style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
            <Link to={`/book/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {book.coverImage && (
                <img
                  src={`https://book-api-5bl8.onrender.com/${book.coverImage}`}
                  alt={book.title || 'Book cover'}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '10px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{book.title || 'Untitled'}</h2>
                <p style={{ fontSize: '0.9rem', margin: '0' }}>Author: {book.author || 'Unknown'}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Book;
