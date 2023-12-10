var parse = require('pg-connection-string').parse;

export const parseConnection = (connectionString: string) => {
  let config = parse('connectionString')

  return config
}

export const getDatabaseFromConnectionString = (connectionString: string): string => {
  try {
    let config = parse(connectionString);

    if(!config?.database) {
      throw Error('Error: database name not found in connection string')
    }

    return config.database
  }
  catch (error) {
    throw  error;
  }
 
}

