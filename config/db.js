const sqlite3 = require('sqlite3').verbose();

// Crée une nouvelle instance de la base de données SQLite
const db = new sqlite3.Database('equitrec.db');

// Exécute les requêtes SQL pour créer les tables
db.serialize(() => {
    // Table: competiteur
    db.run(`CREATE TABLE IF NOT EXISTS competiteur (
    id_competiteur INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_competiteur VARCHAR(50) NOT NULL,
    prenom_competiteur VARCHAR(50) NOT NULL,
    num_licence INTEGER NOT NULL,
    id_competition INTEGER DEFAULT NULL,
    niveau INTEGER DEFAULT NULL,
    FOREIGN KEY (id_competition) REFERENCES competition(id_competition),
    FOREIGN KEY (niveau) REFERENCES niveau(id_niveau)
  )`);

    // Table: competition
    db.run(`CREATE TABLE IF NOT EXISTS competition (
    id_competition INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_competition VARCHAR(50) NOT NULL,
    debut_competition DATE DEFAULT NULL,
    fin_competition DATE DEFAULT NULL,
    nb_epreuves INTEGER NOT NULL,
    lat_competition FLOAT DEFAULT NULL,
    lon_competition FLOAT DEFAULT NULL,
    id_juge INTEGER DEFAULT NULL,
    FOREIGN KEY (id_juge) REFERENCES juges (id_juge)
  )`);

    // Table: niveau
    db.run(`CREATE TABLE IF NOT EXISTS niveau (
    id_niveau INTEGER PRIMARY KEY AUTOINCREMENT,
    libelle_niveau VARCHAR(50) NOT NULL
  )`);

    // Table: juge
    db.run(`CREATE TABLE IF NOT EXISTS juges (
    id_juge INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_juge VARCHAR(50) NOT NULL,
    prenom_juge VARCHAR(50) NOT NULL,
    tel_juge INTEGER NOT NULL,
    mail_juge VARCHAR(50) NOT NULL,
    login_juge VARCHAR(50) NOT NULL,
    pass_juge VARCHAR(50) NOT NULL,
    id_competition INTEGER NOT NULL,
    FOREIGN KEY (id_competition) REFERENCES competition(id_competition)
  )`);

    // Table: epreuve
    db.run(`CREATE TABLE IF NOT EXISTS epreuve (
    id_epreuve INTEGER PRIMARY KEY AUTOINCREMENT,
    libelle_epreuve VARCHAR(50) NOT NULL,
    id_competition INTEGER NOT NULL,
    FOREIGN KEY (id_competition) REFERENCES competition(id_competition)
  )`);

    // Table: obstacle
    db.run(`CREATE TABLE IF NOT EXISTS obstacle (
    id_obstacle INTEGER PRIMARY KEY AUTOINCREMENT,
    libelle_obstacle VARCHAR(50) NOT NULL,
    id_epreuve INTEGER NOT NULL,
    FOREIGN KEY (id_epreuve) REFERENCES epreuve(id_epreuve)
  )`);

    // Table: user
    db.run(`CREATE TABLE IF NOT EXISTS user (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_user VARCHAR(50) NOT NULL,
    prenom_user VARCHAR(50) NOT NULL,
    tel_user INTEGER NOT NULL,
    mail_user VARCHAR(50) NOT NULL,
    login_user VARCHAR(50) NOT NULL,
    pass_user VARCHAR(50) NOT NULL
  )`);
});

