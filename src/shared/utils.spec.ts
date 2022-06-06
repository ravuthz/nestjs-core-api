import { comparePasswords, encryptPassword } from './utils';

describe('encryptPassword', () => {
  it('should be defined', async () => {
    expect(encryptPassword).toBeDefined();
  });
  it('should result encrypted password as result', async () => {
    const password = await encryptPassword('123123');
    expect(password).toBeTruthy();
  });
});

describe('comparePasswords', () => {
  it('should be defined', async () => {
    expect(encryptPassword).toBeDefined();
  });
  it('should return true as result', async () => {
    const encoded = '$2b$16$QHsfCSoxC1G6ajoc9160HuCT.CPuNyT8J2pVMdc.9NY1GHQqM78Pi';
    const password = await comparePasswords(encoded, '123123');
    expect(password).toBeTruthy();
  });
});