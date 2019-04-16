let defaultMockPromiseResponse = true;
let mockPromiseResponse = defaultMockPromiseResponse;

const mockAPI = {
  get: jest.fn().mockImplementation(() => Promise.resolve(mockPromiseResponse)),
  patch: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockPromiseResponse)),
  post: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockPromiseResponse)),
  delete: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockPromiseResponse)),
  setSessionToken: jest.fn(),
  clearSessionToken: jest.fn(),
  setAuthTokenHeader: jest.fn(),
  saveTokenToStorage: jest.fn(),
  onAuthError: jest.fn(),
  __setMockResponse: function(value) {
    mockPromiseResponse = value;
  },
  __resetMockResponse: function() {
    mockPromiseResponse = defaultMockPromiseResponse;
  }
};

export default mockAPI;
