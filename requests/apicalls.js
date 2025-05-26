import axios from "axios";

export const serverUrl = 'https://twp2.onrender.com'

export const fetchWebtoonDetails = async (ID) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!ID) return;

    setTimeout(() => {
      abortController.abort();
    }, 60000);

    try {
      const res = await axios.get(`https://twp2.onrender.com/twp/webtoon/${ID}`, { signal });
      // const res = await axios.get(`http://localhost:3001/twp/webtoon/${ID}`, { signal });
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
    let res = await axios.get("https://twp2.onrender.com/twp/webtoon/fetchtoons", { signal })
    // let res = await axios.get("http://localhost:3001/twp/webtoon/fetchtoons", { signal })
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
    let res = await axios.post('https://twp2.onrender.com/twp/webtoon/comment', {
      // let res = await axios.post('http://localhost:3001/twp/webtoon/comment', {
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