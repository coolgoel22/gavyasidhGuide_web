import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebAppInterface } from '../model/android.interface';
import { Subject } from 'rxjs/Subject';
import { Utility } from './utility.service';

@Injectable()
export class DataService {
  // private _updateDisease: Subject<string> = new Subject<string>();
  private _toggled: Subject<boolean> = new Subject<boolean>();
  private gavySidhsProfile: any = {};
  profiles: Observable<any>;
  updateProfileObservable: Observable<any>;
  createNewProfileObservable: Observable<any>;
  saveNewProductObservable: Observable<any>;
  allProductsObservable: Observable<any>;
  homeoMedicineObservable: Observable<any>;
  private _allHomeoMedicineReceived: Subject<any> = new Subject<any>();
  private verifyLoginObservable: Observable<any>;
  private allRegistrationsObservable: Observable<any>;
  private allQueriesObservable: Observable<any>;

  constructor() { }
  
  getAllItemsObservable(){
    this.profiles = new Observable(observe => {
      _gs.observe = observe;
      this.allProfileObserveCB("");
    });
    return this.profiles;
  }
  allProfileObserveCB(res:string){
    _gs.observe.next(res);
    this.saveProfiles(res);
  }
  getUserProfiles(email: string){
    _gs.afterAllProfilesRecieved(this.allProfileObserveCB.bind(this));
    Android.getUserProfile(email);
  }

  saveProfiles(res: any){
    this.gavySidhsProfile = Object.assign(this.gavySidhsProfile, Utility.getGSProfileObj(res));
  }
  getUserProfile(email:string): any{
    let userProfile = this.gavySidhsProfile[email];
    if( userProfile != null){
      return userProfile;
    }else{
      this.getUserProfiles(email);
      return null;
    }
  }

  // Backend intergration for update profile...
  // This is to get data of loggedin user profile....
  getUpdateProfileObservable(){
    this.updateProfileObservable = new Observable(observe =>{
      _gs.updateProfileObserve = observe;
      this.updateProfileObserveCallBack("");
    });
    return this.updateProfileObservable;
  }
  updateProfileObserveCallBack(res){
    _gs.updateProfileObserve.next(res);
  }
  updateProfile(profile:string){
    Android.updateProfile(profile);
    _gs.afterProfileUpdated(this.updateProfileObserveCallBack.bind(this));
  }

  // This is to get data resof loggedin user profile....
  getCreateNewProfileObservable(){
    this.createNewProfileObservable = new Observable(observe =>{
      _gs.createNewProfileObserve = observe;
      // So that on registration page load same response will not pass to the observable.
      _gs.createNewProfileRes = "";
      this.createNewProfileObserveCallBack();
    });
    return this.createNewProfileObservable;
  }
  createNewProfileObserveCallBack(){
    _gs.createNewProfileObserve.next(_gs.createNewProfileRes);
  }
  createNewProfile(profile:string){
    Android.createNewProfile(profile);
    _gs.afterNewProfileCreated(this.createNewProfileObserveCallBack.bind(this));
  }
  
  saveProduct(product:string){
    Android.saveProduct(product);
  }
  
  deleteProduct(item: any){
    Android.deleteProduct(item);
  }

  getAllProductsObservable(){
    this.allProductsObservable = new Observable(observe=>{
      _gs.getAllProductsObserve = observe;
      this.getAllProductsObserveCallBack("");
    });
    return this.allProductsObservable;
  }
  getAllProductsObserveCallBack(res:string){
    _gs.allProductsResponse=res;
    _gs.getAllProductsObserve.next(res);
  }
  getProducts(isAllProducts: boolean){
    Android.getProducts(isAllProducts);
    _gs.afterAllProductsRecieved(this.getAllProductsObserveCallBack.bind(this));
  }

  addHomeoMedicine(medicines: string){
    Android.addHomeoMedicine(medicines);
  }


  getAllQueriesObservable(){
    this.allQueriesObservable = new Observable(observe=>{
      _gs.getAllQueriesObserve = observe;
      this.getAllQueriesCB("");
    });
    return this.allQueriesObservable;
  }
  getAllQueriesCB(res: string){
    _gs.getAllQueriesObserve.next(res);
  }
  getAllQueries(){
    Android.getAllQueries();
    _gs.afterAllQueriesResponse(this.getAllQueriesCB.bind(this));
  }

  getDiseaseToAddMed(){
    return new Promise((resolve, reject)=>{
      if(_gs.diseaseName === ""){
        reject("No disease found");
      }else{
        resolve(_gs.diseaseName);
      }
    });

  }

