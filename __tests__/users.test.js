import mockDatabaseInstance from '../database.js';

describe('User Operations', () => {
  beforeEach(() => {
    // Clear database before each test
    while(mockDatabaseInstance.getAll().length > 0) {
      const users = mockDatabaseInstance.getAll();
      users.forEach(user => {
        try {
          mockDatabaseInstance.deleteUser(user.id);
        } catch (error) {
          // Ignore deletion errors
        }
      });
    }
  });

  test('should create new user', () => {
    const newUser = {
      id: '3',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    };

    mockDatabaseInstance.addUser(newUser);
    const user = mockDatabaseInstance.getOne('3');
    expect(user).toMatchObject(newUser);
  });

  test('should update user', () => {
    const user = {
      id: '4',
      name: 'Original Name',
      email: 'original@example.com',
      role: 'user'
    };

    mockDatabaseInstance.addUser(user);
    mockDatabaseInstance.updateUser('4', { name: 'Updated Name' });
    const updatedUser = mockDatabaseInstance.getOne('4');
    expect(updatedUser.name).toBe('Updated Name');
  });

  test('should delete user', () => {
    const user = {
      id: '5',
      name: 'To Delete',
      email: 'delete@example.com',
      role: 'user'
    };

    mockDatabaseInstance.addUser(user);
    mockDatabaseInstance.deleteUser('5');
    expect(() => mockDatabaseInstance.getOne('5')).toThrow();
  });
}); 