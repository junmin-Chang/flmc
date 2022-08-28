import { ChangeEvent, useCallback, useState } from 'react'
import { useGetMusicByKeywordQuery } from './features/musicSlice'

function App() {
  const [keyword, setKeyword] = useState("")
  const { data, error, isLoading } = useGetMusicByKeywordQuery(keyword)
  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  },[keyword, setKeyword])

  return (
    <div className="App">
      <input value={keyword} onChange={onChangeKeyword}/>
      {isLoading && <p>Loading..</p>}
      {data && data.map((d: any, i: number) => (
        <div key={i}>
          <img src={d.album.images[2].url}/>
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  )
}

export default App
