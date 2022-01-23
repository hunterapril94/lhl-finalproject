import Item from "./Item";
import {
  dayCalulator,
  dayFormater,
  amountCalculator,
} from "../../Requests/MyRequests";

const Items = (props) => {
  const { items, setProducts } = props;

  if (!props.lent) {
    const dataArray = Array.isArray(items)
      ? items.map((item) => (
          <Item
            key={item.products_transactions_id}
            email={item.owner_email}
            phone={item.owner_phone}
            ownerName={`${item.owner_first_name} ${item.owner_last_name}`}
            name={item.name}
            amount={amountCalculator(
              item.start_time,
              item.end_time,
              item.price_per_day_cents
            )}
            returnDate={dayFormater(item.end_time)}
            setProducts={setProducts}
            item={item}
            items={items}
          ></Item>
        ))
      : null;

    return <div>{dataArray}</div>;
  } else {
    const dataArray = Array.isArray(items)
      ? items.map((item) => (
          <Item
            key={item.products_transactions_id}
            email={item.borrower_email}
            phone={item.borrower_phone}
            borrowerName={`${item.borrower_first_name} ${item.borrower_last_name}`}
            name={item.name}
            returnDate={dayFormater(item.end_time)}
            startDate={dayFormater(item.start_time)}
            setProducts={setProducts}
            item={item}
            items={items}
            lent={props.lent}
          ></Item>
        ))
      : null;

    return <div>{dataArray}</div>;
  }
};

export default Items;
