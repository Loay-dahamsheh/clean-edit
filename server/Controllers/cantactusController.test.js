const request = require('supertest');
const app = require('../server');
const contactusModel = require('../Models/contactusModel');



jest.mock('../Models/contactusModel', () => ({
    contactus: jest.fn(),
  }));




  describe('POST /contactus', () => {
    it('should save contact us form data successfully', async () => {
      // Mock the contactusModel.contactus function
      contactusModel.contactus.mockResolvedValue();
  
      const response = await request(app)
        .post('/contactus')
        .send({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message',
        });
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Contact us form data saved successfully!' });
  
      // Check if contactusModel.contactus was called with the correct arguments
      expect(contactusModel.contactus).toHaveBeenCalledWith(
        1,
        'John Doe',
        'john@example.com',
        'Test message'
      );
    });
  
    it('should handle errors and return 401 for contactus controller error', async () => {
      // Mock the contactusModel.contactus function to simulate an error
      contactusModel.contactus.mockRejectedValue(new Error('Simulated error'));
  
      const response = await request(app)
        .post('/contactus')
        .send({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message',
        });
  
      expect(response.status).toBe(401);
      // Add more assertions based on your expected behavior for error handling
    });
  });
