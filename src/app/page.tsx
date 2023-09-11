'use client';
import { useEffect, useState } from 'react';
import libros from '../books.json';
import BookCard from '../components/BookCard';
import { Book } from '@/types';
import Filters from '@/components/Filters';
import List from '@/components/List';

export default function Home() {
  const rawBooks: Book[] = libros.library.map((libro) => libro.book);
  const uniqueGenres: string[] = Array.from(new Set(rawBooks.map((book) => book.genre)));
  const maxPages: string = String(Math.max(...rawBooks.map((obj) => obj.pages)));
  const [list, setList] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>(rawBooks);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [pages, setPages] = useState<string>(String(maxPages));
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem('list') ?? '[]'));

    const simultaneousRefresh = () => {
      const refreshList = JSON.parse(localStorage.getItem('list') ?? '[]');
      setList(refreshList);
    };

    addEventListener('storage', simultaneousRefresh);
    setIsLoading(false)

    return () => {
      window.removeEventListener('storage', simultaneousRefresh);
    };

  }, []);

  return (
    <main className='max-w-screen-2xl w-full mx-auto py-4 px-4 flex flex-col lg:flex-row gap-16 '>
      <section className='w-full grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] h-max overflow-ellipsis gap-4 gap-y-6 place-content mt-4 '>
        <div className='col-span-full flex flex-col lg:flex-row justify-between items-center mb-4 max-w-[1072px]'>
          <h2 className='text-3xl mb-2 sm:mb-0 sm:text-4xl sm:pr-4'>Nuestros libros...</h2>
          <Filters uniqueGenres={uniqueGenres} pages={pages} maxPages={maxPages} setBooks={setBooks} setSelectedGenre={setSelectedGenre} setPages={setPages} rawBooks={rawBooks} selectedGenre={selectedGenre} />
        </div>
        {!isLoading && books.map((book) => (
          <BookCard key={book.ISBN} book={book} list={list} updateList={updateList}></BookCard>
        ))}
      </section>
      <List list={list} updateList={updateList} />
    </main>
  );
}
