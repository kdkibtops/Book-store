/* eslint-disable */
import "./App.css";
import { SerachPage } from "./Components/SearchPage/SerachPage";
import { MyReads } from "./Components/MyReads/MyReads";
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import *  as BooksAPI from './utils/BooksAPI'
/* eslint-enable */


// const srcbooks = [
//   {
//     bookTitle: `To Kill a Mockingbird`,
//     url: `url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")`,
//     shelf: `currentlyReading`,
//     bookAuthors: `Harper Lee`
//   },
//   {
//     bookTitle: `Ender's Game`,
//     url: `url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")`,
//     shelf: `currentlyReading`,
//     bookAuthors: `Orson Scott Card`
//   },
//   {
//     bookTitle: `1776`,
//     url: `url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")`,
//     shelf: `wantToRead`,
//     bookAuthors: `David McCullough`
//   },
//   {
//     bookTitle: `Harry Potter and the Sorcerer's Stone`,
//     url: `url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")`,
//     shelf: `wantToRead`,
//     bookAuthors: `J.K. Rowling`
//   },
//   {

//     bookTitle: `The Hobbit`,
//     url: `url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")`,
//     shelf: `read`,
//     bookAuthors: `J.R.R. Tolkien`
//   },
//   {
//     bookTitle: `Oh, the Places You'll Go!`,
//     url: `url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")`,
//     shelf: `read`,
//     bookAuthors: `Seuss`
//   },
//   {
//     bookTitle: `The Adventures of Tom Sawyer`,
//     url: `url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")`,
//     shelf: `read`,
//     bookAuthors: `Mark Twain`
//   },

// ]

function App() {
  let navigate = useNavigate();
  const [library, setLibrary] = useState([]);
  const changeShelf = (val) => {
    console.log(val)
  }

  const navigateTo = (url) => {
    navigate(url);
  }

  useEffect(() => {
    const getLibrary = async () => {
      const response = await BooksAPI.getAll();
      const arranged = response.map((book) => {
        return ({
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
              changeShelf={changeShelf}
            />
          }
        />

        <Route
          exact path="/"
          element={
            <MyReads
              navigation={navigateTo}
              library={library}
              changeShelf={changeShelf}
            />
          }
        />

      </Routes>
    </div>

  );
}

export default App;
