// Extend Jest to simplify tests
// Would normally use own test matchers here - https://github.com/djforth/jest-matchers, but didn't want to mess with config too much

// Checks if function
expect.extend({
  toBeFunction(received) {
    const pass = received && typeof received === 'function';
    if (pass) {
      return {
        message: () => 'is a function',
        pass: true,
      };
    }
    return {
      message: () => 'is not a function',
      pass: false,
    };
  },
});

// Checks element type
expect.extend({
  toBeElement(received, expected) {
    const pass = received instanceof Element && received.tagName === expected;
    if (pass) {
      return {
        message: () => `is a ${expected} element` ,
        pass: true,
      };
    }
    return {
      message: () => `is a ${received.tagName} not a ${expected} element`,
      pass: false,
    };
  },
});

// Checks if array returns on of the following expected responses
expect.extend({
  toContainOneOf(received, expected) {

    const pass = Array.isArray(expected) && expected.includes(received);
    if (pass) {
      return {
        message: () => `does contain on of [${expected.join(', ')}]`,
        pass: true,
      };
    }
    return {
      message: () => `does not contain on of [${expected.join(', ')}]`,
      pass: false,
    };
  },
});

// Checks if element has correct attribute
expect.extend({
  toHaveAttribute(received, expected, attr) {
    let pass = received instanceof Element;

    if(pass) {
      pass = received.hasAttribute(expected) && received.getAttribute(expected) === attr;
    }
    
    if (pass) {
      return {
        message: () => `element does have attribute of ${expected} = ${attr}`,
        pass: true,
      };
    }
    return {
      message: () => `element does have text content of  ${expected} = ${attr}`,
      pass: false,
    };
  },
});

// Checks if element has correct text
expect.extend({
  toHaveTextContent(received, expected) {

    const pass = received instanceof Element && received.textContent === expected;
    if (pass) {
      return {
        message: () => `element does have text content of ${expected}`,
        pass: true,
      };
    }
    return {
      message: () => `element does have text content of ${expected}`,
      pass: false,
    };
  },
});