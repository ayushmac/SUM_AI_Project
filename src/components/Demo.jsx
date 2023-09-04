import React, { useState, useEffect } from "react";
import { fetchData, ArticleOptions } from "../services/fetchData";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from '../services/Article';

const Demo = () => {

  
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  
  //Created a useState{sample,setSample} to feed data from api 
  const [sample,setSample]=useState([]);  
  const getArticle=async()=>{
    const url = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${article.url}`; //article url coming from input tag
    const data = await fetchData(url, ArticleOptions);
    
    setSample(data.summary);
    
    
  }
  

  // Load data from localStorage on mount
  useEffect(() => {
    

    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };
  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-items-center' onSubmit={handleSubmit}>
          <div className='relative w-full flex items-center'>
            <img 
              src={linkIcon}
              alt='link-Icon'
              className='link-img'
             
            />
            <input 
                    type='url'
                    placeholder='Enter an URL'
                    value={article.url}
                    onChange={(e) => setArticle({ ...article, url: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent the default form submission
                        getArticle(); // Call your submit function here
                      }
                    }}
                    required
  className='url_input pl-10 peer'
/>
            <button
              type='submit'
              className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
            >
              ↵
            </button>
          </div>
        </form>

        {/* History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)} // Looping through the history
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src= {copied ==item.url?tick:copy}
                  alt= 'copy_icon'
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font- text-blue-700 font-medium text-sm truncate'>
              
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div style={{ marginTop: '10px', maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3' }}>
        <h2 style={{ fontFamily: 'Ubuntu', fontWeight: 'bold', color: '#666', fontSize: '1.5rem' }}>
          Article<span style={{ color: '#0077FF' }}>Summary</span>
        </h2>
        <div style={{ borderWidth: '1px', borderColor: '#ccc', borderStyle: 'solid', padding: '10px' }}>
          <p>{sample}</p>
        </div>
      </div>
  {isFetching ? ( //IF fetch display loader
    <img src={loader} alt="loading" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
  ) : error ? ( //If error then print this below text
    <p style={{ fontFamily: 'Ubuntu', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
      Error, please try again later!!!!
      <br />
      <span style={{ fontFamily: 'Ubuntu', fontWeight: 'bold',  color: '#777' }}>
        {error?.data?.error}
      </span>
    </p>
  ) : (
    article.summary && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3' }}>
        <h2 style={{ fontFamily: 'Ubuntu', fontWeight: 'bold', color: '#666', fontSize: '1.5rem' }}>
          Article<span style={{ color: '#0077FF' }}>&lt;Summary&gt;</span>
        </h2>
        <div style={{ borderWidth: '1px', borderColor: '#ccc', borderStyle: 'solid', padding: '10px' }}>
          <p>{article.summary}</p>
        </div>
      </div>
    )
  )}
</div>
</section>
);
    }
export default Demo;
 

