// TypeScript declarations for Knex module
import { Knex } from "knex";

export const db: Knex;
export function testConnection(): Promise<boolean>;
export function closeConnection(): Promise<void>;
export default Knex;
