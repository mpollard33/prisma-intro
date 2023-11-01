// Import the 'prisma' module from a file located in the parent directory ('../prisma').
const prisma = require ('../prisma');

const authorNames = require ('../data/authors');

const seed = async () => {
  authorNames.map (async author => {
    const author = await prisma.user.create ({
      data: {
        name: author,
      },
    });
  });
};
// Call the 'seed' function, which will execute the code inside it. It returns a Promise.
seed ()
  .then (async () => await prisma.$disconnect ()) // When 'seed' is done, disconnect from the database.
  .catch (async e => {
    console.error (e); // If an error occurs, print it to the console.
    await prisma.$disconnect (); // Ensure that we disconnect from the database.
    process.exit (1); // Exit the program with an error code (1).
  });

/*  -- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
*/
