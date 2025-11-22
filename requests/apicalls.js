import axios from "axios";

//export const serverUrl = 'https://twp2.onrender.com'
export const serverUrl = "http://localhost:3001";
// export const serverUrl = "http://192.168.43.225:3001";

export const fetchWebtoonDetails = async (ID) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!ID) return;

    setTimeout(() => {
      abortController.abort();
    }, 60000);

    try {
      const res = await axios.get(`${serverUrl}/twp/webtoon/${ID}`, { signal });
      return res.data;
    } catch (err) {
      console.error("Failed to fetch webtoon details:", err);
      return null;
    }
};

export const fetchWebtoons = async () => {
  axios.defaults.withCredentials = true
  const abortController = new AbortController();  
  const signal = abortController.signal;
  

    setTimeout(() => {
      abortController.abort();
    }, 60000);

  try{
    let res = await axios.get(`${serverUrl}/twp/webtoon/fetchtoons`, { signal })
    return res.data
  }
  catch(err){
    console.error(err) 
    return null
  }
}

export const commentApi = async ({seriesId, userId, username, comment}) => {
  axios.defaults.withCredentials = true

  try {
    let res = await axios.post(`${serverUrl}/twp/webtoon/comment`, {
      seriesId,
      userId,
      username,
      comment
    })
    if(res.data.E) throw new Error(res.data.E);
    
    return res.data
  } catch (error) {
    console.log(error);
  }

}

export const likeWebtoon = async (toonid) =>{
  axios.defaults.withCredentials = true
  try {
    await axios.put(`${serverUrl}/twp/webtoon/like/${toonid}`)
  } catch (err) {
    console.log(err.message);
  }
}
