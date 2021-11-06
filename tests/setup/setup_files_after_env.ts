import { iterableEquality } from 'expect/build/utils'
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'

const passMessage = (item: unknown, list: unknown[]) => () =>
  matcherHint('.not.toEqualOneOf', 'item', 'list') +
  '\n\n' +
  'Expected value to not be in list:\n' +
  `  ${printExpected(list)}\n` +
  'Received:\n' +
  `  ${printReceived(item)}`

const failMessage = (item: unknown, list: unknown[]) => () =>
  matcherHint('.toEqualOneOf', 'item', 'list') +
  '\n\n' +
  'Expected value to be in list:\n' +
  `  ${printExpected(list)}\n` +
  'Received:\n' +
  `  ${printReceived(item)}`

expect.extend({
  toEqualOneOf(received: unknown, expected: unknown[]) {
    const pass = expected.some((exp) =>
      this.equals(received, exp, [iterableEquality])
    )

    if (pass) {
      return { pass: true, message: passMessage(received, expected) }
    }

    return { pass: false, message: failMessage(received, expected) }
  }
})
