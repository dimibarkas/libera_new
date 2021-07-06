import UsersDAO from "../../src/dao/UsersDAO"

const testUser = {
  name: "Dimitrios Barkas",
  username: "dimitrios",
  password: "thegreatest97",
}

describe("Usermanegement", () => {
  beforeAll(async () => {
    await UsersDAO.injectDB(global.liberaClient)
  })

  test("Can add a new user to the database", async () => {
    const actual = await UsersDAO.createAccount(testUser)
    expect(actual.insertedCount).toBe(1)

    const user = await UsersDAO.findByUsername(testUser.username)
    delete user._id
    expect(user).toEqual(testUser)
  })

  test("Can reject a registration if the username already exists", async () => {
    const actual = await UsersDAO.createAccount(testUser)
    expect(actual).toBe(null)
  })

  test("Can find an account by its username", async () => {
    const account = await UsersDAO.findByUsername("dimitrios")
    expect(account.name).toBe("Dimitrios Barkas")
  })

  test("Can delte an account by its username", async () => {
    const deletedUser = await UsersDAO.deleteAccountByUsername(
      testUser.username,
    )
    expect(deletedUser.deletedCount).toBe(1)
  })
})
