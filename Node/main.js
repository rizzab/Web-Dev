import assert from 'node:assert/strict';
import { before, describe, it, mock } from 'node:test';
import { db } from 'db';

/**
 * Validate input (implement this function or import it)
 */
function validate(key, val) {
  if (!key) throw new Error('Key is required');
  if (val === undefined) throw new Error('Value is required');
}

export function read(key, all = false) {
  validate(key);

  return all ? db.getAll(key) : db.getOne(key);
}

export function save(key, val) {
  validate(key, val);

  return db.upsert(key, val);
}

describe('foo', { concurrency: true }, () => {
  const barMock = mock.fn();
  let foo;

  before(async () => {
    const { default: _, ...barNamedExports } = await import('./bar.mjs');

    mock.module('./bar.mjs', {
      defaultExport: barMock,
      namedExports: barNamedExports,
    });

    ({ foo } = await import('./foo.mjs')); // dynamic import to respect the mock
  });

  it('should do the thing', () => {
    barMock.mockImplementationOnce(() => {
      // mock behavior here
      return 42; // ensure foo() gets expected return value
    });

    assert.equal(foo(), 42);
  });
});

