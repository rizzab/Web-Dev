test('synchronous passing test', (t) => {
  // This test still passes, but let's check a different passing value.
  assert.strictEqual(42, 42);
});

test('synchronous failing test', (t) => {
  // This test now fails with a different mismatched pair.
  assert.strictEqual('hello', 'world');
});

test('asynchronous passing test', async (t) => {
  // Pass with a string comparison instead of numbers.
  assert.strictEqual('abc', 'abc');
});

test('asynchronous failing test', async (t) => {
  // Fail with different numeric mismatch.
  assert.strictEqual(100, 200);
});

test('failing test using Promises', (t) => {
  // Change the rejection message.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Promise was rejected intentionally'));
    }, 10);
  });
});

test('callback passing test', (t, done) => {
  // Same passing logic, but with a small delay for realism.
  setTimeout(done, 5);
});

test('callback failing test', (t, done) => {
  // Different error message on failure.
  setImmediate(() => {
    done(new Error('callback test failed intentionally'));
  });
});
