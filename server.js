const app = require("./server/app");
const sequelize = require("./server/db");

const PORT = process.env.PORT || 3000;

async function init() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {

      console.log(`Server is live and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

init();