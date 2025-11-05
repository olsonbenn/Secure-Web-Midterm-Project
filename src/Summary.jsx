export function Summary({d, setD, v, setV}) {

    function handleValue() {
        setV(0);   
        setD({});
    }
    return (
    <div>
        <h1>Payment summary:</h1>
        <h3>{d.fullname}</h3>
        <p>{d.email}</p>
        <p>{d.creditCard}</p>
        <p>{d.address}</p>
        <p>{d.city},{d.state} {d.zip} </p>
        <button onClick={handleValue} className="btn btn-secondary">Submit</button>
    </div>);
}
