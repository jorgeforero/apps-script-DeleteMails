/**
 * ADM - Borrado de correos enviados
 */

/**
 * removeEmail
 * Permite el borrado definitivo de los correos que cumplan con los criterios dados en el objeto "criteria"
 * 
 * @param {void} - void
 * @return {void} - Correos borrados de acuerdo a los criterios dados
 */
function removeEmail() {
  // Define los valores de búsqueda
  const criteria = {
    email: "me",
    // Label SENT y los correos mas viejos de 30 días
    query: `label:SENT older_than:20d`,
    // Máximo de resultados por pagina obtenida del API - Dejar este valor
    maxresults: 200
  };
  // Contadores
  let pageToken;
  let threadsCount = 0;
  do {
    // Obtiene los threads que cumplen con las condiciones dadas
    let threadList = Gmail.Users.Threads.list( criteria.email, { q: criteria.query, maxResults: criteria.maxresults, pageToken: pageToken });
    // Si hay threads que cumplen con los criterios, se procede al borrado de los correos encontrados
    if ( threadList.threads && threadList.threads.length > 0 ) {
      threadList.threads.forEach( function( thread ) {
        // WRNG: Borra el correo definitivamente sin pasar por la papelera. Los correos NO pueden ser recuperados
        Gmail.Users.Threads.remove( criteria.emailemail, thread.id );
        console.log( `REMOVED >> ${JSON.stringify(thread)}` );
        threadsCount++;
      });
    };
    // Obtiene la siguiente página de resultados, si los hay
    pageToken = threadList.nextPageToken;
  } while ( pageToken );
  console.log( `Número de threads borrados: ${threadsCount}` );
};

/**
* createTriggerRemoveEmails
*/
function createTriggerRemoveEmails() {
  // Trigger cada Lunes alrededor de las 09:00 am
  ScriptApp.newTrigger('removeEmail')
      .timeBased()
      .onWeekDay( ScriptApp.WeekDay.MONDAY )
      .atHour( 9 )
      .atMinute ( 0 )
      .create();
};
