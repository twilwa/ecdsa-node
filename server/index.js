const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "044fee95e8c6ea6f42799baa63f1e4dbcddea8edd72ed0bfba8323a4454aa3841db1e3cb47a8f5cb3ec4ba35695df52083f30a5071b6fa556bbba560088d486e88": 100,
  "0479f9800cbe95f1d99825be8d34e46fe6da72b190efd14125d9bac3d0b6a92c11a8c31ae9d3d4d1aba4c9f4540e532913f11f8cbd4e51b1918883507a387e41f1": 50,
  "04f58b5f5328cc2ebba8acb3f3ad98064cf0dabba8d48547949a3917723bdb258c6392523d67d4ea40c52e39f05c0641fb8c77a826cc85044f98531a7149ea53d5": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  // that will be the sender, do not allow the client to set the sender

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
