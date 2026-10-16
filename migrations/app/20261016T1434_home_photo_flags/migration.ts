#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2f76ab18b018c6484fae5defaa5d94d139eca3ed6d8d4ae61a2156bc5026ce73/contract';
import endContract from '../../snapshots/2f76ab18b018c6484fae5defaa5d94d139eca3ed6d8d4ae61a2156bc5026ce73/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/4c74c979e6b1d005623b9504b6f721d1695ba514f61b174ebb21e601eecc94e4/contract';
import startContract from '../../snapshots/4c74c979e6b1d005623b9504b6f721d1695ba514f61b174ebb21e601eecc94e4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'InstagramPost',
        column: col('onHome', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Polaroid',
        column: col('onHome', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
