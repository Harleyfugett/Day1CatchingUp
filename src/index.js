//This is library imports.
//createRoot is controlling the contents inside the app container and is allowing it to be rendered into the DOM.
import { createRoot } from "react-dom/client";
//These are React hooks, The Effect Hook allows you to perform side effects in function components, side effects such as "Data fetching, changing the dom, or setting up data within the code from the DOM"
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";




//This is the function expression that allows for a React function to return JSX code
const App = () => {

    //Created state that will be able to hold the eventual data from a fetch
    const [products, setProducts] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function fetchProductData() {

        //The try block will attempt to run some async code
        try {

            //This is a test to the console to see if the Async function is currently working
            console.log("my async function is running");

            //The fetch function takes in one mandatory parameter, the url of the API your trying to use
            const response = await fetch('https://dummyjson.com/products')
            console.log(response);

            //This is translating the data to something legible to JS. Making it an await because of how much information it'll take so it'll hold it till it's translated
            const translatedData = await response.json();
            console.log(translatedData);

            //This is to make sure that the correct data is being grabbed
            const actualProductData = translatedData.products
            console.log(actualProductData);

            //I have loaded my state with data
            setProducts(actualProductData);

            //The catch block will only run if the try block's code fails to excecute
        } catch (e) {
            console.log(e);
        }
    }

    //This is the useEffect hook in action
    useEffect(() => {

        //This is an async function that will fetch data from the API
        fetchProductData();

        //This is so that it doesn't go on for eternity, so it only runs on component mounting
    }, [])

    //I am now rendering the JS state to the DOM, using the .map method as I've put my data into an Array
    return (
        
            <div>
                {
                    //By saying products.length I am allowing JS to see if it has a length of 0 or more, to which if it loads no State content then it's 0 and will default to the <div> written below giving an error message.
                    //Products.map is seeking through every object in the products data using a .method, combing through the now translated data of singleProductElement. I've given it the capability of naming every object spat out with a key of idx to individualize each object further in the code.
                        products.length ? products.map((singleProductElement, idx) => {
                            return (
                                //By combing through the singleProducts element I can look for key tags to bring them forward onto the dom and display it.
                                //I've also managed to grab the images for each product and have them display from their own arrays, also making it so that when they don't load it'll display the product's ID instead
                                //I've taken every tag and put them into a <p> tag and them I'm directing to the objects given to me and I manually made them listed out with each object getting their tags below their Product Posts, keeping it clean using the .map method and allowing for individual object elements
                                <div key="idx">
                                    <p>ID: {singleProductElement.id}</p>
                                    {singleProductElement.images.map((image, index) => (
                                        <img src={image} alt={`Product ${singleProductElement.id} image ${index}`} />
                                    ))}
                                    <p>Price: {singleProductElement.price}</p>
                                    <p>Brand: {singleProductElement.brand}</p>
                                    <p>Category: {singleProductElement.category}</p>
                                    <p>Description: {singleProductElement.description}</p>
                                    <p>Discount Percentage: {singleProductElement.discountPercentage}</p>
                                    <p>Rating: {singleProductElement.rating}</p>
                                    <p>Stock: {singleProductElement.stock}</p>
                                    <p>Title: {singleProductElement.title}</p>
                                </div>
                            )
                        


                        //Error message for when there is no data available to load onto the DOM
                    }) : <div>No data loaded</div>
                }
            </div>

            // <Routes>
            //     <Route path="/register" element={<RegisterForm />} />
            // </Routes>
        
    )
}


//I've fetched the HTML element to where I want my React code to render within the DOM
const appElement = document.getElementById("app")
//This is my React element simply coming into play from the React library, making a root DOM node
const root = createRoot(appElement)
//I've renderered my App component in this line, all the JSX is now being pulled to the DOM via here and allows us to update our code more easily
root.render(<App />)

