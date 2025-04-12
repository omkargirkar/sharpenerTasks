use library;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bookName VARCHAR(255) NOT NULL,
  isReturned BOOLEAN DEFAULT FALSE,
  takenOn DATETIME,
  returnBy DATETIME,
  returnedOn DATETIME
);
