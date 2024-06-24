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
const User = require("./app/models/Users.model");
const UserType = require("./app/models/UserType.model");
const Departement = require("./app/models/Departement.model");
const Formation = require("./app/models/Formation.model");
const Type_Stage = require("./app/models/TypeStage.model");
const Classe = require("./app/models/Classe.model");
const Etudiant = require("./app/models/Etudiant.model");
const Stage = require("./app/models/Stage.model");
const Project = require("./app/models/Project.model");
const Organisme = require("./app/models/Organisme.model");
const Encadrant = require("./app/models/Encadrant.model");
const Niveau_formation = require("./app/models/NiveauFormation.model");
const EtudiantStage = require("./app/models/EtudiantStage.model");
const Parcour = require("./app/models/Parcours.model");
const Annee_Universitaire = require("./app/models/AnneeUniversitaire.model");

// Routes
const usersRouter = require("./app/routes/users.routes");
const encadrantRouter = require("./app/routes/encadrant.routes");
const stageRouter = require("./app/routes/stages.routes");
const etudiantRouter = require("./app/routes/etudiant.routes");
const ocrRouter = require("./app/routes/ocr.routes");
const formationRouter = require("./app/routes/fromation.routes");
const typeStageRouter = require("./app/routes/TypeStage.routes");
const classeRouter = require("./app/routes/classe.routes");
const niveauFormation = require("./app/routes/niveauFormation.routes");
const departementRouter = require("./app/routes/departement.routes");
const organismeRouter = require("./app/routes/organisme.routes");
const etudiantStageRouter = require("./app/routes/etudiantStage.routes");
const projectRouter = require("./app/routes/project.routes");
const parcourRouter = require("./app/routes/parcour.routes");
const anneeUniversitaireRouter = require("./app/routes/anneeUniversitaire.routes");

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
app.use(`${API_PREFIX}/encadrant`, encadrantRouter);
app.use(`${API_PREFIX}/stages`, stageRouter);
app.use(`${API_PREFIX}/etudiants`, etudiantRouter);
app.use(`${API_PREFIX}/ocr`, ocrRouter);
app.use(`${API_PREFIX}/type_stages`, typeStageRouter);
app.use(`${API_PREFIX}/organismes`, organismeRouter);
app.use(`${API_PREFIX}/etudiantStages`, etudiantStageRouter);
app.use(`${API_PREFIX}/projects`, projectRouter);
app.use(`${API_PREFIX}/parcours`, parcourRouter);
app.use(`${API_PREFIX}/annee_universitaire`, anneeUniversitaireRouter);

// Associations
User.belongsTo(UserType, { foreignKey: "user_type" });
UserType.hasOne(User, { foreignKey: "user_type" });

Departement.hasMany(Formation, { foreignKey: "departement_id" });
Formation.belongsTo(Departement, { foreignKey: "departement_id" });

Annee_Universitaire.hasMany(Formation, {
  foreignKey: "annee_universitaire_id",
});
Formation.belongsTo(Annee_Universitaire, {
  foreignKey: "annee_universitaire_id",
});

Formation.hasMany(Niveau_formation, { foreignKey: "formation_id" });
Niveau_formation.belongsTo(Formation, { foreignKey: "formation_id" });

Niveau_formation.belongsTo(Type_Stage, { foreignKey: "type_stage_id" });
Type_Stage.hasOne(Niveau_formation, { foreignKey: "type_stage_id" });

Niveau_formation.hasMany(Classe, { foreignKey: "niveau_formation_id" });
Classe.belongsTo(Niveau_formation, { foreignKey: "niveau_formation_id" });

Classe.hasMany(Etudiant, { foreignKey: "classe_id" });
Etudiant.belongsTo(Classe, { foreignKey: "classe_id" });

Stage.belongsTo(Classe, { foreignKey: "classe_id" });
Stage.belongsTo(Niveau_formation, { foreignKey: "niveau_formation_id" });

Project.hasOne(Stage, {
  foreignKey: "project_id",
});

Stage.belongsTo(Project, {
  foreignKey: "project_id",
});

Etudiant.belongsToMany(Stage, { through: EtudiantStage, foreignKey: "cin" });
Stage.belongsToMany(Etudiant, {
  through: EtudiantStage,
  foreignKey: "stage_id",
});

EtudiantStage.belongsTo(Etudiant, { foreignKey: "cin" });
EtudiantStage.belongsTo(Stage, { foreignKey: "stage_id" });

Etudiant.belongsToMany(Stage, { through: EtudiantStage, foreignKey: "cin" });
Stage.belongsToMany(Etudiant, {
  through: EtudiantStage,
  foreignKey: "stage_id",
});

EtudiantStage.belongsTo(Etudiant, { foreignKey: "cin" });
EtudiantStage.belongsTo(Stage, { foreignKey: "stage_id" });

Etudiant.hasMany(EtudiantStage, { foreignKey: "cin" });
Stage.hasMany(EtudiantStage, { foreignKey: "stage_id" });

Organisme.hasMany(Project, { foreignKey: "organisme_id" });
Project.belongsTo(Organisme, { foreignKey: "organisme_id" });

Stage.belongsTo(Encadrant, { foreignKey: "encadrant_id" });
Encadrant.hasOne(Stage, { foreignKey: "encadrant_id" });

Parcour.hasMany(Niveau_formation, {
  foreignKey: "parcour_id",
});

Niveau_formation.belongsTo(Parcour, {
  foreignKey: "parcour_id",
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connection to database etablished");
    app.listen(PORT, () => console.log(`Alpha backend listenning on ${PORT}`));
  })
  .catch((err) => {
    console.log("Database connection error ! ");
    console.log(err);
  });
