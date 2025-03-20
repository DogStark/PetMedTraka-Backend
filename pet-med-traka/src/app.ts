import express from 'express';
import { Db } from 'mongodb';
import { MongoUserRepository } from './repositories/MongoUserRepository';
import { UserService } from './services/UserService';

export const createApp = (db: Db) => {
  const app = express();
  const userRepository = new MongoUserRepository(db);
  const userService = new UserService(userRepository);

  // Middleware to parse JSON
  app.use(express.json());

  // Create a new user
  app.post('/users', async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

  // Get a user by ID
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  // Other routes...

  return app;
};