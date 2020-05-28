const { Pool } = require('pg');

const config = {
    host: process.env.DBhost,
    user: process.env.DBuser,
    password: process.env.DBpass,
    database: process.env.DBdb,
    port: process.env.DBport,
    ssl: true
};

const pool = new Pool(config);

//emergencia
async function getDBemer (Val) {
  if ((Val <= 2)){
      try {
          const res = await pool.query('SELECT * FROM emergencia WHERE estado = ($1)',[Val]);
          const resrow = await res.rows;
          return resrow;
        } catch (e) {
          console.log(e);
        }
      }
  else {
    try {
        const res = await pool.query('SELECT * FROM emergencia ');
        const resrow = await res.rows;
        return resrow;
        console.log('ok database');
        } catch (e) {
          console.log(e);
        }
      }
};
async function getemer (id) {
    try {
        const res = await pool.query('SELECT * FROM emergencia WHERE idemer = ($1)',[id]);
        const resrow = await res.rows;
        return resrow[0];
        } catch (e) {
          console.log(e);
        }
};
async function updateemer(idamb,id){
  try {
    console.log(idamb,id);
    const res = await pool.query('UPDATE emergencia SET id_amb1 = ($1), estado = 2 WHERE idemer = ($2)',[idamb,id]);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

//ambulancia
async function getAllamb () {
        try {
          const res = await pool.query('SELECT * FROM ambulancia');
          const resrow = await res.rows;
          return resrow;
        } catch (e) {
          console.log(e);
        }
};
async function getDBamb (idcentral) {
        try {
          const res = await pool.query('SELECT * FROM ambulancia WHERE idcentral = ($1)',[idcentral]);
          const resrow = await res.rows;
          return resrow;
        } catch (e) {
          console.log(e);
        }
};
async function getamb (id) {
  console.log(id);
      try {
          const res = await pool.query('SELECT * FROM ambulancia WHERE idamb = ($1) ',[id]);
          const resrow = await res.rows;
          return resrow;
        } catch (e) {
          console.log(e);
        }
};
async function insertamb(idamb, ambtype, placa, brand, model,idcentral){
    try {
      const text = 'INSERT INTO ambulancia (idamb, ambtype, ambest, placa, brand, model,idcentral) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const values = [idamb, ambtype,  1, placa, brand, model, idcentral];
      const res = await pool.query(text, values);
      console.log(res)
    } catch (e) {
         console.log(e);
    }
};
async function validateamb(idamb,idcentral){
  try {
    const text = 'SELECT idamb FROM ambulancia WHERE idamb=($1) AND idcentral = $2';
    const values = [idamb,idcentral];
    const res = await pool.query(text, values);
    const resrow = await res.rows;
    //console.log(resrow);
    return resrow;
  } catch (e) {
       console.log(e);
  }
}
async function deleteamb(idamb, idcentral){
    try {
        const text = 'DELETE FROM ambulancia WHERE idamb = $1 AND idcentral = $2';
        const value = [idamb, idcentral];
        const res = await pool.query(text, value);
    } catch (e) {
        console.log(e);
    }
};

//personal
async function getDBper (idcentral) {
      try {
          const res = await pool.query('SELECT * FROM public.personal WHERE idcentral = ($1)',[idcentral]);
          const resrow = await res.rows;
          return resrow;
        } catch (e) {
          console.log(e);
        }
};
async function insertper(idcc, name, cargo, idcentral){
    try {
      const text = 'INSERT INTO personal(idcc, namep, cargo, idcentral) VALUES ($1, $2, $3, $4)';
      const values = [idcc, name, cargo, idcentral];
      const res = await pool.query(text, values);
      console.log(res)
    } catch (e) {
         console.log(e);
    }
};
async function validateper(idcc, idcentral){
  try {
    const text = 'SELECT idcc FROM personal WHERE idcc=($1) AND idcentral = $2';
    const values = [idcc, idcentral];
    const res = await pool.query(text, values);
    const resrow = await res.rows;
    console.log(resrow);
    return resrow;
  } catch (e) {
       console.log(e);
  }
}
async function deleteper(idcc, idcentral){
    try {
        const text = 'DELETE FROM personal WHERE idcc = $1 AND idcentral = $2';
        const value = [idcc, idcentral];
        const res = await pool.query(text, value);
      } catch (e) {
        console.log(e);
    }
};

//resourceTable
async function getresource(idcentral){
    try {
      const res = await pool.query('SELECT * FROM public.recursos WHERE idcentral = ($1)',[idcentral]);
      const resrow = await res.rows;
      console.log(resrow);
      return resrow;
    } catch (e) {
      console.log(e);
    }
};

//Login
async function getUser(id){
  try {
    const text = 'SELECT * FROM users WHERE iduser=($1)';
    const values = [id];
    const res = await pool.query(text, values);
    const resrow = await res.rows;
    //console.log(resrow[0]);
    return resrow[0];
  } catch (e) {
       console.log(e);
  }
};

module.exports = {
  pool,
  config,
  getDBamb,
  getAllamb,
  getDBper,
  getDBemer,
  getemer,
  getUser,
  getamb,
  getresource,
  insertamb,
  insertper,
  deleteper,
  deleteamb,
  validateper,
  validateamb,
  updateemer
};
