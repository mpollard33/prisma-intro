// Import the 'prisma' module from a file located in the parent directory ('../prisma').
const prisma = require('../prisma');

// Import author and book data from external files.
const authorNames = require('../data/authors');
const bookTitles = require('../data/books');

// Define a seed function that populates the database with authors and books.
const seed = async () => {
  // Create an array of author promises.
  const authorPromises = authorNames.map(async authorName => {
    return prisma.author.create({
      data: {
        name: authorName,
      },
    });
  });
  // Wait for all author promises to complete and store the authors in the 'authors' array.
  const authors = await Promise.all(authorPromises);

  // Create an array of book promises.
  const bookPromises = bookTitles.map(async (title, index) => {
    return prisma.book.create({
      data: {
        title,
        // Connect each book to its corresponding author by using the author's 'id'.
        author: {
          connect: {
            id: authors[index].id,
          },
        },
      },
    });
  });
  // Wait for all book promises to complete.
  await Promise.all(bookPromises);
};

// Call the 'seed' function, which will execute the database seeding process.
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async e => {
    console.error(e);
    // Ensure that we disconnect from the database in case of an error.
    await prisma.$disconnect();
    // Exit the program with an error code (1).
    process.exit(1);
  });
