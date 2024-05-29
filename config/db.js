import mysql from 'mysql2/promise';

export async function connect() {
  return await mysql.createConnection({
    //host: 'localhost',
   // user: 'root',
    //password: 'Pakamax1@',
    ///database: 'siyahlum_loan',
   // database: 'career_expo'

    host: 'localhost',
    user: 'kzxhpncr_career_expo',
    password: 'bemjyt8wwqWpz9TyBPqy',
    ///database: 'siyahlum_loan',
    database: 'kzxhpncr_career_expo'
  });
}
///mysql+mysqlconnector://root:Pakamax1%40@localhost:3306/siyahlum_loan