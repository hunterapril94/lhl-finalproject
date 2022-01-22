const { query } = require("express");

module.exports = (db) => {
  // USER QUERIES
  const getUserByEmail = function (email) {
    return db
      .query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getUserById = function (id) {
    return db
      .query(
        `
    SELECT * FROM users WHERE id = $1;`,
        [id]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const addUser = function (user) {
    const values = [
      user.first_name,
      user.last_name,
      user.address,
      user.neighborhood,
      user.borrower,
      user.lender,
      user.email,
      user.cash_balance_cents,
      user.phone,
      user.password,
    ];
    // console.log("here");
    return db
      .query(
        `INSERT INTO users (first_name, last_name, address, neighborhood, 
          borrower, lender, email, cash_balance_cents, phone, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;`,
        values
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log("error" + err);
        return null;
      });
  };

  const updateUserInfo = function (id, object) {
    const queryParams = [
      id,
      object.first_name,
      object.last_name,
      object.address,
      object.neighborhood,
      object.email,
      object.phone,
    ];
    return db
      .query(
        `
        UPDATE users
        SET first_name = $2 ,
            last_name = $3 ,
            address = $4,
            neighborhood = $5,
            email = $6,
            phone = $7
        
        WHERE id = $1
  RETURNING *;`,
        queryParams
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  //-----------------------------------------------------------------
  // Products Queries
  //-----------------------------------------------------------------

  const getAllProducts = function () {
    return db
      .query(
        ` 
    SELECT products.*, AVG(reviews.stars) AS avg_stars 
    FROM products
    JOIN reviews on products.id = product_id
    GROUP BY products.id;`
      )
      .then((result) => {
        return result.rows;
      });
  };

  const getAllProductsNotOwned = function (userId) {
    return db
      .query(
        ` 
    SELECT products.*, AVG(reviews.stars) AS avg_stars 
    FROM products
    JOIN reviews on products.id = product_id
    WHERE NOT products.user_id = $1
    GROUP BY products.id;`,
        [userId]
      )
      .then((result) => {
        return result.rows;
      });
  };

  const getProductById = function (id) {
    return db
      .query(
        ` SELECT products.*, AVG(reviews.stars) AS avg_stars 
        FROM products
        JOIN reviews on products.id = product_id
        WHERE products.id = $1
        GROUP BY products.id;`,
        [id]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getProductsByCategory = function (category) {
    return db
      .query(
        `
        SELECT products.*, AVG(reviews.stars) AS avg_stars 
        FROM products
        JOIN reviews on products.id = product_id  
        WHERE products.category = $1
        GROUP BY products.id;`,
        [category]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getProductsByUserId = function (userId) {
    return db
      .query(
        `SELECT (products.*), AVG(reviews.stars) AS avg_stars FROM products 
        JOIN users ON products.user_id = users.id
        JOIN reviews ON products.id = product_id
        WHERE users.id = $1
        GROUP BY products.id, users.id, reviews.id;`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getBorrowedProductsByUserId = function (userId) {
    return db
      .query(
        `SELECT products_transactions.start_time AS start_time, products_transactions.end_time AS end_time, products.name,
        users.first_name AS owner_first_name,
        users.last_name AS owner_last_name,products.price_per_day_cents, 
        users.email AS owner_email, users.phone AS owner_phone
        FROM transactions 
        JOIN products_transactions ON transactions.id = products_transactions.transaction_id
        JOIN products ON products_transactions.product_id = products.id
        JOIN users ON products.user_id = users.id
        WHERE transactions.user_id = $1
        GROUP BY products.name, start_time, end_time, users.first_name, users.last_name, transactions.user_id, products.price_per_day_cents, owner_email, owner_phone;`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getLentProducstByUserId = function (userId) {
    return db
      .query(
        `SELECT products_transactions.start_time AS start_time, products_transactions.end_time AS end_time, products.name,
        users.first_name AS borrower_first_name, users.last_name AS borrower_last_name, users.email AS borrower_email, users.phone AS borrower_phone, products.image, products_transactions AS products_transactions_id 
        
        FROM transactions 
        JOIN users ON transactions.user_id = users.id
        JOIN products_transactions ON transactions.id = products_transactions.transaction_id
        JOIN products ON products_transactions.product_id = products.id
        
        WHERE products.user_id = $1`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getProductsBySearchTerm = function (searchTerm) {
    const queryParam = `%${searchTerm}%`;
    return db
      .query(
        `SELECT products.* , AVG(reviews.stars) AS stars
    FROM products
    JOIN reviews ON reviews.product_id = products.id
    WHERE LOWER(products.name) LIKE LOWER($1)
    OR LOWER(products.category) LIKE LOWER($1)
    GROUP BY products.id;`,
        [queryParam]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const updateProductInfo = function (userId, object) {
    const queryParams = [
      userId,
      object.category,
      object.name,
      object.price_per_day_cents,
      object.description,
      object.deposit_amount_cents,
      object.image,
      object.id,
    ];
    return db
      .query(
        `
  UPDATE products
    SET category = $2 ,
    name = $3 ,
    price_per_day_cents = $4,
    description = $5,
    deposit_amount_cents = $6,
    image = $7
  WHERE id = $8
  AND user_id = $1
  RETURNING *;`,
        queryParams
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  //  REQUEST QUERIES HERE

  // getBorrowRequestsByUserId --- requesting to borrow something

  const getPendingLendRequestsByUserId = function (userId) {
    return db

      .query(
        `SELECT products_transactions.id AS products_transactions_id ,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, users.email AS requester_email,
        users.phone AS requester_phone, status, deposit_amount_cents

        FROM transactions
        JOIN users on transactions.user_id = users.id
        JOIN products_transactions ON transactions.id = products_transactions.transaction_id

        JOIN products ON products_transactions.product_id = products.id

        WHERE products.user_id = $1
        AND products_transactions.status = 'pending'`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  // getPendingLendRequestsByUserId -- incomming request from someone

  const getBorrowRequestsByUserId = function (userId) {
    return db

      .query(
        `SELECT products_transactions.id AS products_transactions_id,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, users.email AS owner_email, users.phone AS owner_phone, status, deposit_amount_cents

        FROM products_transactions
        JOIN transactions ON transaction_id = transactions.id
        JOIN products ON products_transactions.product_id = products.id
        JOIN users ON products.user_id = users.id
        
        WHERE transactions.user_id = $1
        AND products_transactions.status = 'pending';`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getTransactionHistoryByUserID = function (userId) {
    return db
      .query(
        `SELECT products_transactions.id AS products_transactions_id,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, users.email AS owner_email, users.phone AS owner_phone, status,deposit_amount_cents
      
      FROM products_transactions
      JOIN transactions ON transaction_id = transactions.id
      JOIN products ON products_transactions.product_id = products.id
      JOIN users ON products.user_id = users.id
      
      WHERE transactions.user_id = $1
      AND products_transactions.status != 'pending' 
      OR products_transactions.status != 'approved'
       ;`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  // getTransactionHistoryByUserID(1).then((res) => console.log(res));

  // REVIEW QUERIES
  const getStarsByProductId = function (id) {
    return db
      .query(`SELECT AVG(stars) FROM reviews WHERE product_id= $1;`, [id])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // TRANSACTION QUERIES

  const createTransaction = function (object) {
    const queryParams = [object.user_id, object.subtotal, object.deposit_total];
    return db
      .query(
        `INSERT INTO transactions
    (user_id, subtotal, deposit_total)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
        queryParams
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // Hellper function to see if the transaction exists
  const getTransactionByid = function (id) {
    return db
      .query(
        `SELECT * 
        FROM transactions
        WHERE id = $1;
  `,
        [id]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // still breaks if the transactin_id does not exist
  const createPendingProductTransaction = function (productTransaction) {
    let n = 1;
    let queryString = `INSERT INTO products_transactions
              (transaction_id, product_id, start_time, end_time, status)
                VALUES `;
    const queryParams = [];
    productTransaction.forEach((element) => {
      queryParams.push(
        element.transaction_id,
        element.product_id,
        element.start_time,
        element.end_time
      );
      queryString += ` ($${n++}, $${n++}, $${n++}, $${n++}, 'pending'),`;
    });
    queryString = queryString.slice(0, -1);
    if (getTransactionByid(queryParams[0])) {
      return db
        .query(`${queryString}RETURNING *;`, queryParams)
        .then((result) => {
          if (result) {
            return result.rows[0];
          } else {
            return null;
          }
        });
    } else {
      return null;
    }
  };

  const updateProductTransactionStatus = function (id, status) {
    return db
      .query(
        `UPDATE products_transactions
         SET status = $2 
         WHERE id = $1
         RETURNING *;
         `,
        [id, status]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // to subtract just add a third param

  const updateBalanceByEmail = function (email, amount, subtract) {
    return db
      .query(
        `UPDATE users
         SET  cash_balance_cents = cash_balance_cents ${
           subtract ? "-" : "+"
         } $2 
         WHERE email = $1
         RETURNING *;
         `,
        [email, Number(amount)]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };
  const updateBalance = function (id, amount, subtract) {
    return db
      .query(
        `UPDATE users
         SET  cash_balance_cents = cash_balance_cents ${
           subtract ? "-" : "+"
         } $2 
         WHERE id = $1
         RETURNING *;
         `,
        [Number(id), Number(amount)]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getBalanceByUserID = function (id) {
    return db
      .query(
        `SELECT cash_balance_cents  FROM users
    WHERE id = $1;`,
        [Number(id)]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // const addToBalance = function (id, amount) {
  //   return db
  //     .query(
  //       `UPDATE users
  //        SET  cash_balance_cents = cash_balance_cents  + $2
  //        WHERE id = $1
  //        RETURNING *;
  //        `,
  //       [id, Number(amount)]
  //     )
  //     .then((result) => {
  //       if (result) {
  //         return result.rows[0];
  //       } else {
  //         return null;
  //       }
  //     });
  // };

  // const subtractFromBalance = function (id, amount) {
  //   return db
  //     .query(
  //       `UPDATE users
  //        SET  cash_balance_cents = cash_balance_cents - $2
  //        WHERE id = $1;
  //        `,
  //       [id, Number(amount)]
  //     )
  //     .then((result) => {
  //       if (result) {
  //         return result.rows[0];
  //       } else {
  //         return null;
  //       }
  //     });
  // };

  return {
    getUserByEmail,
    updateUserInfo,
    addUser,
    getUserById,
    updateBalanceByEmail,
    // products
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getProductsByUserId,
    getBorrowedProductsByUserId,
    getLentProducstByUserId,
    getLentProducstByUserId,
    getProductsBySearchTerm,
    updateProductInfo,
    getStarsByProductId,
    // requests
    getPendingLendRequestsByUserId,
    getBorrowRequestsByUserId,
    getAllProductsNotOwned,
    // transactions
    createTransaction,
    createPendingProductTransaction,
    updateProductTransactionStatus,
    updateBalance,
    getBalanceByUserID,
    getTransactionHistoryByUserID,
    // addToBalance,
    // subtractFromBalance,
  };
};

// three table join, returns pin information owned by a specific user
// const getOwnedPins = function (id) {
//   return db
//     .query(
//       `
//   SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
//   FROM pins
//   JOIN tags ON pins.tag_id = tags.id
//   LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
//   WHERE owner_id = $1
//   GROUP BY pins.id, tags.name, tags.thumbnail_url
//   ORDER BY pins.created_at
//   `,
//       [id]
//     )
//     .then((result) => result.rows)
//     .catch((err) => console.log(err));
// };

// four table join, returns returns an array of objecsts containing all information of favorited pins by a specific user
// object contains pin information, tag name and default thumbnail url and the average rating of said pin even if null
// const getFavPins = function (id) {
//   return db
//     .query(
//       `
//   SELECT pins.*, tags.name, tags.thumbnail_url, AVG(rating.rating) AS average_rating
//   FROM favorite_pins AS fav_pins
//   JOIN pins on pins.id = fav_pins.pin_id
//   LEFT JOIN pin_ratings AS rating ON rating.pin_id = pins.id
//   JOIN tags ON tags.id = pins.tag_id
//   WHERE fav_pins.user_id = $1
//   GROUP BY pins.id, tags.name, tags.thumbnail_url
//   ORDER BY pins.created_at DESC;
//   `,
//       [id]
//     )
//     .then((result) => result.rows)
//     .catch((err) => console.log(err));
// };

// three table join, returns all pins with relevant information orders by created_at
// const getAllPins = function () {
//   return db
//     .query(
//       `
//   SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
//   FROM pins
//   LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
//   JOIN tags ON pins.tag_id = tags.id
//   GROUP BY pins.id, tags.name, tags.thumbnail_url
//   ORDER BY created_at DESC;
//   `
//     )
//     .then((result) => result.rows)
//     .catch((err) => console.log(err));
// };

// three table join, search function that returns all pins information and average rating if a word or phrase matches
// stored information in the title, tag, description or content
// due to LOWER() syntax it is case insensitive
// const searchPins = function (pin) {
//   const queryParam = `%${pin}%`;
//   let queryString = `
//   SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
//   FROM pins
//   LEFT JOIN pin_ratings on pins.id = pin_ratings.pin_id
//   JOIN tags ON pins.tag_id = tags.id
//   WHERE LOWER(pins.title) LIKE LOWER($1)
//   OR LOWER(tags.name) LIKE LOWER($1)
//   OR LOWER(pins.description) LIKE LOWER($1)
//   OR LOWER(pins.content) LIKE LOWER($1)
//   GROUP BY pins.id , tags.name, tags.thumbnail_url
//   ORDER BY pins.created_at DESC
//   `;
//   return db.query(queryString, [queryParam]).then((result) => result.rows);
// };

// three table join returns all pins information with their average rating even if null
// const getPinById = function (id) {
//   return db
//     .query(
//       `
//   SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
//   FROM pins
//   LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
//   JOIN tags ON pins.tag_id = tags.id
//   WHERE pins.id = $1
//   GROUP BY pins.id, tags.name, tags.thumbnail_url;
//   `,
//       [id]
//     )
//     .then((result) => result.rows[0])
//     .catch((err) => console.log(err));
// };

// const getPinCommentsById = function (id) {
//   return db
//     .query(
//       `
//   SELECT users.first_name, users.last_name, comments.*
//   FROM comments
//   JOIN users ON comments.user_id = users.id
//   WHERE pin_id = $1
//   ORDER BY created_at;
//   `,
//       [id]
//     )
//     .then((result) => result.rows)
//     .catch((err) => console.log(err));
// };

// two table join returns the comments table and user's full name when given a comment id
// const getCommentById = function (commentId) {
//   return db
//     .query(
//       `
//   SELECT users.first_name, users.last_name, comments.*
//   FROM comments
//   JOIN users ON comments.user_id = users.id
//   WHERE comments.id = $1
//   ORDER BY created_at;
//   `,
//       [commentId]
//     )
//     .then((result) => result.rows[0])
//     .catch((err) => console.log(err));
// };

// ADD

// id | first_name | last_name |     address      |
// neighborhood  | borrower | lender |            email             |
// cash_balance_cents |   phone    | password

// // everything is mandatory with exception to url which can be added if the key value pair exists in the object
// const addPin = function (id, object) {
//   let queryString = `INSERT INTO pins (owner_id, title, description, content, tag_id, created_at`;
//   const queryParams = [
//     id,
//     object.title,
//     object.description,
//     object.content,
//     object.tag,
//   ];
//   if (object.url) {
//     queryString += ", url)";
//     queryParams.push(object.url);
//   } else {
//     queryString += ")";
//   }
//   queryString += ` VALUES ($1, $2, $3, $4, $5, now()`;

//   if (object.url) {
//     queryString += `, $6)`;
//   } else {
//     queryString += `)`;
//   }
//   queryString += ` RETURNING *;`;

//   return db
//     .query(queryString, queryParams)
//     .then((result) => result.rows[0])
//     .catch((err) => console.log(err));
// };

// const addRating = function (user_id, pin_id, rating) {
//   return db
//     .query(
//       `
//   INSERT INTO pin_ratings (user_id, pin_id, rating)
//   VALUES ($1, $2, $3)
//   RETURNING *;
//   `,
//       [user_id, pin_id, rating]
//     )
//     .then((result) => result.rows[0])
//     .catch((err) => console.log(err));
// };

// const addComment = function (object) {
//   return db
//     .query(
//       `
//   INSERT INTO comments (user_id, pin_id, comment, created_at)
//   VALUES ($1, $2, $3, now())
//   RETURNING *;
//   `,
//       [object.user_id, object.pin_id, object.comment]
//     )
//     .then((result) => result.rows[0])
//     .catch((err) => console.log(err));
// };

// const addFavorite = function (id, pinId) {
//   return db
//     .query(
//       `
//   INSERT INTO favorite_pins (user_id, pin_id)
//   SELECT $1, $2
//   WHERE NOT EXISTS (
//       SELECT user_id, pin_id
//       FROM favorite_pins
//       WHERE user_id = $1 AND pin_id = $2
//   )
//   RETURNING *;
//   `,
//       [id, pinId]
//     )
//     .then((result) => result.rows[0])
//     .catch((err) => console.log(err));
// };

// // OLD FUNCTIONALITY
// // INSERT INTO favorite_pins (user_id, pin_id)
// // VALUES ($1, $2)
// // RETURNING *;

// // EDIT
// // can edit one thing or everything, if statements check if the key exists will append the proper syntax
// // if it is there is already and existing key a , is added in between columns being updated if there are multiple
// // returns the new values in an object
// const updateUserInfo = function (user_id, newInfo) {
//   const queryParams = [];
//   let queryString = `UPDATE users SET`;

//   if (newInfo.first_name) {
//     queryParams.push(`${newInfo.first_name}`);
//     queryString += ` first_name = $${queryParams.length}`;
//   }

//   if (newInfo.last_name) {
//     queryString += `${
//       queryParams.length ? ", last_name = " : " last_name = "
//     }`;
//     queryParams.push(`${newInfo.last_name}`);
//     queryString += `$${queryParams.length}`;
//   }

//   if (newInfo.email) {
//     queryString += `${queryParams.length ? ", email = " : " email = "}`;
//     queryParams.push(`${newInfo.email}`);
//     queryString += `$${queryParams.length}`;
//   }

//   if (newInfo.password) {
//     queryString += `${queryParams.length ? ", password = " : " password = "}`;
//     queryParams.push(`${newInfo.password}`);
//     queryString += `$${queryParams.length}`;
//   }

//   queryParams.push(user_id);
//   queryString += ` WHERE id = $${queryParams.length} RETURNING *`;

//   return db.query(queryString, queryParams).then((result) => result.rows[0]);
// };

// // REMOVE
// // returns removed pin_id and id
// const removeFavorite = function (user_id, pin_id) {
//   return db
//     .query(
//       `
//   DELETE FROM favorite_pins
//   WHERE user_id = $1
//   AND pin_id = $2
//   RETURNING *
//   `,
//       [user_id, pin_id]
//     )
//     .then((result) => result.rows[0])
//     .catch((err) => {
//       console.log(err);
//     });
// };

// };

// {
//   user_id: 1,
//   subtotal: 8000
//   desposit_total:10000000
//   products_transactions: [{product_id: 1 , start_time: 'February 24, 2022' , end_time: 'February 25, 2022'}, {product_id: 2 , start_time: 'February 26, 2022' , end_time: 'February 28, 2022'}]
// }
