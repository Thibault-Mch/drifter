export interface ILogin {
  email: string,
  password: string,
  username?: string;
}

export interface IUser extends ILogin {
  _id: string;
  creationDate: string;
  modificationDate: string;
}

