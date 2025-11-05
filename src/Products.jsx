import {useState, useEffect} from "react";

const Product= ({v, setV})=>{
    const [catalog, setCatalog] = useState([]);
    const [cart, setCart] = useState([]);

    const onSubmit = () => {
        //console.log(data);
        //console.log(data.fullName);
        setV(1);
        //setD(data);
    }

    const addToCart = (element) => {
        setCart([...cart, element]);
    };

    const removeFromCart = (element) => {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (cartItem.id === element.id && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
        }
    };

    const listItems = catalog.map((element) => {
        return <div key={element.id}>
            <img src={element.image} width={100} />
            {element.title}
            {element.category}
            {element.price}
            
        </div>
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const someResponse = await fetch("/products.json");
                const data = await someResponse.json();
                
                // update State Variable
                setCatalog(data);
                console.log(data);
            } catch (error){
                console.log("Error :",error);
            }
        };
        fetchData();
    }, []);

    return(
        <div>
            <button type="submit" onClick={onSubmit}>Checkout</button>
            {listItems}
        </div>
    )
}

export default Product;