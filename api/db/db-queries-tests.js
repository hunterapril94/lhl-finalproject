//paste into server.js for now do not commit server.js to git when testing like this

//users

user = {
  first_name: "rex",
  last_name: "mason",
  address: "5044 mcrae st",
  neighborhood: "richmond",
  borrower: false,
  lender: false,
  email: "rex@rex.com",
  cash_balance_cents: 0,
  phone: "235-3434-3434",
  password: "123",
};

dbQueries
  .addUser(user)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//products

dbQueries
  .getProducyById(1)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getProductsByCategory("Tools").then((res) => {
  console.log("getProductsByCategory", res);
});

getProductsByUserId(6).then((res) => {
  console.log("getProductsByUserId", res);
});

getBorrowedProductsByUserId(1).then((res) => {
  console.log("getBorrowedProductsByUserId", res);
});

getLentProducstByUserId(1).then((res) => {
  console.log("getLentProducstByUserId", res);
});

getLentProducstByUserId(6).then((res) => {
  console.log("getLentProducstByUserId", res);
});

getProductsBySearchTerm("kitchen").then((res) => {
  console.log("getProductsBySearchTerm", res);
});

updateProductInfo(1, {
  category: "yoyo",
  name: "yo",
  price_per_day_cents: 100,
  description: "whatup!",
  deposit_amount_cents: 5000,
  image: "url",
  id: 1,
}).then((res) => {
  console.log(res);
});

getPendingLendRequestsByUserId(1).then((res) => {
  console.log("getPendingLendRequestsByUserId", res);
});

getBorrowRequestsByUserId(2).then((res) => {
  console.log("getBorrowRequestsByUserId", res);
});

getStarsByProductId(2).then((res) => {
  console.log("getStarsByProductId", res);
});

createTransaction({
  user_id: 2,
  subtotal: 600,
  deposit_total: 80000,
}).then((res) => {
  console.log("createTransaction", res);
});

getTransactionByid(2).then((res) => {
  console.log("getTransactionByid", res);
});

getTransactionHistoryByUserID(1).then((res) => console.log(res));

createPendingProductTransaction([
  {
    transaction_id: 6,
    product_id: 2,
    start_time: "January 15, 2022",
    end_time: "January 20, 2022",
  },
  {
    transaction_id: 6,
    product_id: 4,
    start_time: "January 15, 2022",
    end_time: "January 20, 2022",
  },
]).then((res) => {
  console.log("createPendingProductTransaction"), res;
});

updateProductTransactionStatus(44, "approved").then((res) => {
  console.log("updateProductTransactionStatus", res);
});

addToBalance(1, 7000);
subtractFromBalance(1, 1500);
