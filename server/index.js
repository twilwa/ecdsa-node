const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04bcf844e7d02874d258578548ac33bd21f57f52959408ad88c44ad48e82554a4f4537c0974e34d3736dd28a9d9b6cbb67f7776c117fc5d34b926f6298e8b4e13b": 100,
  "04edbe047f7e8c4282a452bf09d9c2094d8c6f5aab35a8b31f8f3f3bc0c55c26d3371debe93fed031b161a89ba8d9bf7a51e2ad940adac82e751b60ea834053924": 50,
  "04ac831079f28a05e6dc72356811d9742f44c481e27bc2c22401cd49398266154a7a427fa672a5596de01c194012535908874597b8152c938830ffda2125590ef5": 75,
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
