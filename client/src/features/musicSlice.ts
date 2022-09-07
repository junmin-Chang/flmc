import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MusicResponseDto } from '../typings/music'

export const musicApi = createApi({
    reducerPath: "musicApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://3000-junminchang-flmc-wt69i20jmeb.ws-us63.gitpod.io/" }),
    endpoints: (builder) => ({
        getMusicByKeyword: builder.query<MusicResponseDto[], string>({
            query: (keyword: string) => `/music/${encodeURI(encodeURIComponent(keyword))}`
        })
    })
})


export const { useGetMusicByKeywordQuery } = musicApi