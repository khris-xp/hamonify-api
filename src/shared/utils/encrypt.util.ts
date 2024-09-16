import * as crypto from 'crypto';

import * as bcrypt from 'bcrypt';

export const hashBcrypt = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt();

  return bcrypt.hash(value, salt);
};

export const compareBcrypt = async (value: string, hash: string) => {
  return bcrypt.compare(value, hash);
};

export const hashSha256 = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export const verifySha256 = (data: string, hash: string): boolean => {
  const hashedData = hashSha256(data);

  if (Buffer.byteLength(hash) !== Buffer.byteLength(hashedData)) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashedData));
};
