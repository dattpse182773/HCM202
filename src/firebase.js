import{initializeApp}from'firebase/app';
import{getAuth,signInAnonymously}from'firebase/auth';
import{collection,doc,getDoc,getFirestore,limit,onSnapshot,orderBy,query,serverTimestamp,setDoc}from'firebase/firestore';

const config={apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID,storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID};
export const firebaseReady=Object.values(config).every(Boolean);
let auth,db;
if(firebaseReady){const app=initializeApp(config);auth=getAuth(app);db=getFirestore(app)}

async function user(){if(!firebaseReady)throw new Error('Firebase chưa được cấu hình');return auth.currentUser||(await signInAnonymously(auth)).user}
export function watchLeaderboard(onData,onError){if(!firebaseReady){onError?.(new Error('Firebase chưa được cấu hình'));return()=>{}}const q=query(collection(db,'leaderboard'),orderBy('totalScore','desc'),limit(10));return onSnapshot(q,s=>onData(s.docs.map(d=>({id:d.id,...d.data(),date:d.data().updatedAt?.toDate?.().toLocaleDateString('vi-VN')||'Vừa xong'}))),onError)}
export async function saveBestScore(input){const u=await user(),ref=doc(db,'leaderboard',u.uid),old=await getDoc(ref);if(old.exists()&&old.data().totalScore>=input.totalScore)return{kept:true};const common={uid:u.uid,playerName:input.playerName.trim(),quizScore:input.quizScore,bambooScore:input.bambooScore,totalScore:input.totalScore,completedAt:serverTimestamp(),updatedAt:serverTimestamp(),gameVersion:1};await setDoc(ref,old.exists()?{...common,createdAt:old.data().createdAt}:{...common,createdAt:serverTimestamp()});return{kept:false}}
