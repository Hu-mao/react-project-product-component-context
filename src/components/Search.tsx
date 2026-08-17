import {useSearchParams} from "react-router";

const Search = () => {
    const [searchParams, setSearchParams] =  useSearchParams()
    setSearchParams(searchParams)
    if(!searchParams){
        return <h1>Search list is empty <button onClick={()=>{setSearchParams({title:"furniture"})}}>Change</button></h1>
    }
    return <div>Search list {searchParams.get("title")}</div>
}
export default Search;