import React, { useState, useEffect, useRef } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/Article";

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
  const [sample, setSample] = useState([]);

  // const getArticle=async()=>{
  //   const url = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${article.url}`; //article url coming from input tag
  //   const data = await fetchData(url, ArticleOptions);

  //   setSample(data.summary);

  // }

  const getArticles = async () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer gn5qdZjjzRNWqnjHwju0APOaOoUVrCKu",
      },
      body: JSON.stringify({ sourceType: "URL", source: article.url }),
    };

    console.log(article.url);

    const response = await fetch(
      "https://api.ai21.com/studio/v1/summarize",
      options
    );

    try {
      if (response.ok) {
        const data = await response.json();
        // Update the state of the article with the fetched summary
        setArticle({ summary: data.summary });
        return data; // Return the data if needed
      } else {
        // Handle the case where the response is not okay (e.g., an error response)
        console.error("Error:", response.statusText);
        return null; // Return null or handle the error as needed
      }
    } catch (error) {
      console.error("Error:", error);
      return null; // Return null or handle the error as needed
    }
  };

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

    //const { data } = await getSummary({ articleUrl: article.url });
    const data = await getArticles();

    if (data) {
      console.log("Yes");
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

  //handle copy of article summary
  const textToCopy = article.summary; // Replace with the actual text you want to copy
  const divRef = useRef(null);

  const handleCopyClick = () => {
    // Create a range object
    const range = document.createRange();
    range.selectNode(divRef.current);

    // Select the text inside the div
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Clean up the selection
    window.getSelection().removeAllRanges();

    // Optionally, show a message indicating that the text has been copied
    alert("Text copied to clipboard");
  };

  //handle sharing on different social media platforms

  return (
    <section className="main-container">
      {/* Search */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="search-container">
            <div>
              <i class="fa-solid fa-link"></i>
            </div>
            <input
              type="url"
              placeholder="Enter an URL"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent the default form submission
                  getArticle(); // Call your submit function here
                }
              }}
              required
              className="search-bar"
            />
            <button type="submit" className="submit-btn">
              ↵
            </button>
          </div>
        </form>

        {/* History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)} // Looping through the history
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied == item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font- text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="result-container">
        <p>{sample}</p>
      </div>

      {isFetching ? (
        <div className="loader-container">
          <img
            src={loader}
            alt="loading..."
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
        </div>
      ) : error ? ( //If error then print this below text
        <p
          style={{
            fontFamily: "Ubuntu",
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          Error, please try again later!!!!
          <br />
          <span
            style={{ fontFamily: "Ubuntu", fontWeight: "bold", color: "#777" }}
          >
            {error?.data?.error}
          </span>
        </p>
      ) : (
        article.summary && (
          <div className="result-container">
            <h2
              style={{
                fontFamily: "Ubuntu",
                fontWeight: "bold",
                color: "#666",
                fontSize: "1.5rem",
              }}
            >
              Article<span className="article-span">Summary</span>
            </h2>
            <div
              style={{
                borderWidth: "1px",
                borderColor: "#ccc",
                borderStyle: "solid",
                textAlign: "justify",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              <p className="article-summary-text">
                <div ref={divRef}>{article.summary}</div>{" "}
                <button className="article-copy-btn" onClick={handleCopyClick}>
                  <i class="fa-regular fa-copy"></i>
                </button>
              </p>
            </div>
          </div>
        )
      )}
      {/* </div> */}
    </section>
  );
};
export default Demo;
