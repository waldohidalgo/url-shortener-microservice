import express from "express";
import path from "path";
import dns from "dns";
import URLModel from "../models/url.js";

const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.resolve("api", "views", "index.html"));
});

router.post("/api/shorturl", function (req, res) {
  const { url: urlInput } = req.body;
  try {
    const url = new URL(urlInput);
    dns.lookup(url.hostname, async (err, address, family) => {
      if (err) {
        console.log(err);
        res.json({ error: "Invalid URL" });
        return;
      }

      try {
        const cantidadElementos = await URLModel.countDocuments({});
        const urlFinded = await URLModel.findOne({ originalUrl: url.origin });

        if (urlFinded) {
          res.json({ original_url: url.origin, short_url: urlFinded.shortUrl });
        } else {
          const newURL = new URLModel({
            originalUrl: url.origin,
            shortUrl: cantidadElementos + 1,
            fecha: new Date(),
          });

          await newURL.save();
          res.json({
            original_url: url.origin,
            short_url: cantidadElementos + 1,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
      }
    });
  } catch (error) {
    res.json({ error: "Invalid URL" });
  }
});
router.get("/api/shorturl/:shortUrl", async function (req, res) {
  const { shortUrl } = req.params;
  try {
    const urlFinded = await URLModel.findOne({ shortUrl: shortUrl });
    if (urlFinded) {
      res.redirect(urlFinded.originalUrl);
    } else {
      res.json({ error: "No short URL found for the given input" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;
