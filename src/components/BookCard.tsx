'use client';
import React, { useState, useEffect } from 'react';
import add from '../assets/add-new.svg';
import { Book } from '@/types';

interface Props {
  book: Book;
  list: Book[];
  updateList: (libro: Book) => void;
}

const BookCard = ({ book, updateList, list }: Props) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);

    useEffect(() => {
      const isInList = list.some((libro) => libro.ISBN === book.ISBN)
      setIsAdded(isInList)
    }, [list])
    
  return (
    <article key={book.ISBN} className={`h-max mr-2 flex gap-x-4 justify-center sm:justify-normal`}>
      <img src={book.cover} alt={book.title} className='rounded-lg w-40 h-[240px]' />
      <div className='w-max flex flex-col justify-center' >
        <h2 className='font-bold text-[17px] whitespace-nowrap overflow-hidden overflow-ellipsis w-40 '>{book.title}</h2>
        <h3 className='font-light text-neutral-200 text-[15px]'>{book.author.name}</h3>
        <h3 className=' mt-4 font-light text-white text-[15px]'>{book.genre}</h3>
        <h3 className='font-light text-white text-[15px]'>{book.pages} páginas</h3>
        <button
          className={`cursor-pointer  ${isAdded && 'bg-rose-500'} bg-indigo-600 py-1 px-2 w-max rounded-md text-[13px] mt-4 flex gap-1 justify-center items-center`}
          onClick={() => {
            updateList(book);
            setIsAdded(!isAdded);
          }}
        >
          {isAdded
            ? (<>Quitar de la Lista</>)
            : (<>Agregar a la Lista <img className='w-4 h-4 text-white' src={add.src} alt='Add' /></>)
          }
        </button>
      </div>
    </article>
  );
};

export default BookCard;