  addMedInDisease(diseaseName: string){
    _gs.diseaseName = diseaseName;
  }

  get allHomeoMedicineObservable():Observable<any>{
    return this._allHomeoMedicineReceived.asObservable();
  }
  getHomeoMedicineObserveCallBack(res:any){
    this._allHomeoMedicineReceived.next(res);
  }
  getHomeoMedicines(){
    Android.getHomeoMedicines();
    _gs.afterHomeoMedicineReceived(this.getHomeoMedicineObserveCallBack.bind(this));
  }


  getVerifyLoginObservable(){
    this.verifyLoginObservable = new Observable(observe=>{
      _gs.verifyLoginObserve = observe;
      this.loginVerifiedCB(_gs.loginVerifiedCBRes);
    });
    return this.verifyLoginObservable;
  }
  loginVerifiedCB(res){
    _gs.loginVerifiedCBRes = res;
    _gs.verifyLoginObserve.next(res);
  }
  verifyLogin(){
    _gs.afterLoginVerified(this.loginVerifiedCB.bind(this));
    Android.verifyLogin();
  }


  getAllRegistrationsObservable(){
    this.allRegistrationsObservable = new Observable(observe=>{
      _gs.getAllRegistrationsObserve = observe;
      this.getAllRegistrationsCB("");
    });
    return this.allRegistrationsObservable;
  }
  getAllRegistrationsCB(res){
    _gs.getAllRegistrationsObserve.next(res);
  }  
  getAllRegistrations(){
    _gs.afterAllRegistrationReceived(this.getAllRegistrationsCB.bind(this));
    Android.getAllRegistrations();
  }

  
  

  approveGS(isApproved: boolean, email: string){
    Android.approveGS(isApproved, email);
  }
  saveQuery(query: string){
    Android.saveQuery(query);
  }
  saveResponse(key:string, res:string){
    Android.saveResponse(key, res);
  }
  guestLogin(){
    Android.guestLogin();
  }

  signOut(){
    this.loginVerifiedCB("");
    Android.signOut();

  }

  get loaderState(): Observable<boolean> {
    return this._toggled.asObservable();
  }

  showLoader(){
    this._toggled.next(true);
  }
  hideLoader(){
    this._toggled.next(false);
  }
  showToast(msg){
    Android.showToast(msg);
  }
}


// Call back functions from android...
declare var Android: WebAppInterface;
// declare var timer: any;

declare global{
  function implementProfile(profile: any): any;
  function gotUserProfile(profile: any): any;
  function profileUpdated(res: any): any;
  function newProfileCreated(res:any): any;
  function allProductsReceived(res:any): any;
  function homeoMedicinesReceived(res:any): any;
  function loginVerifiedRes(res:any): any;
  function allRegistrationsRes(res:any):any;
  function myProductsReceived(res: any): any;
  function allQueriesRes(res:any): any;
}
const _gs = window as any;

_gs.timer = null;

_gs.afterAllProfilesRecieved = function(callBack){
  _gs.implementProfile = function(profile: any): any {
    callBack(profile);
  }
}

_gs.afterUserProfileReceived = function(callBack){
  _gs.gotUserProfile = function(profile: any): any{
    callBack(profile);
  }
}


_gs.afterProfileUpdated = function(callBack){
  // For response of update profile call.....
  _gs.profileUpdated = function(res:any):any{
    callBack(res);
  }
}

_gs.afterNewProfileCreated = function(callBack){
  // For response of Create new profile call.....
  _gs.newProfileCreated = function(res:any):any{
    _gs.createNewProfileRes = res;
    callBack();
  }
}


_gs.afterAllProductsRecieved = function(callBack){
  // For response of Create new profile call.....
  _gs.allProductsReceived = function(res:any):any{
    callBack(res);
  }
}

_gs.afterHomeoMedicineReceived = function(callBack){
  _gs.homeoMedicinesReceived = function(res:any):any{
    callBack(res);
  }
}

_gs.afterLoginVerified = function(callBack){
  _gs.loginVerifiedRes = function(res:any):any {
    callBack(res);
  }
  _gs.logginFailed = function(message:string):any{
    callBack(message);
  }
}

_gs.afterAllRegistrationReceived = function(callBack){
  _gs.allRegistrationsRes = function(res:any):any {
    callBack(res);
  }
}

_gs.afterAllQueriesResponse = function(callBack){
  _gs.allQueriesRes = function(res:any):any{
    callBack(res);
  }
}