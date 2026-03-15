const sequelize = require("./db");
const { Item } = require("./models");
const items = require("./items.json");

async function seed() {
  //Force sync database to drop everything and start fresh
  await sequelize.sync({ force: true });
  await Item.bulkCreate(items);
  console.log("Database populated");
}

seed();
