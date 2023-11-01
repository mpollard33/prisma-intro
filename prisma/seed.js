const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import author and book data from external files.
const authorNames = require('../data/authors');
const bookTitles = require('../data/books');

// Define a seed function that populates the database with authors and books.
const seed = async () => {
  try {
    for (let i = 0; i < authorNames.length; i++) {
      const authorName = authorNames[i];
      const author = await prisma.author.create({
        data: {
          name: authorName,
        },
      });

      // Create books associated with the author.
      const bookPromises = [];
      for (let j = 0; j < 3; j++) {
        bookPromises.push(
          prisma.book.create({
            data: {
              title: bookTitles[i * 3 + j],
              authorId: author.id,
            },
          })
        );
      }
      await Promise.all(bookPromises);
    }
  } catch (e) {
    console.error(e);
  }
};

// Call the 'seed' function, which will execute the database seeding process.
seed()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
