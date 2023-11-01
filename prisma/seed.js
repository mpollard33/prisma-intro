// Import the 'prisma' module from a file located in the parent directory ('../prisma').
const prisma = require('../prisma');

// Import author and book data from external files.
const authorNames = require('../data/authors');
const bookTitles = require('../data/books');

// Define a seed function that populates the database with authors and books.
const seed = async () => {
  // Create an array of author promises.
  const authorPromises = authorNames.map(async (authorName) => {
    return prisma.author.create({
      data: {
        name: authorName,
      },
    });
  });

  // Create an array of book promises.
  const bookPromises = bookTitles.map(async (bookTitle) => {
    return prisma.book.create({
      data: {
        title: bookTitle,
      },
    });
  });

  // Wait for all author and book promises to complete.
  await Promise.all([...authorPromises, ...bookPromises]);
};

// Call the 'seed' function, which will execute the database seeding process.
seed()
  .then(async () => await prisma.$disconnect()) // When 'seed' is done, disconnect from the database.
  .catch(async (e) => {
    console.error(e); // If an error occurs during seeding, print it to the console.
    await prisma.$disconnect(); // Ensure that we disconnect from the database.
    process.exit(1); // Exit the program with an error code (1).
});
