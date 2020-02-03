const mockAxios = jest.genMockFromModule('axios');
mockAxios.get = jest.fn(() => mockAxios);
mockAxios.post = jest.fn(() => mockAxios);
export default mockAxios;