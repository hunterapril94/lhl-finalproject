import Item from "./Item";
import {
  dayCalulator,
  dayFormater,
  amountCalculator,
} from "../../Requests/MyRequests";

const Items = (props) => {
  const { items } = props;
  const dataArray = Array.isArray(items)
    ? items.map((item) => (
        <Item
          key={item.productId}
          email={item.owner_email}
          ownerName={`${item.owner_first_name} ${item.owner_last_name}`}
          name={item.name}
          amount={amountCalculator(
            item.start_time,
            item.end_time,
            item.price_per_day_cents
          )}
          returnDate={dayFormater(item.end_time)}
          return={props.return}
        ></Item>
      ))
    : null;
  return <div>{dataArray}</div>;
};

export default Items;
