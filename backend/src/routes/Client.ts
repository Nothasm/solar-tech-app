import { Router } from "express";
import { Client, Address, IClient } from "../models/Client";
import { default as wrapper} from "express-async-handler";
import { onlyNumbers } from "../helpers";
import { sendMailNewClient } from "../helpers/email";

const router = Router();

router.post("/", wrapper(async ({ body }, res) => {
    const clientBody = validateClientBody(body);
    const client = await (new Client(clientBody)).save();
    sendMailNewClient(client);
    res.status(201).send(client);
}));

router.get("/", wrapper(async (req, res) => {
    const clients = await Client.find({});
    res.send(clients);
}));

router.get("/:id", wrapper(async ({ params }, res) => {
    const client = await Client.findById(params.id);
    if (!client) return res.status(404).send("Client not found");
    res.send(client);
}));

router.put("/:id", wrapper(async ({ body, params }, res) => {

    console.log(body);
    console.log(params);
    const clientBody = validateClientBody(body);
    const client = await Client.findById(params.id);
    if (!client) return res.status(404).send("Client not found");
    await client.update(clientBody);
    res.sendStatus(204);
}));

router.delete("/:id", wrapper(async ({ params }, res) => {
    const client = await Client.findById(params.id);
    if (!client) return res.status(404).send("Client not found");
    await client.remove();
    res.sendStatus(204);
}));

export { router as ClientRouter };

function validateClientBody(body: IClient) {
    const hasAddress = (body.addresses as Address[]).length >= 1;
    if (!hasAddress) throw new Error("There should be at least one address");
    const clientBody = {
        name: body.name,
        cpf: onlyNumbers(body.cpf),
        phoneNumber: onlyNumbers(body.phoneNumber),
        email: body.email,
        addresses: body.addresses.map(add => ({
            ...add,
            zipCode: onlyNumbers(add.zipCode)
        }))
    };
    return clientBody;
}
