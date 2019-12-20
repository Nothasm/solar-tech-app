import mongoose from "mongoose";
import { emailPattern } from "../helpers";

const Schema = mongoose.Schema;

enum AddressType {
    Comercial = "Comercial",
    Residential = "Residencial",
    Rural = "Rural",
    BeachHouse = "Casa de Praia"
}
export interface Address {
    street: string
    zipCode: string
    city: string
    state: string
    district: string
    number: string
    complement: string
    addressType: AddressType
}

interface IClient extends mongoose.Document {
    _id: string
    name: string
    cpf: string
    phoneNumber: string
    email: string
    addresses: [Address]
}

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        validate: {
            validator: (v: string) => v.length === 8 && /^\d+$/.test(v)
        }
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: (v: string) => /^\d+$/.test(v)
        }
    },
    complement: String,
    addressType: {
        type: String,
        enum: {
            values: Object.values(AddressType)
        },
        required: true
    }
});

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: (v: string) => (v.length >= 10 || v.length <=11) &&  /^\d+$/.test(v)
        }
    },
    email: {
        type: String,
        validate: {
            validator: (v: string) => emailPattern.test(v)
        }
    },
    addresses: [addressSchema]
});

const Client = mongoose.model<IClient>("Client", clientSchema);

export { Client, IClient}