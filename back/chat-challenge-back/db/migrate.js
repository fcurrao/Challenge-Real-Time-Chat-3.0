const { db } = require("./db.js");

const migrate = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS chats (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          sender TEXT, 
          receiver TEXT,
          message TEXT, 
          date TEXT
      )`
  );
};

migrate();
