import { ClientResponse } from '../../models';

export const clientResponseMock: ClientResponse[] = [
  {
    id: 333,
    name: 'any_name333',
    email: 'any_email333@gmail.com',
    phoneNumber: '99999',
    profilePicture: 'any_base64',
  },
  {
    id: 666,
    name: 'any_name666',
    email: 'any_email666@gmail.com',
    phoneNumber: '99999',
    profilePicture: 'any_base64',
  },
];

export const clientMock = {
  name: 'any_name333',
  email: 'any_email333@gmail.com',
  phoneNumber: '99999',
  password: '666',
};

export const clientResponseDelete = {
  ...clientMock,
  profilePicture: 'any_picture',
  id: 1123,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const prismaMock = {
  client: {
    create: jest.fn(),
    findMany: jest.fn().mockReturnValue(clientResponseMock),
    findUnique: jest.fn().mockReturnValue(clientResponseMock[0]),
    update: jest.fn().mockReturnValue(clientResponseMock[0]),
    delete: jest.fn(),
  },
};
