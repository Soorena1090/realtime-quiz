let clients = [];

const longPool = (req, res) => {
  clients.push(res);

  req.setTimeout(20000, () => {
    if (!req.writableEnded) {
      res, json({ meesage: "mo new data" });
      clients = clients.filter((c) => c !== res);
    }
  });
};

const update = (req, res) => {
  const { message } = req.body;

  clients.forEach((clientRes) => {
    clientRes.json({ message });
  });

  clients = [];
  res.json({ status: "sent to all" });
};

module.exports = {
  longPool,
  update,
};
