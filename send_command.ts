import net from "net";
import { available_devices, devices } from "./available_devices";

const device_port = Number(process.env.DEVICE_PORT) || 80;

export default async function send_command(
    device: available_devices,
    message: string
): Promise<boolean> {
    const client = new net.Socket();
    // getting ip address of targeted device
    const device_ip = devices[device];

    return new Promise((res) => {
        client.connect(device_port, device_ip, () => {
            console.log(`Connected to ${device} (${device_ip}:${device_port})`);
            client.write(message);
        });

        client.on("data", data => {
            console.log("Received: " + data);
            client.destroy(); // kill client after server's response

            res(true);
        });

        client.on("close", () => {
            console.log(
                `Closed connection with ${device} (${device_ip}:${device_port})`
            );
        });

        client.on("error", () => {
            console.log("Something went wrong :(");
            res(false);
        });
    });
}
