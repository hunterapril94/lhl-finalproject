import Product from "./Product";
export default function Products(props) {
  console.log("props", props.products);
  console.log(Array.isArray(props.products));
  const products = props.products.map((product) => {
    console.log(product.price_per_day_cents);
    return (
      <Product
        key={product.id}
        name={product.name}
        category={product.category}
        price={product.price_per_day_cents}
        deposit_amount={product.deposit_amount_cents}
        description={product.description}
        image={product.image}
      />
    );
  });
  Array.isArray(products);
  return (
    <div className="products">
      <h1>Products</h1>
      <ul>
        {props.products.length > 1 ? (
          products
        ) : (
          <Product name="No Products Available" />
        )}
      </ul>
    </div>
  );
}
