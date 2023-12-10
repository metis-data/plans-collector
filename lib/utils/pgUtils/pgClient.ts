import { Client } from 'pg';


export  interface Connection {
  host: string;
  database: string;
  user: string;
  password: string;
  port?: number;
  ssl?: boolean;
}

interface ClientConfig {
  host: string;
  database: string;
  user: string;
  password: string;
}

export class PgClient {
  private client: any;

  constructor(connectionString: string) {
      this.client = new Client(connectionString);
  }

  public connectClient = async(): Promise<void> => {
      this.client.connect();
  }

  public queryDatabase = async (query: string): Promise<any> => {
    try {
      const result: any = await this.client.query(query);
      return result?.rows || [];
    } catch (error) {
      throw error;
    } 
  };

  public endClient = async(): Promise<void> => {
    this.client.end()
  }
}