db.serialize(() => {
    db.run(`INSERT INTO competiteur (id_competiteur, nom_competiteur, prenom_competiteur, num_licence, id_competition, niveau) VALUES
    (1, 'Jackson', 'Andréa', 12365478, 2, NULL),
    (2, 'Sheperd', 'Amelia', 7896542, 1, NULL),
    (3, 'Hargreeves', 'Klaus', 521489635, 1, NULL),
    (4, 'Avery', 'Jackson', 14465451, 5, NULL),
    (5, 'Targaryen', 'Daenerys', 86521459, 2, NULL),
    (6, 'Durand', 'Marie', 345678, 3, NULL),
    (7, 'Lefevre', 'Thomas', 901234, 4, NULL),
    (8, 'Girard', 'Hélène', 567890, 3, NULL),
    (9, 'Dubois', 'Alexandre', 432109, 4, NULL),
    (10, 'Petit', 'Sophie', 876543, 3, NULL),
    (11, 'Robert', 'Pierre', 210987, 4, NULL)`);

    // Insertion des données dans la table competition
    db.run(`INSERT INTO competition (id_competition, nom_competition, debut_competition, fin_competition, nb_epreuves, lat_competition, lon_competition) VALUES
    (1, 'Compétition 1', '2023-07-01', '2023-07-05', 10, NULL, NULL),
    (2, 'Compétition 2', '2023-09-07', '2023-09-08', 10, NULL, NULL),
    (3, 'Compétition 3', '2023-07-09', '2023-07-10', 10, NULL, NULL),
    (4, 'Compétition 4', '2023-12-14', '2023-12-15', 10, NULL, NULL),
    (5, 'Compétition 5', '2023-12-14', '2023-12-15', 10, NULL, NULL),
    (6, 'test', '2023-04-20', '2023-04-22', 10, NULL, NULL),
    (7, 'Test 2', '2023-04-20', '2023-04-28', 5, NULL, NULL)`);

    // Insertion des données dans la table niveau
    db.run(`INSERT INTO niveau (id_niveau, libelle_niveau) VALUES
    (1, 'Débutant'),
    (2, 'Intermédiaire'),
    (3, 'Avancé'),
    (4, 'Expert'),
    (5, 'Maître')`);

    // Insertion des données dans la table juge
    db.run(`INSERT INTO juges (id_juge, nom_juge, prenom_juge, tel_juge, mail_juge, login_juge, pass_juge, id_competition) VALUES
    (1, 'Doe', 'John', 1234567890, 'john.doe@example.com', 'johndoe', 'password', 1)`);


    // Insertion des données dans la table epreuve
    db.run(`INSERT INTO epreuve (id_epreuve, libelle_epreuve, id_competition) VALUES
    (1, 'Épreuve 1', 1),
    (2, 'Épreuve 2', 1),
    (3, 'Épreuve 3', 2),
    (4, 'Épreuve 4', 2),
    (5, 'Épreuve 5', 3)`);

    // Insertion des données dans la table obstacle
    db.run(`INSERT INTO obstacle (id_obstacle, libelle_obstacle, id_epreuve) VALUES
    (1, 'Obstacle 1', 1),
    (2, 'Obstacle 2', 1),
    (3, 'Obstacle 3', 2),
    (4, 'Obstacle 4', 2),
    (5, 'Obstacle 5', 3)`);

    // Insertion des données dans la table user
    db.run(`INSERT INTO user (id_user, nom_user, prenom_user, tel_user, mail_user, login_user, pass_user) VALUES
    (1, 'Smith', 'Jane', 9876543210, 'jane.smith@example.com', 'janesmith', 'password')`);
});

db.all(`SELECT * FROM competiteur`, (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        rows.forEach((row) => {
            console.log(row.id_competiteur, row.nom_competiteur, row.prenom_competiteur, row.num_licence, row.id_competition, row.niveau);
        });
    }
});

// Récupère les données de la table competition
db.all(`SELECT * FROM competition`, (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        rows.forEach((row) => {
            console.log(row.id_competition, row.nom_competition, row.debut_competition, row.fin_competition, row.nb_epreuves, row.lat_competition, row.lon_competition);
        });
    }
});

// Récupère les données de la table juge
db.all(`SELECT * FROM juges`, (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        rows.forEach((row) => {
            console.log(row.id_juge, row.nom_juge, row.prenom_juge, row.tel_juge, row.mail_juge, row.login_juge, row.pass_juge, row.id_competition);
        });
    }
});

// Récupère les données de la table epreuve
db.all(`SELECT * FROM epreuve`, (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        rows.forEach((row) => {
            console.log(row.id_epreuve, row.libelle_epreuve, row.id_competition);
        });
    }
});

// Récupère les données de la table obstacle
db.all(`SELECT * FROM obstacle`, (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        rows.forEach((row) => {
            console.log(row.id_obstacle, row.libelle_obstacle, row.id_epreuve);
        });
    }
});

// Récupère les données de la table user
db.all(`SELECT * FROM user`, (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        rows.forEach((row) => {
            console.log(row.id_user, row.nom_user, row.prenom_user, row.tel_user, row.mail_user, row.login_user, row.pass_user);
        });
    }
});

// Ferme la connexion à la base de données
db.close();
