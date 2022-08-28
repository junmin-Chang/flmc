import { ChangeEvent, useCallback, useState } from 'react'
import { useGetMusicByKeywordQuery } from './features/musicSlice'
import useDebounce from './hooks/useDebounce'

function App() {
  const [value, setValue] = useState("")
  const keyword = useDebounce(value, 500) 
  const { data, error, isLoading } = useGetMusicByKeywordQuery(keyword, {
    skip: value.trim().length === 0
  })
  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  },[value, setValue])

  return (
    <div className="App">
      <input value={value} onChange={onChangeKeyword}/>
      {isLoading && <p>Loading..</p>}
      {data && data.map((d: any, i: number) => (
        <div key={i}>
          <img src={d.album.images[2].url}/>
          <p>{d.name}</p>
          <p>{d.artists.map((a: any, i: number) => a.name)}</p>
        </div>
      ))}
    </div>
  )
}

export default App
