const express = require("express");
const cors = require("cors");
const loginRouter = require("./app/routes/login.routes");
require("dotenv").config({ path: "./app/config/.env" });
const morgan = require("morgan");
// Swagger documentation
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
// Database
const sequelize = require("./app/config/databaseConnection");
// Models
const Stage = require("./app/models/Stage.model");
const Project = require("./app/models/Project.model");
const Student = require("./app/models/Etudiant.model");
const Supervisor = require("./app/models/Supervisor.model");
// Routes
const usersRouter = require("./app/routes/users.routes");
const supervisorRouter = require("./app/routes/supervisor.routes");
const stageRouter = require("./app/routes/stages.routes");
const etudiantRouter = require("./app/routes/etudiant.routes");
const ocrRouter = require("./app/routes/ocr.routes");
const formationRouter = require("./app/routes/fromation.routes");
const Formation = require("./app/models/Formation.model");
const Classe = require("./app/models/Classe.model");
const Type_Stage = require("./app/models/TypeStage.model");
const typeStageRouter = require("./app/routes/TypeStage.routes");
const classeRouter = require("./app/routes/classe.routes");
const Etudiant = require("./app/models/Etudiant.model");
const niveauFormation = require("./app/routes/niveauFormation.routes");
const Niveau_foramtion = require("./app/models/NiveauFormation.model");
const User = require("./app/models/Users.model");
const UserType = require("./app/models/UserType.model");
const departementRouter = require("./app/routes/departement.routes");
const Departement = require("./app/models/Departement.model");

// Getting the .env Variables
const PORT = process.env.PORT;
const API_PREFIX = process.env.API_PREFIX;

const app = express();

// MiddleWares
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(
  `${API_PREFIX}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use(`${API_PREFIX}/login`, loginRouter);
app.use(`${API_PREFIX}/users`, usersRouter);

app.use(`${API_PREFIX}/departements`, departementRouter);
app.use(`${API_PREFIX}/formations`, formationRouter);
app.use(`${API_PREFIX}/classes`, classeRouter);
app.use(`${API_PREFIX}/niveau_formation`, niveauFormation);

app.use(`${API_PREFIX}/supervisor`, supervisorRouter);
app.use(`${API_PREFIX}/stage`, stageRouter);
app.use(`${API_PREFIX}/students`, etudiantRouter);
app.use(`${API_PREFIX}/ocr`, ocrRouter);
app.use(`${API_PREFIX}/type_stages`, typeStageRouter);

// Associations
User.belongsTo(UserType, { foreignKey: "user_type" });
UserType.hasOne(User, { foreignKey: "user_type" });

Departement.hasMany(Formation, { foreignKey: "departement_id" });
Formation.belongsTo(Departement, { foreignKey: "departement_id" });

Formation.hasMany(Niveau_foramtion, { foreignKey: "formation_id" });
Niveau_foramtion.belongsTo(Formation, { foreignKey: "formation_id" });

Niveau_foramtion.belongsTo(Type_Stage, { foreignKey: "type_stage_id" });
Type_Stage.hasOne(Niveau_foramtion, { foreignKey: "type_stage_id" });

Niveau_foramtion.hasMany(Classe, { foreignKey: "niveau_formation_id" });
Classe.belongsTo(Niveau_foramtion, { foreignKey: "niveau_formation_id" });

Classe.hasMany(Etudiant, { foreignKey: "classe_id" });
Etudiant.belongsTo(Classe, { foreignKey: "classe_id" });

Stage.belongsTo(Etudiant, { foreignKey: "etudiant_cin" });
Stage.belongsTo(Classe, { foreignKey: "classe_id" });
Stage.belongsTo(Niveau_foramtion, { foreignKey: "niveau_formation_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection to database etablished");
    app.listen(PORT, () => console.log(`Alpha backend listenning on ${PORT}`));
  })
  .catch((err) => {
    console.log("Database connection error ! ");
    console.log(err);
  });
