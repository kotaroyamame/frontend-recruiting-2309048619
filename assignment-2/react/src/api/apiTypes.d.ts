export interface HTTP_RESPONCE {
  status: number;
  success: boolean;
  statusText: string;
}

export interface Form1 {
  name: string
  email: string
  zip: string
  prefecture: string
  address1: string
  address2?: string
}
