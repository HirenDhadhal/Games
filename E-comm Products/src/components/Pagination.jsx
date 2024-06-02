import React from 'react';

function Pagination({
  products_per_page,
  products,
  setNextPage,
  setPrevPage,
  currPage,
}) {
  const totalPage = products.length / products_per_page;
  console.log(totalPage, currPage, totalPage);
  return (
    <div>
      <button disabled={currPage <= 0} onClick={() => setPrevPage()}>
        Previous Page
      </button>
      Pagination: {products_per_page} and {products.length}
      <button
        disabled={currPage >= totalPage - 1}
        onClick={() => setNextPage()}
      >
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
