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
