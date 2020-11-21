const baseUrl = 'https://auto1-mock-server.herokuapp.com/api';

export default {
  cars: {
    list: `${baseUrl}/cars`,
    details: (stockNumber: number): string => `${baseUrl}/cars/${stockNumber}`,
  },
  colors: `${baseUrl}/colors`,
  manufacturers: `${baseUrl}/manufacturers`,
};
