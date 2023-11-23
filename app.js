const express = require("express");
const idempotency = require("express-idempotency");

const app = express();
const port = process.env.PORT || 3001;

// Register idempotency middleware
app.use(idempotency.idempotency());

app.post("/things", (req, res) => {
  // Check if there was a hit!
  const idempotencyService = idempotency.getSharedIdempotencyService();
  if (idempotencyService.isHit(req)) {
    return;
  }

  res.json({
    message: `New random number: ${Math.random() * 100}`,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
