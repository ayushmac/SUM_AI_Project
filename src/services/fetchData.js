export const ArticleOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key':'67a666af64mshc02d7d4d8435145p1ca44bjsn778ea3f005e2',
		'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
	}
};



export const fetchData=async(url,options)=>{
    const response=await fetch(url,options);
    const data=await response.json();

    return data;
};