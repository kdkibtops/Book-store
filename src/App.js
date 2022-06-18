import "./App.css";
import { SerachPage } from "./Components/SearchPage/SerachPage";
import { MyReads } from "./Components/MyReads/MyReads";
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import *  as BooksAPI from './utils/BooksAPI'

function App() {
  let navigate = useNavigate();
  const [library, setLibrary] = useState([]);

  const navigateTo = (url) => {
    navigate(url);
  }

  const updateBook = async (book, shelf) => {
    const updatedBook = {
      id: book.id,
      bookTitle: book.bookTitle,
      url: book.url,
      bookAuthors: book.bookAuthors,
      shelf: shelf
    }

    await BooksAPI.update(book, shelf);

    setLibrary([...library.filter((b) => {
      return b.id !== book.id
    }), updatedBook])
  }

  useEffect(() => {
    const getLibrary = async () => {
      const response = await BooksAPI.getAll();
      const arranged = response.map((book) => {
        return ({
          id: book.id,
          bookTitle: book.title,
          url: `url("${book.imageLinks.smallThumbnail}")`,
          bookAuthors: book.authors,
          shelf: book.shelf
        })
      })
      setLibrary(arranged);
    }
    getLibrary();
  }, [])

  return (
    <div className="app">
      <Routes>
        <Route
          exact path="/search"
          element={
            <SerachPage
              navigation={navigateTo}
              library={library}
              changeShelf={updateBook}
            />
          }
        />

        <Route
          exact path="/"
          element={
            <MyReads
              navigation={navigateTo}
              library={library}
              changeShelf={updateBook}
            />
          }
        />

      </Routes>
    </div>

  );
}

export default App;
