export interface WebAppInterface {
     addHomeoMedicine(medicines: string): any;
     approveGS(isApproved: boolean, email: string):any;
     createNewProfile(profile:string): any;
     deleteProduct(item: any): any;
     getAllRegistrations(): any;
     getAllQueries():any;
     getHomeoMedicines(): any;
     getProducts(isAllProducts: boolean): any;
     getUserProfile(userName: string):any;
     guestLogin():any;
     login(userName: string, password:string): any;
     saveProduct(product:string): any;
     saveQuery(query:string): any;
     saveResponse(key: string, res:string):any;
     showToast(toast:string): any;
     signOut(): any;
     signInWithGoogle(): any;
     updateProfile(profile:string): any;
     verifyLogin(): any;
}