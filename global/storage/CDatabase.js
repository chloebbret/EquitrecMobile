import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('equitrec.db');

// Create tables if they don't exist
async function createTables() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Judge (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT)'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Rider (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, level_id INTEGER, bib_number INTEGER)'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Level (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT)'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Obstacle (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT)'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Competition (id INTEGER PRIMARY KEY AUTOINCREMENT, participant_id INTEGER, judge_id INTEGER)'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Competition_Obstacle (competition_id INTEGER, obstacle_id INTEGER)'
      );
    }, (error) => {
      console.log("Error creating tables:", error);
      reject(error);
    }, () => {
      console.log("Tables were created successfully!");
      resolve();
    });
  });
}


function emptyDatabase() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Judge', [], null, handleTransactionError);
      tx.executeSql('DELETE FROM Rider', [], null, handleTransactionError);
      tx.executeSql('DELETE FROM Level', [], null, handleTransactionError);
      tx.executeSql('DELETE FROM Obstacle', [], null, handleTransactionError);
      tx.executeSql('DELETE FROM Competition', [], null, handleTransactionError);
      tx.executeSql('DELETE FROM Competition_Obstacle', [], null, handleTransactionError);
    }, handleTransactionError, handleTransactionSuccess);

    function handleTransactionError(_, error) {
      reject(error);
    }

    function handleTransactionSuccess() {
      resolve();
    }
  });
}

// Get the judge's full name: surname name
function getJudgeFullName(judgeId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Judge WHERE id = ?',
        [judgeId],
        (_, {rows}) => {
          const {surname, name} = rows.item(0);
          const fullName = `${surname} ${name}`;
          resolve(fullName);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

// Get the rider's full name with bib number: #bib_number surname name
function getRiderFullName(riderId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Rider WHERE id = ?',
        [riderId],
        (_, {rows}) => {
          const {bib_number, surname, name} = rows.item(0);
          const fullName = `#${bib_number} ${surname} ${name}`;
          resolve(fullName);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

// Get the amount of competitions a judge has
function getJudgeCompetitionCount(judgeId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) AS count FROM Competition WHERE judge_id = ?',
        [judgeId],
        (_, {rows}) => {
          const {count} = rows.item(0);
          resolve(count);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

// Get all the riders for a judge
function getRidersForJudge(judgeId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Rider INNER JOIN Competition ON Competition.participant_id = Rider.id WHERE Competition.judge_id = ?',
        [judgeId],
        (_, {rows}) => {
          const riders = rows._array;
          resolve(riders);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

// Get all obstacles for a rider
function getObstaclesForRider(riderId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Obstacle INNER JOIN Competition_Obstacle ON Competition_Obstacle.obstacle_id = Obstacle.id INNER JOIN Competition ON Competition.id = Competition_Obstacle.competition_id WHERE Competition.participant_id = ?',
        [riderId],
        (_, {rows}) => {
          const obstacles = rows._array;
          resolve(obstacles);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

function insertJudge(id, name, surname) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Judge (id, name, surname) VALUES (?, ?, ?)',
        [id, name, surname],
        (_, {insertId}) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

function insertRider(id, name, surname, levelId, bibNumber) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Rider (id, name, surname, level_id, bib_number) VALUES (?, ?, ?, ?, ?)',
        [id, name, surname, levelId, bibNumber],
        (_, {insertId}) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

function insertLevel(id, label) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Level (id, label) VALUES (?, ?)',
        [id, label],
        (_, {insertId}) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

function insertObstacle(id, label) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Obstacle (id, label) VALUES (?, ?)',
        [id, label],
        (_, {insertId}) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

function insertCompetition(id, participantId, judgeId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Competition (id, participant_id, judge_id) VALUES (?, ?, ?)',
        [id, participantId, judgeId],
        (_, {insertId}) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

function insertCompetitionObstacle(competitionId, obstacleId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Competition_Obstacle (competition_id, obstacle_id) VALUES (?, ?)',
        [competitionId, obstacleId],
        (_, {insertId}) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export default {
  createTables,
  emptyDatabase,
  getJudgeFullName,
  getRiderFullName,
  getJudgeCompetitionCount,
  getRidersForJudge,
  getObstaclesForRider,
  insertJudge,
  insertRider,
  insertLevel,
  insertObstacle,
  insertCompetition,
  insertCompetitionObstacle
};