
export const checkIfPgStatsActivityInstalledQuery = () => `
SELECT extname
FROM pg_extension
WHERE extname = 'pg_stat_statements';`

export const statsActivityQuery = (database: string, limit: number) => `
SELECT datname as db, query_id, query
From pg_stat_activity 
WHERE datname = '${database}'
LIMIT ${limit};
`