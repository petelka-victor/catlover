import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface CatCardProps {
  image: string;
  name: string;
  catId: string;
}

export const CatCard: React.FC<CatCardProps> = ({ image, name, catId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setCatParam: React.MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();

    setSearchParams({
      cat: catId,
    });
  };

  return (
    <div className="w-72 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a onClick={setCatParam} href="#">
        <img className="rounded-t-lg " src={image} alt="" />
      </a>
      <div className="p-5 ">
        <a href="#" onClick={setCatParam}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>

        <a
          onClick={setCatParam}
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
