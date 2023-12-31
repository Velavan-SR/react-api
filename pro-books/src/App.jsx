import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(response => {
      setBooks(response.data.books);
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        setError('Books not found');
      } else {
        setError('An error occurred while fetching the books');
      }
    });
  }, []);

  
  return (
    
    <div>
      
      {error && <p>Error: {error}</p>}
      
      {books.map(book => (
        
        <div key={book.id}>
          <h1>{book.title}</h1>
          <img src={book.imageLinks.thumbnail} alt={book.title} />
          <p>{book.description}</p>
          <p>Authors: {book.authors.join(', ')}</p>
          <hr />
        </div>
      
      ))}
    
    </div>
  
  );
}

export default App;