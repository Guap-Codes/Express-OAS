function mockDatabase() {
  const dataStore = [];

  function userExists(id) {
    return dataStore.findIndex((value) => value.id === id) !== -1;
  }

  function addUser(data) {
    if (userExists(data.id)) {
      // user already exists, let's throw an error
      throw new Error("User already exists.");
    }
    dataStore.push(data);
  }

  function updateUser(id, data) {
    if (!userExists(id)) {
      // user does not exist, let's throw an error
      throw new Error(`No user with ID ${id} was found`);
    }
    const index = dataStore.findIndex((value) => value.id === id);
    const updatedUser = {
      ...dataStore[index],
      ...data,
      id,
    };
    dataStore.splice(index, 1, updatedUser);
    return updatedUser;
  }

  function deleteUser(id) {
    if (!userExists(id)) {
      // user does not exist, let's throw an error
      throw new Error(`No user with ID ${id} was found`);
    }
    dataStore.splice(
      dataStore.findIndex((value) => value.id === id),
      1
    );
  }

  function getAll() {
    return dataStore;
  }

  function getOne(id) {
    if (!userExists(id)) {
      // user does not exist, let's throw an error
      throw new Error(`No user with ID ${id} was found`);
    }
    return dataStore.find((value) => value.id === id);
  }

  return {
    addUser,
    updateUser,
    deleteUser,
    getAll,
    getOne,
  };
}

const mockDatabaseInstance = mockDatabase();

export default mockDatabaseInstance;
