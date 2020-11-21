export const mockCarsList = {
  cars: new Array(100).fill(0).map((_, index: number) => ({
    stockNumber: index,
    manufacturerName: 'Fiat',
    modelName: 'Marea',
    mileage: {
      number: index,
      unit: 'km',
    },
    fuelType: 'Diesel',
    color: 'white',
    pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
  })),
  totalPageCount: 10,
  totalCarsCount: 100,
};

export const mockCarDetails = {
  car: {
    stockNumber: 41400,
    manufacturerName: 'Fiat',
    modelName: 'Marea',
    mileage: {
      number: 100141,
      unit: 'km',
    },
    fuelType: 'Diesel',
    color: 'white',
    pictureUrl: 'http://localhost:3001/car.svg',
  },
};

export const mockCarColors = {
  colors: ['white'],
};

export const mockManufacturers = {
  manufacturers: [
    {
      name: 'Fiat',
      models: [
        {
          name: 'Marea',
        },
      ],
    },
  ],
};
