export interface IFormFields {
	name: string;
	age: number;
	country: string;
	gender: 'male' | 'female';
	email: string;
	phone: string;
	comment: string;
}

export interface IOption {
	value: string;
	label: string;
}