import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mockDatabaseInstance from '../database.js';

describe('Authentication', () => {
  let mockUser;

  beforeAll(() => {
    // Initial database cleanup
    const users = mockDatabaseInstance.getAll();
    users.forEach(user => {
      try {
        mockDatabaseInstance.deleteUser(user.id);
      } catch (error) {
        // Ignore deletion errors
      }
    });
  });

  beforeEach(() => {
    // Generate new unique ID for each test
    const testId = Date.now().toString();
    // Create new mock user for each test
    mockUser = {
      id: testId,
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin123', 10),
      name: 'Admin User',
      role: 'admin'
    };

    // Add mock user
    mockDatabaseInstance.addUser(mockUser);
  });

  afterEach(() => {
    // Cleanup after each test
    try {
      mockDatabaseInstance.deleteUser(mockUser.id);
    } catch (error) {
      // Ignore deletion errors
    }
  });

  test('should generate valid JWT token', () => {
    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email, role: mockUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
    expect(decoded.role).toBe(mockUser.role);
  });

  test('should validate correct password', async () => {
    const isValid = await bcrypt.compare('admin123', mockUser.password);
    expect(isValid).toBe(true);
  });

  test('should reject incorrect password', async () => {
    const isValid = await bcrypt.compare('wrongpassword', mockUser.password);
    expect(isValid).toBe(false);
  });
}); 