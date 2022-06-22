import "./App.css";
import { SerachPage } from "./Components/SearchPage/SerachPage";
import { MyReads } from "./Components/MyReads/MyReads";
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import *  as BooksAPI from './utils/BooksAPI'

function App() {
  const [library, setLibrary] = useState([]);
  const [query, setQuery] = useState(sessionStorage.getItem('query') ? sessionStorage.getItem('query') : '');
  const [currentlyShowing, setcurrentlyShowing] = useState([]);
  const [flipState, setFlipState] = useState(true);


  const clearQuery = () => {
    setQuery('');
    sessionStorage.setItem('query', '');
    setcurrentlyShowing(library);
  }

  const searchBooks = async (query_string) => {
    setQuery(query_string)
    sessionStorage.setItem('query', query_string);
    if (query_string !== '') {
      const response = await BooksAPI.search(query_string, 20);
      if (!response.error) {
        setcurrentlyShowing(response);
        sessionStorage.setItem('currentlyShowing', JSON.stringify(response))
      } else {
      }
    } else if (query_string === '') {
      clearQuery();
    }
    setFlipState(!flipState);
  }


  const updateBook = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    book.shelf = shelf;
    setLibrary([...library.filter((b) => {
      return b.id !== book.id
    }), book])
    setFlipState(!flipState);
  }

  useEffect(() => {
    const getLibrary = async () => {
      const response = await BooksAPI.getAll();
      setLibrary(response)
      if (!sessionStorage.getItem('query') && !sessionStorage.getItem('currentlyShowing')) {
        setcurrentlyShowing(response);
      } else {
        setcurrentlyShowing(JSON.parse(sessionStorage.currentlyShowing))
      }
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
              mainLibrary={library}
              library={currentlyShowing}
              query={query}
              searchBooks={searchBooks}
              clearQuery={clearQuery}
              changeShelf={updateBook}
            />
          }
        />

        <Route
          exact path="/"
          element={
            <MyReads
              library={library}
              changeShelf={updateBook}
              clearQuery={clearQuery}
            />
          }
        />

      </Routes>
    </div>

  );
}

export default App;
