import * as jwt from 'jsonwebtoken';

const EXPIRES_IN = 60 * 5; // 5min

export function getBearerToken(userId, privateKey) {
  const jwtBearerToken = jwt.default.sign({}, privateKey, {
    algorithm: 'RS256',
    expiresIn: EXPIRES_IN,
    subject: `${userId}`
  })
  return {
    jwtBearerToken,
    expiresIn: EXPIRES_IN
  }
}