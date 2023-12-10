
export const checkIfPgStatsActivityInstalledQuery = () => `
SELECT extname
FROM pg_extension
WHERE extname = 'pg_stat_activity';`