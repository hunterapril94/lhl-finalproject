function Product(props) {
  return (
    <div className="product">
      <img src={props.image} height="300" width="300" />
      <h2>{props.name}</h2>
      <h3>{props.category}</h3>
      <h3>Price: ${props.price / 100}</h3>
      <h3>Deposit Amount: ${props.deposit_amount / 100}</h3>
      <h3>Description: {props.description}</h3>
    </div>
  );
}
export default Product;
