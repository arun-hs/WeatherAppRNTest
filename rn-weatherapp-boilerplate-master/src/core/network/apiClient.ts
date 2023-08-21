import { GetReqType } from './types';

export const apiErrorHandler = (error: any) => {
  console.log(JSON.stringify(error));
};

export const makeApiRequest = async (req: GetReqType) => {
  try {
    const response = await fetch(req.url, req.option);
    const res = await response.json();
    return res;
  } catch (e: any) {
    apiErrorHandler(e);
  }
};