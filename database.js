/**
 * @fileoverview Mock database implementation for user management
 * @module database
 */

/**
 * Creates a mock database instance with in-memory storage
 * Implements CRUD operations for user management
 * 
 * @function mockDatabase
 * @returns {Object} Database operations object
 */
function mockDatabase() {
  /**
   * In-memory storage for user records
   * @type {Array<import('./models/user').User>}
   * @private
   */
  const dataStore = [
    {
      id: "1",
      email: "admin@example.com",
      // This is "admin123" hashed with bcrypt
      password: "$2b$10$y5G719kXQ3i9YHKrW3T7SOozdbKhIocihqozq3NFETyaR.JRTPLyK",
      name: "Admin User",
      role: "admin",
      refreshToken: null
    },
    {
      id: "2",
      email: "user@example.com",
      // This is "user123" hashed with bcrypt
      password: "$2b$10$SxjPnoFNQ6.VCkoHLpb5N.CLbsSsOl23sdiPYeMEIy1z02296oN9O",
      name: "Regular User",
      role: "user",
      refreshToken: null
    }
  ];

  /**
   * Check if a user exists by ID
   * 
   * @function userExists
   * @param {string} id - User ID to check
   * @returns {boolean} True if user exists, false otherwise
   * @private
   */
  function userExists(id) {
    return dataStore.findIndex((value) => value.id === id) !== -1;
  }

  /**
   * Add a new user to the database
   * 
   * @function addUser
   * @param {import('./models/user').User} data - User data to add
   * @throws {Error} If user with same ID already exists
   * 
   * @example
   * addUser({
   *   id: "123",
   *   name: "John Doe",
   *   email: "john@example.com"
   * });
   */
  function addUser(data) {
    if (userExists(data.id)) {
      throw new Error("User already exists.");
    }
    dataStore.push(data);
  }

  /**
   * Update an existing user
   * 
   * @function updateUser
   * @param {string} id - ID of user to update
   * @param {Partial<import('./models/user').User>} data - User data to update
   * @returns {import('./models/user').User} Updated user object
   * @throws {Error} If user is not found
   * 
   * @example
   * const updated = updateUser("123", { name: "John Smith" });
   */
  function updateUser(id, data) {
    if (!userExists(id)) {
      throw new Error(`No user with ID ${id} was found`);
    }
    const index = dataStore.findIndex((value) => value.id === id);
    const updatedUser = Object.assign({}, dataStore[index], data, { id });
    dataStore.splice(index, 1, updatedUser);
    return updatedUser;
  }

  /**
   * Delete a user from the database
   * 
   * @function deleteUser
   * @param {string} id - ID of user to delete
   * @throws {Error} If user is not found
   * 
   * @example
   * deleteUser("123");
   */
  function deleteUser(id) {
    if (!userExists(id)) {
      throw new Error(`No user with ID ${id} was found`);
    }
    dataStore.splice(
      dataStore.findIndex((value) => value.id === id),
      1
    );
  }

  /**
   * Retrieve all users from the database
   * 
   * @function getAll
   * @returns {Array<import('./models/user').User>} Array of all users
   * 
   * @example
   * const allUsers = getAll();
   * console.log(allUsers); // [{id: "1", name: "John"}, ...]
   */
  function getAll() {
    return dataStore;
  }

  /**
   * Retrieve a single user by ID
   * 
   * @function getOne
   * @param {string} id - ID of user to retrieve
   * @returns {import('./models/user').User} User object
   * @throws {Error} If user is not found
   * 
   * @example
   * const user = getOne("123");
   * console.log(user); // {id: "123", name: "John", ...}
   */
  function getOne(id) {
    if (!userExists(id)) {
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

/**
 * Singleton instance of the mock database
 * @type {Object}
 */
const mockDatabaseInstance = mockDatabase();

export default mockDatabaseInstance;
