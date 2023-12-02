// i need to handle when pagination have to be enable with filter

import React, { useState, useEffect } from 'react';
import styles from "./AllProducts.module.css";
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';


const AllProducts = () => {
    // state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageLimit = 10;
    const [totalPages, setTotalPages] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [isError, setIsError] = useState(false);
    // filtering product by category

    const [selectedOption, setSelectedOption] = useState(null);
    const [allCategory, setAllCategory] = useState([]);

    // discount filter
    const [discount, setDiscount] = useState(0);

    const options = allCategory;

    // check if we did price filtering
    const [isPriceFilter, setIsPriceFilter] = useState({ min: 0, max: 300000 });

    function nextPageHandler() {
        setCurrentPage((currentPageNo) => currentPageNo + 1)
    };
    function prevPageHandler() {
        setCurrentPage((currentPageNo) => currentPageNo - 1)
    };






    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };



    useEffect(() => {
        // console.log(selectedOption);
        console.log(isPriceFilter)

        // for pagination when no filter applied
        // call function
        if (selectedOption === null) {
            async function fetchProducts() {
                setIsLoading(true);
                try {
                    const products = await fetch(`https://dummyjson.com/products?limit=${pageLimit}&skip=${(currentPage - 1) * 10}`);

                    const productsArray = await products.json();

                    console.log(productsArray.products);
                    setProducts(productsArray.products.filter(product => (product.price * 80 >= isPriceFilter.min && product.price * 80 < isPriceFilter.max && product.discountPercentage >= discount)));
                    if (!products.ok) {
                        throw new Error({ message: "Product not found" });
                    }

                    // stop the loading
                    setIsLoading(false);
                } catch (e) {
                    setIsError({ message: e.message || "can't find products" });
                    console.log(e.message);
                }
            }


            fetchProducts();
        } else {
            async function filterByCategory(option) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`https://dummyjson.com/products/category/${option}?limit=${pageLimit}&skip=${(currentPage - 1) * 10}`);

                    if (!response.ok) {
                        throw new Error(`Failed to fetch products for category ${option}`);
                    }

                    const productsArray = await response.json();
                    // console.log(typeof productsArray);
                    setProducts(productsArray.products.filter(product => product.price * 80 >= isPriceFilter.min && product.price * 80 < isPriceFilter.max && product.discountPercentage >= discount));
                    setIsLoading(false)
                } catch (error) {
                    setIsError({ message: error.message || "Failed to fetch products" });
                    console.error(error.message);
                }
            }
            filterByCategory(selectedOption);
        }

        // filtering product by Price
        // ///////in frontend/

        function filterProductByPrice(minPrice, maxPrice) {
            setIsLoading(true);
            setProducts((prevProducts) => { return prevProducts.filter(product => product.price * 80 >= minPrice && product.price * 80 < maxPrice) });
            setIsLoading(false);
        }

        // currently not working
        // filterProductByPrice(isPriceFilter.min, isPriceFilter.max);
        async function allCategory() {
            const response = await fetch("https://dummyjson.com/products/categories");
            const categories = await response.json();
            setAllCategory(categories);
        }

        allCategory();

    }, [currentPage, selectedOption, pageLimit, isPriceFilter, discount]);


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <LeftSideBar allCategory={allCategory} handleOptionClick={handleOptionClick} setIsPriceFilter={setIsPriceFilter} setDiscount={setDiscount} />
            </div>

            <div className={styles.right}>
                <RightSideBar isError={isError} isLoading={isLoading} products={products} prevPageHandler={prevPageHandler} currentPage={currentPage} nextPageHandler={nextPageHandler} totalPages={totalPages} />
            </div>

        </div>
    )
}

export default AllProducts