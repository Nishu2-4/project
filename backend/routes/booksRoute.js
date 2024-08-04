import express from 'express';
import { Book } from '../models/bookmodel.js';

const router = express.Router();

// Route for saving a new book
router.post(`/`, async (request, response) => {
  try {
    const { title, author, publishyear } = request.body;

    if (!title || !author || !publishyear) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishyear',
      });
    }

    const newBook = { title, author, publishyear };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all books from database
router.get(`/`, async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one book by id
router.get(`/:_id`, async (request, response) => {
  try {
    const { _id } = request.params;

    const book = await Book.findById(_id);

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a book
router.put(`/:_id`, async (request, response) => {
  try {
    const { title, author, publishyear } = request.body;

    if (!title || !author || !publishyear) {
      return response.status(400).send({
        message: 'Send all the fields: title, author, publishyear',
      });
    }

    const { _id } = request.params;
    const book = await Book.findByIdAndUpdate(_id, request.body, { new: true });

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a book
router.delete(`/:_id`, async (request, response) => {
  try {
    const { _id } = request.params;

    const book = await Book.findByIdAndDelete(_id);

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
