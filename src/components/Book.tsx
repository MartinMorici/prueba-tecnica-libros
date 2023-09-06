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
    <article key={book.ISBN} className={`h-max ${isAdded && 'opacity-50'}`}>
      <img src={book.cover} alt={book.title} className='w-44 h-[263px] object-cover rounded-lg' />
      <h2 className='font-bold text-[17px]  w-44 whitespace-nowrap overflow-hidden overflow-ellipsis'>{book.title}</h2>
      <h3 className='font-light text-slate-300 text-[15px]'>{book.author.name}</h3>
      <button
        className={`cursor-pointer ${isAdded && 'bg-red-900'} bg-purple-900 py-1 px-2 rounded-md text-[13px] mt-4 flex gap-1 justify-center items-center`}
        onClick={() => {
          updateList(book);
          setIsAdded(!isAdded);
        }}
      >
        {isAdded 
          ? (<>Remove from List</>) 
          : (<>Add to List <img className='w-4 h-4 text-white' src={add.src} alt='Add' /></>)
        }
      </button>
    </article>
  );
};

export default BookCard;


