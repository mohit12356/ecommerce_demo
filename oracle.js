const express = require("express");
const oracledb = require("oracledb");
const app = express();
app.use(express.json());

const dbConfig = {
  user: "system",
  password: "mohit",
//   connectString: "localhost/orclpdb1", 
};

app.post("/api/checkout", async (req, res) => {
  const { name, address, city, state, postalCode, paymentMethod, totalAmount } =
    req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const query = `
      INSERT INTO checkout_details (full_name, address, city, state, postal_code, payment_method, total_amount)
      VALUES (:name, :address, :city, :state, :postalCode, :paymentMethod, :totalAmount)
    `;

    await connection.execute(
      query,
      {
        name,
        address,
        city,
        state,
        postalCode,
        paymentMethod,
        totalAmount,
      },
      { autoCommit: true }
    );

    await connection.close();
    res.status(200).send({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send({ error: "Failed to process order." });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
