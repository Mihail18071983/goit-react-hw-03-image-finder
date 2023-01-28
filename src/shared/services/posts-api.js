import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/api/",
    
    params: {
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal', 
        key : '30821762-b8f2171742f26b4a3279c46a9',
    }
})

export const fetchImages = async(q, _page = 1)=> {
    const {data} = await instance.get("/", {
        params: {
            q,
            _page,
        }
    });
    return data;
}

export const fetchAllImg = async()=> {
    const {data} = await instance.get("/");
    return data;
}