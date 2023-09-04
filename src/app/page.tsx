import { useState } from 'react';
import libros from '../books.json';

export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: {
    name: string;
    otherBooks: string[];
  };
}

export default function Home() {
  const books: Book[] = libros.library.map((libro) => libro.book);

  return (
    <main className='mx-auto max-w-screen-xl grid grid-cols-[repeat(auto-fill,minmax(176px,max-content))] overflow-ellipsis gap-6 place-content-center  p-8'>
      {books.map((book) => (
        <article className=''>
          <img src={book.cover} alt={book.title} className='w-44 h-[263px] object-cover rounded-lg' />
          <h2 className='font-bold text-[17px]  w-44 whitespace-nowrap overflow-hidden overflow-ellipsis'>{book.title}</h2>
          <h3 className='font-light text-slate-300 text-[15px]'>{book.author.name}</h3>
          <button className='bg-purple-900 py-1 px-2 rounded-md text-[15px] mt-4'>Add to List</button>
        </article>
      ))}
    </main>
  );
}
