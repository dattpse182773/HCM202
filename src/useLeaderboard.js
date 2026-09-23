import{useCallback,useEffect,useState}from'react';import{firebaseReady,saveBestScore,watchLeaderboard}from'./firebase';
const pendingKey='hcm202-pending-score';
export default function useLeaderboard(){const[board,setBoard]=useState([]),[status,setStatus]=useState(firebaseReady?'connecting':'offline'),[error,setError]=useState(firebaseReady?'':'Firebase chưa được cấu hình. Tiến độ vẫn lưu trên thiết bị.');
 useEffect(()=>watchLeaderboard(data=>{setBoard(data);setStatus('online');setError('')},e=>{setStatus('offline');setError(e.message||'Không thể kết nối bảng xếp hạng')}),[]);
 const saveScore=useCallback(async payload=>{localStorage.setItem(pendingKey,JSON.stringify(payload));setStatus('saving');try{const result=await saveBestScore(payload);localStorage.removeItem(pendingKey);setStatus('saved');setError('');return result}catch(e){setStatus('offline');setError('Chưa đồng bộ được. Kết quả đã lưu trên thiết bị.');throw e}},[]);
 const retryPending=useCallback(async()=>{const raw=localStorage.getItem(pendingKey);if(!raw)return false;await saveScore(JSON.parse(raw));return true},[saveScore]);
 return{board,status,error,saveScore,retryPending,hasPending:!!localStorage.getItem(pendingKey),firebaseReady}}

