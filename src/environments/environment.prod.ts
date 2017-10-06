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
	endPoint:'' 
}

export const PROD: Environment = {
	language:LANGUAGE.MARATHI,
	endPoint:'' 
}
export const environment: Environment= PROD;