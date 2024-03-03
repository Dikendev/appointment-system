import { ClientResponse } from '../model/client.model';

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

export const prismaMock = {
  client: {
    create: jest.fn().mockReturnValue(clientResponseMock[0]),
    findMany: jest.fn().mockReturnValue(clientResponseMock),
    findUnique: jest.fn().mockReturnValue(clientResponseMock[0]),
    update: jest.fn().mockReturnValue(clientResponseMock[0]),
  },
};
