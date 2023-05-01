import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyC55rbCFzhrrH9aSyBG8uQyrqtYMw1ZsCY",
    authDomain: "makaanmilega.firebaseapp.com",
    databaseURL: "https://makaanmilega-default-rtdb.firebaseio.com",
    projectId: "makaanmilega",
    storageBucket: "makaanmilega.appspot.com",
    messagingSenderId: "635523184230",
    appId: "1:635523184230:web:177c5d27d3d16c3d639fa7"
  };

  const app = getApps.length>0? getApp():initializeApp(firebaseConfig)
  const firestore= getFirestore(app) 
  const storage= getStorage(app)

  export {app,firestore,storage}