import { Router, Request, Response } from "express";
import send_command from "../send_command";

const router = Router();

router.get("/led/on", async (req: Request, res: Response) => {
    const result = await send_command("test_led", "green_led on");

    if (!result) return res.status(200).send("error");

    res.status(200).send("led is on");
});

router.get("/led/off", async (req: Request, res: Response) => {
    const result = await send_command("test_led", "green_led off");
    

    if (!result) return res.status(200).send("error");

    res.status(200).send("led is off");
});

export default router;
