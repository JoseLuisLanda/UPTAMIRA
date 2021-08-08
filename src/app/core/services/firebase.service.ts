import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ElementId } from '../collections/element';
import { AfsService } from './afs.service';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private itemsCollection!: AngularFirestoreCollection<any>;
  items!: Observable<any[]>;
  //private url = 'https://publicastv-a67df.firebaseio.com/';
  //private CARPETA_FILES = 'file';
  private newElements: any[] = [];
  public elementsId: any[] = [];
  private elementsString = '';

  constructor(private http: HttpClient, private db: AngularFirestore, private afsService : AfsService) {}

  public getDoc(collection: string, uid: string) {
    // with ref = (collection,ref => ref.where('uid', '==', uid))
    // this.db.collection<any>(collection).snapshotChanges().pipe(map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return {id, data};
    //   });
    // })).subscribe();
    return this.db
      .collection(collection)
      .doc(uid)
      .valueChanges()
      .pipe(
        map((v: any) => {
          return { ...v, id: uid };
        })
      );
  }
  public updateDoc(collection: string, uid: string, data: any) {
    // with ref = (collection,ref => ref.where('uid', '==', uid))
    this.db
      .collection(collection)
      .doc(uid)
      .set(data)
      .then(() => {
        //console.log('Document successfully updated!');
      })
      .catch(function (error) {
        //console.error('Error writing document: ', error);
      });
  }

  public getCollection(nameCollection: string, count: number = 10, keySearch:string = "", keyValue:string = "", collection:string = "",value:string = "") {
    if(collection !== "" && value !== "")
    {
      this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
      ref.where(collection, 'array-contains',value));//.orderBy("dateCreated"));
     
    }else if(keySearch !=="" && keyValue !== ""){
      //console.log("CALLING WHERE: "+collection + value)
      this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
      ref.where(keySearch, '==',keyValue));//.orderBy("dateCreated"));
    }else{
      let selectedGroup: ElementId = localStorage.getItem("selectedGroup") !== null ? 
               JSON.parse(localStorage.getItem("selectedGroup")) as ElementId:{id:"pFQpd2um0j84ZSEu84n1"} as ElementId;
      let userId:string = localStorage.getItem("userId") !== null ? localStorage.getItem("userId"):"";
      let groupId: string = selectedGroup.id !== undefined && selectedGroup.id !== null ? selectedGroup.id:"";

      
      if(nameCollection.includes("chats",0))
      {
        this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
        ref.limit(count).orderBy("dateCreated"));
        console.log("GETTING CHATS: "+nameCollection+" id user: "+userId+" groupId: "+groupId);
      }else if(nameCollection === "aviso" || nameCollection === "curso" || nameCollection === "evento" ){
        let datenow = Date.UTC.toString();
        let dateFromFire = this.afsService.getTimeStamp();
        this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
        ref.limit(count).orderBy("dateCreated"));
      }
      else{
        this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
        nameCollection ==="grupo" ? ref.limit(count).where("users", 'array-contains',userId):
        ref.limit(count).where("group", '==',groupId));//.orderBy("dateCreated"));
        console.log("GETTING GROUP COLLECTION: "+nameCollection+" id user: "+userId+" groupId: "+groupId);
      }
   
    }
    
    this.elementsString = '';
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    //console.log('getting collection: ', nameCollection);
    return this.items;
  }

  public guardarFile(file: any, ruta: string) {
    this.db.collection(`/${ruta}`).add(file);
    this.getCollection(file);
  }
}
