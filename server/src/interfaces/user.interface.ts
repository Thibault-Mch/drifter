export interface ILogin {
  email: string,
  password: string,
}

export interface IUser extends ILogin {
  _id?: string;
  username?: string;
  creationDate?: string;
  modificationDate?: string;
}

