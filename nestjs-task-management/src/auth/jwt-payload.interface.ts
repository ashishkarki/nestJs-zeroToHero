// define the structure of payload used by the jwtModule to create
// a jwt based signature. See example in auth.service
export interface JwtPayload {
  username: string;
}

// the return type from when jwt module signs the above payload
export interface JwtSignedToken {
  accessToken: string;
}
