import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "TEST-630987901883187-061015-3289cdf5810fde7746502eb570d723d3-16980830",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server");
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "https://es.wikipedia.org/wiki/Akira_Kurosawa",
                failure: "https://es.wikipedia.org/wiki/Akira_Kurosawa",
                pending: "https://es.wikipedia.org/wiki/Akira_Kurosawa",
            },
            auto_return: "approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia",
        });
    }
});

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});