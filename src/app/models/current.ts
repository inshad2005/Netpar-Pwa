export class Current {
	fromPageFlag:any;
	toOtpPageFlag:any;
    firstName:any;
    lastName:any;
    mobileNumber:any;
    newMobileNumber:any
    state:any
    district:any;
    block:any;
    incorrectMobileDetailCount=0;
    otp:any;
    constructor(public leadsFilter?: string) {
    }
}