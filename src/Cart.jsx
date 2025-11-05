import {useState, useEffect} from "react";

const Cart = ({v, setV}) => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    
    const onSubmit = () => {
        setV(0);
        //setD(data);
    }

    const cartItems = cart.map((element, index) => (
        <div key={index}>
            <img src={element.image} width={150} alt={element.id} />
            {element.title}
            ${element.price}
        </div>
    ));

    useEffect(()=>{
        const total = () => {
            let totalAmount = 0;
            for (let i=0; i<cart.length; i++){
                totalAmount += cart[i].price;
            }
            setCartTotal(totalAmount);
            console.log(totalAmount);
        };
        total();
    },[cart]);

    return (
        <div>
            <button type="submit" onClick={onSubmit}>return</button>
            <h1>Items in Cart :</h1>
            {cartItems}
            <h1>Order total to pay :{cartTotal}</h1>
        </div>
    )
}

export default Cart;