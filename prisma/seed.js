const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import author and book data from external files.
const authorNames = require('../data/authors');
const bookTitles = require('../data/books');

// Define a seed function that populates the database with authors and books.
const seed = async () => {
  try {
    // Loop through each author name from the imported data.
    for (let i = 0; i < authorNames.length; i++) {
      const authorName = authorNames[i];
      // Create an author in the database with the current author's name.
      const author = await prisma.author.create({
        data: {
          name: authorName,
        },
      });

      // Create books associated with the author.
      const bookPromises = [];
      for (let j = 0; j < 3; j++) {
        // Create three books for the current author and associate them with the author.
        bookPromises.push(
          prisma.book.create({
            data: {
              title: bookTitles[i * 3 + j], // Use book titles from the imported data.
              authorId: author.id, // Associate the book with the current author.
            },
          })
        );
      }
      // Wait for all book creation promises to complete before moving on.
      await Promise.all(bookPromises);
    }
  } catch (e) {
    console.error(e); // Handle and log any errors that occur during seeding.
  }
};

// Call the 'seed' function, which will execute the database seeding process.
seed()
  .catch(async (e) => {
    console.error(e); // Handle and log any errors that occur during seeding.
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect from the database when seeding is done.
    process.exit(0); // Exit the program with a success code (0).
  });

module.exports = prisma; // Export the Prisma client instance for external use.
