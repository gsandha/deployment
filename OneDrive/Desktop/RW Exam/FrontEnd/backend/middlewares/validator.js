const validator = (req, res, next) => {
  const method = req.method;
  const { name, email, password } = req.body;
  if (method === "POST" || method === "PATCH") {
    if (
      typeof name === "string" &&
      typeof email === "string" &&
      typeof password === "string" &&
      typeof department === "string"
    ) {
      next();
    } else {
      res.status(404).send({ msg: "Wrong Credential" });
    }
  } else {
    next();
  }
};

export { validator };
