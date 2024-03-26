import express from "express";

import {
  corsPermissionsIsNotRequired,
  corsPermissionsIsRequired,
} from "../middlewares/corsPermissions";
import { EmailData, sendEmail } from "../controllers/sendMe";

export const router = express.Router();

router.post("/",corsPermissionsIsNotRequired, (req, res) => {
  try {
    const emailDataOrigin = req.body as EmailData;

    console.log(req.body);

    sendEmail(emailDataOrigin)
      .then((resp) => {
        if (resp.error !== null) throw resp.error;
        res.status(200).send("EMAIL-SENT!");
      })
      .catch((e) => {
        res.sendStatus(500);
        console.log(e, 24);
      });
  } catch (e) {
    if (e instanceof Error) return res.status(400).send(e.message);
    res.status(500).send("Internal Server Error");
    console.log(e, 29);
  }
});

export default router;
