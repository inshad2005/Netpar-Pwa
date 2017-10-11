export const LANGUAGE = {
	ENGLISH: "en",
	MARATHI: "ma",
}

export interface Environment 
{
	language: string;
	endPoint:string;
}

export const DEV: Environment = {
	language:LANGUAGE.ENGLISH,
	endPoint:'http://52.15.178.19:3002/netpar/' 
}

export const PROD: Environment = {
	language:LANGUAGE.MARATHI,
	endPoint:'http://52.15.178.19:3002/netpar/' 
}
export const environment: Environment= PROD;