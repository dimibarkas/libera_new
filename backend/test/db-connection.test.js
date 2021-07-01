import UsersDAO from "../src/dao/UsersDAO.js";

describe('Connection', () => {
    beforeAll(async () => {
        await UsersDAO.injectDB(global.liberaClient)
    })

    test("Can access Libera data", async () => {
        const libera = global.liberaClient.db(process.env.LIBERA_NS)
        const collections = await libera.listCollections().toArray();
        const collectionNames = collections.map(elem => elem.name);
        expect(collectionNames).toContain("articles")
        expect(collectionNames).toContain("customers")
        expect(collectionNames).toContain("orders")
        expect(collectionNames).toContain("users")
    })
})
