import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AfsService } from './afs.service';
import { ElementId } from '../collections/element';
import { UserModel } from '../collections/user.model';
import { RoleValidator } from '../helpers/roleValidator';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends RoleValidator{
  //private url: string = 'urlApi';
  //private apiKey: string = 'apiKey';
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI';
  credentialEmail : any;
  public userToken: string = '';
  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private afsService : AfsService
  ) {
  super();
  }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }
  async sendVerificationEmail(){
   return (await this.afAuth.currentUser)?.sendEmailVerification();
  }
  recoveryPassword(emailAddress: string) {
    return this.afAuth.sendPasswordResetEmail(emailAddress);
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    this.logOut();
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
      this.getUserProfile(result.user['uid'], result)
    
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  getUserProfile(userId: string, result: any){
    //let query = (ref:QueryFn<firebase.default.firestore.DocumentData>) => ref.where('name', '==', 'recargas');
   var doc = this.afsService.doc$(`users/${ userId }`).subscribe(res=>{
     var resp:ElementId = res as ElementId;
    if(resp === undefined){
     // console.log("updating register")
      this.updateUserData(result.user);
    }
  },err=>{console.log("error: "+err);})
  }

  async login(userData: UserModel): Promise<any> {
    try {
      const d = await this.afAuth.signInWithEmailAndPassword(
        userData.email,
        userData.password!
      );
      this.credentialEmail = d.credential;
      
      /*if (userData.rememberme)
        this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      else this.afAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);*/
      return d.user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async newUser(userData: ElementId): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password!
      );
      console.log("send verification email: ", user.displayName);
      await this.sendVerificationEmail();
      const usernew = await this.isAuthenticated();
      console.log("is authenticated: ", usernew);
      if (usernew && user) {
        usernew.updateProfile({ displayName: userData.displayName });
        userData.uid = user.uid;
        userData.emailVerified = user.emailVerified;
        userData.refreshToken = user.refreshToken;
        console.log("send to firestore: ", JSON.stringify(userData));
        this.updateUserData(userData);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  logOut(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('displayName');
    localStorage.removeItem('email');
    this.userToken = '';
    return true;
  }
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<ElementId> = this.db.doc(
      `usuario/${user.uid}`
    );
    user.password = "";
    user.normalizedName = user.displayName.toLowerCase();
    user.photoURL = user.photoURL ? user.photoURL : 'assets/photo';
    user.refreshToken = user.refreshToken ? user.refreshToken : '';
    user.organization = user.email!.split('@')[1];
    user.type = user.email!.split('@')[1] === "upt.edu.mx" ? "interno":"user";
    user.url = `usuario/${user.uid}`;
  
    //console.log("storing: ", JSON.stringify(user));
    return userRef.set(user, { merge: true });
  }
}
