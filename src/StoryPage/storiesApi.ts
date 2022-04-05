import { Story } from "./Components";

export  const fetchStoryIds = async (storyListType: String) :Promise<Array<number>> => {
    try {
        const response: Response =  await fetch(`https://hacker-news.firebaseio.com/v0/${storyListType}.json?print=pretty`, {});
        return response.json();
    } catch(error) {
        return [];
    }
};   

export  const fetchStoryItems = async (data: Array<number>) => {
    let res:Array<Story> = [];
    res = await Promise.all(data.map((item: any) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
            .then(response =>  response.json())
            .catch(error => []);
    }));
    return res;
};   

  