import { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination';

function App() {
  const [products, setProducts] = useState([]);
  const [currPage, setcurrPage] = useState(0);

  const Products_Per_Page = 10;

  const deleteProduct = (id) => {
    const newProducts = products.filter((prd) => prd.id !== id);
    setProducts(newProducts);
  };

  const completeProduct = (id) => {
    const updatedProducts = products.map((prd) => {
      if (prd.id === id) {
        return { ...prd, completed: true };
      } else {
        return prd;
      }
    });

    console.log(updatedProducts);
    setProducts(updatedProducts);
  };

  const setNextPage = () => {
    setcurrPage((page) => page + 1);
    console.log('Set the next page');
  };

  const setPrevPage = () => {
    setcurrPage((page) => page - 1);
    console.log('Set the previous page');
  };

  const startIdx = currPage * Products_Per_Page;
  const endIdx = currPage * Products_Per_Page + Products_Per_Page;
  const currentProduct = products.slice(startIdx, endIdx);

  useEffect(() => {
    let fetchedProducts = [];
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        fetchedProducts = data.products;
        console.log('Fetched Products:', fetchedProducts);

        const arr = fetchedProducts.map((product) => ({
          ...product,
          completed: false,
        }));

        setProducts(arr);
      })
      .catch((err) => console.error(err));

    console.log('Products before fetch completes:', fetchedProducts);
  }, []);

  console.log(currPage);

  return (
    <>
      <div>Products Fetching</div>
      <div>
        {currentProduct.map((prd) => {
          return (
            <div key={prd.id} className={prd.completed ? 'completed' : ''}>
              <input
                className='productItem'
                type='checkbox'
                onClick={() => completeProduct(prd.id)}
              />
              {prd.title}{' '}
              <button onClick={() => deleteProduct(prd.id)}>Delete</button>
            </div>
          );
        })}
      </div>

      <Pagination
        products_per_page={Products_Per_Page}
        products={products}
        setNextPage={setNextPage}
        setPrevPage={setPrevPage}
        currPage={currPage}
      />
    </>
  );
}

export default App;
