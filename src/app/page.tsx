'use client';
import { useEffect, useState } from 'react';
import libros from '../books.json';
import close from '../assets/close.svg';
import emptyIcon from '../assets/empty.svg';
import BookCard from '../components/BookCard';
import { Book } from '@/types';
import Filters from '@/components/Filters';

export default function Home() {
  const rawBooks: Book[] = libros.library.map((libro) => libro.book);
  const uniqueGenres: string[] = Array.from(new Set(rawBooks.map((book) => book.genre)));
  const maxPages: string = String(Math.max(...rawBooks.map((obj) => obj.pages)));
  const [list, setList] = useState<Book[]>(JSON.parse(localStorage.getItem('list') ?? '[]'));
  const [books, setBooks] = useState<Book[]>(rawBooks);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [pages, setPages] = useState<string>(String(maxPages));

  addEventListener('storage', () => {
    const refreshList = JSON.parse(localStorage.getItem('list') ?? '[]');
    setList(refreshList);
  });

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
    setPages(maxPages);
  }, [selectedGenre]);

  return (
    <main className='max-w-screen-2xl w-full mx-auto py-4 px-4 flex flex-col lg:flex-row gap-16 '>
      <section className='w-full grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] h-max overflow-ellipsis gap-4 gap-y-6 place-content mt-4 '>
        <div className='col-span-full flex flex-col lg:flex-row justify-between items-center mb-4 max-w-[1072px]'>
          <h2 className='text-3xl mb-2 sm:mb-0 sm:text-4xl sm:pr-4'>Nuestros libros...</h2>
          <Filters uniqueGenres={uniqueGenres} pages={pages} maxPages={maxPages} setBooks={setBooks} setSelectedGenre={setSelectedGenre} setPages={setPages} rawBooks={rawBooks} selectedGenre={selectedGenre} />
        </div>
        {books.map((book) => (
          <BookCard key={book.ISBN} book={book} list={list} updateList={updateList}></BookCard>
        ))}
      </section>
      <section className='sm:ml-8 px-1 sm:px-0 bg-gray-900 max-w-[350px] w-full rounded-3xl mx-auto sm:mx-0'>
        <h4 className='text-center text-3xl sm:text-4xl mt-4 mb-4 max-w-[400px]'>Lista de Lectura</h4>
        {list.length <= 0 && (
          <div className='h-[calc(100vh-56px)] flex flex-col justify-center'>
            <img className='w-16 block mx-auto' src={emptyIcon.src} alt='Empty' />
            <h5 className='text-neutral-300 text-center'>
              ¡Oops, todavía no agregaste ningun <br /> libro a tu lista!
            </h5>
          </div>
        )}
        <ol className='list-decimal list-inside h-max  p-4 rounded-lg'>
          {list.map((book, index) => (
            <li key={book.ISBN} className='flex items-center gap-4 mb-4'>
              <span className='hidden sm:block whitespace-nowrap tabular-nums'>{index + 1} .</span>
              <img className='object-cover rounded-lg w-16' src={book.cover} alt={book.title} />
              <div>
                <h5 className='font-semibold  whitespace-nowrap overflow-hidden  text-ellipsis  max-w-[106px] sm:max-w-[160px] '>{book.title}</h5>
                <h5>{book.author.name}</h5>
              </div>
              <div className='ml-auto w-4 h-4'>
                <img className='cursor-pointer' src={close.src} alt='Close' onClick={() => updateList(book)} />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
