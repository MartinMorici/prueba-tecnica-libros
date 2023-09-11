import React from 'react';
import { Book } from '@/types';
import emptyIcon from '../assets/empty.svg';
import close from '../assets/close.svg';

interface Props {
    list: Book[], 
    updateList: (libro: Book) => void
}

const List = ({list,updateList}: Props) => {
  return (
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
  );
};

export default List;
