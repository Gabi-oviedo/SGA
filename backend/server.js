const express = require("express");
const app = express();
app.use(express.json());
const alumnosRoutes = require("./routes/alumno.routes");
app.use("/alumnos", alumnosRoutes);

//creo un middleware
app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
