const mysql = require("mysql");
const axios = require("axios");
const cheerio = require("cheerio");

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  ssl: false
});

// Realizar la conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos: ", error);
  } else {
    console.log("Conexión exitosa a la base de datos");

    // Obtener los IDs de la tabla componentes
    const query = `SELECT id, url FROM amazon`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al consultar la base de datos: ", error);
        // Cerrar la conexión a la base de datos en caso de error
        connection.end();
      } else {
        console.log("Número de registros obtenidos: ", results.length);

        // Iterar sobre los resultados y hacer la solicitud HTTP y actualizar la base de datos para cada registro
        results.forEach((result, index) => {
          const { id, url } = result;

          setTimeout(() => {
            // Verificar si la URL contiene "t.ly/"
            if (url && url.includes("amazon")) {
              // Realizar el webscraping adicional
              axios.get(url)
                .then((response) => {
                  const html = response.data;
                  const $ = cheerio.load(html);
                  const priceText  = $(".a-price-whole").text(); // Obtener el valor del elemento adicional
                  const priceValues = priceText.split('.'); 
                  const firstPriceValue = priceValues[0]; 
                  console.log(firstPriceValue);

                  // Actualizar la base de datos con el valor adicional
                  const updateQuery = `UPDATE amazon SET precio = '${firstPriceValue}' WHERE id = ${id}`;
                  connection.query(updateQuery, (error, results) => {
                    if (error) {
                      console.error("Error al actualizar la base de datos: ", error);
                    } else {
                      console.log(`[${index + 1}] Actualización exitosa de la base de datos con el valor adicional`);
                    }
                  });
                })
                .catch((error) => {
                  console.error(`[${index + 1}] Error al hacer la solicitud HTTP adicional: ${error}`);
                });
            }
          }, index * 10); // Retraso de 100 ms entre cada solicitud (index * 100 milisegundos)
        });

        // Cerrar la conexión a la base de datos después de 5 segundos adicionales para asegurarse de que todas las consultas se hayan completado
        setTimeout(() => {
          connection.end();
          console.log("Conexión cerrada a la base de datos");
        }, results.length * 5000 + 5000);
      }
    });
  }
});
