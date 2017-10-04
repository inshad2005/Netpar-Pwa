export interface Environment 
{
	endPoint:string;
}

export const DEV: Environment = {
	endPoint:'' 
}

export const PROD: Environment = {
	endPoint:'' 
}
export const environment: Environment= PROD;