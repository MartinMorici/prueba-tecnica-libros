'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import libros from '../books.json';
import close from '../assets/close.svg';
import BookCard from '../components/Book';
import { Book } from '@/types';
import Filters from '@/components/Filters';

export default function Home() {
  const rawBooks = libros.library.map((libro) => libro.book);
  const [list, setList] = useState<Book[]>(JSON.parse(localStorage.getItem('list') ?? '[]'));
  const [books, setBooks] = useState<Book[]>(rawBooks);
  const [selectedGenre, setSelectedGenre] = useState<string>('todos');
  const maxPages = String(Math.max(...rawBooks.map((obj) => obj.pages)));
  const [pages, setPages] = useState<string>(String(maxPages));
  const uniqueGenres = Array.from(new Set(libros.library.map(({ book }) => book.genre)));

  const updateList = (libro: Book) => {
    if (list.find((book) => book.ISBN === libro.ISBN)) {
      const currentStorage = JSON.parse(localStorage.getItem('list') ?? '[]');
      const updatedStorage = currentStorage.filter((book: Book) => book.ISBN !== libro.ISBN);
      localStorage.setItem('list', JSON.stringify(updatedStorage));

      const updatedList = list.filter((book) => book.ISBN !== libro.ISBN);
      setList(updatedList);
      return;
    }

    localStorage.setItem('list', JSON.stringify([...list, libro]));
    setList([...list, libro]);
  };

  useEffect(() => {
    setPages(maxPages)
  }, [selectedGenre])
  

  return (
    <main className=' max-w-screen-2xl w-full mx-auto flex flex-col sm:flex-row gap-6 py-4 '>
      <section className='w-full grid grid-cols-[repeat(auto-fill,minmax(176px,max-content))] h-max overflow-ellipsis gap-6 justify-center justify-items-start  '>
        <h1 className='col-span-full text-4xl'>Libros disponibles: {books.length} </h1>
        {list.length > 0 && <h2 className='col-span-full text-2xl mt-[-20px]'>En la lista de lectura: {list.length}</h2>}
        <Filters uniqueGenres={uniqueGenres} pages={pages} maxPages={maxPages} setBooks={setBooks} setSelectedGenre={setSelectedGenre} setPages={setPages} rawBooks={rawBooks} selectedGenre={selectedGenre}/>
        {books.map((book) => (
          <BookCard key={book.ISBN} book={book} list={list} updateList={updateList} ></BookCard>
        ))}
      </section>
      {list.length > 0 && (
        <section className='h-max bg-[#726887] p-4 rounded-lg'>
          <h4 className='text-center text-4xl mb-4 text-black font-bold'>Lista de Lectura</h4>
          <div className='grid grid-cols-2 place-content-start gap-2'>
            {list.map((book) => (
              <article key={book.ISBN} className='relative'>
                <img className='w-80 h-[306px] object-cover rounded-lg' src={book.cover} alt={book.title} />
                <img className='w-7 p-1 absolute top-2 right-2 bg-[#00000096] rounded-lg cursor-pointer' src={close.src} alt='Close' onClick={() => updateList(book)} />
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
