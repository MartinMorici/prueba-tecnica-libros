import { Book } from '@/types';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props {
  uniqueGenres: string[];
  maxPages: string;
  rawBooks: Book[]
  pages: string;
  setPages: Dispatch<SetStateAction<string>>;
  selectedGenre: string
  setSelectedGenre: Dispatch<SetStateAction<string>>;
  setBooks: Dispatch<SetStateAction<Book[]>>
  
}

const Filters = ({ uniqueGenres, pages, maxPages,selectedGenre, setSelectedGenre, setPages, rawBooks,setBooks }: Props) => {
    
  const filterBooks = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>, filtro: string) => {
    let filteredBooks;

    if (filtro === 'genre') {
      setSelectedGenre(e.target.value);
      if (e.target.value) {
        filteredBooks = rawBooks.filter((book) => book.genre === e.target.value)
      } else{
        filteredBooks = rawBooks
      }
    }

    if (filtro === 'pages') {
      setPages(e.target.value);
      if (selectedGenre) {
        filteredBooks = rawBooks.filter((book) => book.genre === selectedGenre && book.pages <= parseFloat(e.target.value));
      } else {
        filteredBooks = rawBooks.filter((book) => book.pages <= parseFloat(e.target.value));
      }
    }

    setBooks(filteredBooks!.map((book) => book));
  };

  return (
    <form action='' className='col-span-full flex flex-col sm:flex-row  gap-8 text-lg'>
      <div>
        <label htmlFor='genre' className='block'>Filtrar por género</label>
        <select className={`font-sans text-base`} name='' id='genre' onChange={(e) => filterBooks(e, 'genre')}>
          <option value=''>Todos</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='paginas' className='block'>Hasta {pages} páginas</label>
        <input className=' accent-indigo-800' type='range' id='paginas' onChange={(e) => filterBooks(e, 'pages')} value={pages} max={maxPages} />
      </div>
    </form>
  );
};

export default Filters;
