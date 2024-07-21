const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

let Schema = mongoose.Schema;

const fieldSchema = new Schema({
    order: Number,
    label: String,
    type: String,
    selection: [String],
    input: Schema.Types.Mixed
});

const formSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    fields: [fieldSchema],
    lastUpdate: Number
}, {
    collection: "form"
});

let Form;

module.exports.connect = async () => {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(process.env.MONGO_URL);

        db.on('error', err => {
            reject(err);
        });

        db.once('open', () => {
            Form = db.model("form", formSchema);
            resolve();
        });
    });
};

module.exports.getAllForm = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await Form.find().exec();
            resolve(res);
        } catch(e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports.getFormById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await Form.findById(id).exec();
            resolve(res);
        } catch(e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports.createForm = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            body.lastUpdate = new Date().getTime();
            const res = await Form.create(body);
            resolve(res);
        } catch(e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports.editFormById = (id, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const formFound = await Form.findById(id).exec();            
            if (formFound) {
                const newForm = {
                    fields: body.fields,
                    lastUpdate: new Date().getTime()
                };
                const res = await Form.updateOne({
                    _id: formFound._id
                }, {
                    $set: newForm
                })
                resolve(res);
            } else {
                reject("Form not found");
            }
        } catch(e) {
            console.log(e);
            reject(e);
        }
    });
};