#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/2f76ab18b018c6484fae5defaa5d94d139eca3ed6d8d4ae61a2156bc5026ce73/contract';
import startContract from '../../snapshots/2f76ab18b018c6484fae5defaa5d94d139eca3ed6d8d4ae61a2156bc5026ce73/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a25b568d808cd4c803da014b0dc128756eb2604d9591f9ae501306789b7b1c3f/contract';
import endContract from '../../snapshots/a25b568d808cd4c803da014b0dc128756eb2604d9591f9ae501306789b7b1c3f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Setting',
        columns: [
          col('key', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('value', 'json', { notNull: true, codecRef: { codecId: 'pg/json@1' } }),
        ],
        constraints: [primaryKey(['key'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
