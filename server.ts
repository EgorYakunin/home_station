import express from "express";
import electric_curtain from './routers/electric_curtain';
import test_led from './routers/test_led';

const port = process.env.PORT || 3004;
const app = express();

app.use(electric_curtain);
app.use(test_led);

app.listen(port, () => console.log("server is up on port " + port));
