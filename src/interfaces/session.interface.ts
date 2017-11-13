
export interface session {
    Status: string;
    result: result;
  }

  interface GeneralInfo {
    UserID: number;
    UserName: string;
    UserSecurityType: number;
    Registration: number;
    Email: string;
    IsTrader: boolean;
    BIMSIAccountNumber: number;
  }

  interface result {
    Token: string;
    GeneralInfo: GeneralInfo;
    UserCustodians: string[];
    UserAccounts: string[];
    UserFavorite?:[{id:number , iid:string , tid:number}];
  }
  
  export class User {
    username: string;
    password: string;
   
    constructor(_username: string, _password: string) {
      this.username = _username;
      this.password = _password;
    }
  }

