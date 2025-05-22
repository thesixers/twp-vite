import axios from "axios";



export const fetchWebtoonDetails = async (ID) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!ID) return;

    setTimeout(() => {
      abortController.abort();
    }, 10000);

    try {
      const res = await axios.get(`http://127.0.0.1:3001/twp/webtoon/${ID}`, { signal });
      return res.data;
    } catch (err) {
      console.error("Failed to fetch webtoon details:", err);
      return null;
    }
};

export const fetchWebtoons = async () => {
  const abortController = new AbortController();
  const signal = abortController.signal;

    setTimeout(() => {
      abortController.abort();
    }, 10000);

  try{
    let res = await axios.get('http://127.0.0.1:3001/twp/webtoon/fetchtoons', { signal })
    return res.data
  }
  catch(err){
    console.error(err)
    return null
  }
}