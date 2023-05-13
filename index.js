
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://phbento:tVhRCnjbs8L5Rt5E@cluster0.htbxygc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db('Pizzaria');

async function insere1elemento() {
    const pizzas = db.collection("pizzas");
    const pizza = { nome: "4 Queijos", qtdPedacos: "8" };
    const result = await pizzas.insertOne(pizza);
    console.log(`A pizza inserida foi a ${result.insertedId}`);
}

async function insereNelemento() {
    const pizzas = db.collection("pizzas");
    const documents = [{ nome: "4 Queijos", qtdPedacos: "8" },
    { nome: "Mussarela", qtdPedacos: "8" },
    { nome: "Pepperoni", qtdPedacos: "8" },
    { nome: "Frango Catupiri", qtdPedacos: "8" },
    { nome: "Prestigio", qtdPedacos: "8"}];
    const result = await pizzas.insertMany(documents);
    let ids = result.insertedIds;
    for(let id of Object.values(ids)){
        console.log(`A pizza inserida foi a: ${id}`)
    }
}

// insere1elemento();
// insereNelemento();

async function selecionarValores(){
    const pizzas = await db.collection("pizzas").find();
    for await(let pizza of pizzas){
        console.log(pizza);
    }
}
// selecionarValores()

async function editarValor(){
    const pizzas = db.collection("pizzas");
    const filtro = {nome:"Prestigio"}
    const update = { "$set" : {qtdPedacos: 12}}
    await pizzas.updateOne(filtro, update)
    selecionarValores();
}

// editarValor();

async function deleteValor(){
    const pizzas = db.collection("pizzas")
    const pizza = await pizzas.findOne({nome: "Prestigio" })
    pizzas.deleteOne(pizza)
    selecionarValores;
}

deleteValor()
