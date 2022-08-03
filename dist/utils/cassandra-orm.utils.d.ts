import { Observable } from 'rxjs';
import { Type } from '@nestjs/common';
import { ConnectionOptions, Connection } from '../orm';
export declare function handleRetry(retryAttempts?: number, retryDelay?: number): <T>(source: Observable<T>) => Observable<T>;
/**
 * This function returns a Connection injection token for given Connection, ConnectionOptions or connection name.
 * @param {(Connection | ConnectionOptions | string)} [connection='default'] This optional parameter is either
 * a Connection or a ConnectionOptions or a string.
 * @returns {(string | Function | Type<Connection>)} The Connection injection token.
 */
export declare function getConnectionToken(connection?: Connection | ConnectionOptions | string): string | Function | Type<Connection>;
/**
 * This function returns a Cassandra model token for given entity.
 * @param {Function} entity This parameter is an Entity class.
 * @returns {string} The Cassandra model injection token.
 */
export declare function getModelToken(entity: any): string;
/**
 * This function returns a Repository injection token for given entity.
 * @param {Function} entity This options is either an Entity class or Repository.
 * @returns {string} The Repository injection token.
 */
export declare function getRepositoryToken(entity: any): string;
export declare function getConnectionName(options: ConnectionOptions): string;
export declare const generateString: () => (separator?: string | undefined) => string;
