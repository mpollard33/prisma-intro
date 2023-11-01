// Import the 'prisma' module from a file located in the parent directory ('../prisma').
const prisma = require('../prisma');

const seed = async () => {
  // Inside the 'seed' function, we'll write code to create data (authors and books) in a database.
  // However, there's currently no code written here for that purpose.
  // You would typically add code here to create authors and their books.
};

// Call the 'seed' function, which will execute the code inside it. It returns a Promise.
seed()
  .then(async () => await prisma.$disconnect()) // When 'seed' is done, disconnect from the database.
  .catch(async (e) => {
    console.error(e); // If an error occurs, print it to the console.
    await prisma.$disconnect(); // Ensure that we disconnect from the database.
    process.exit(1); // Exit the program with an error code (1).
  });
