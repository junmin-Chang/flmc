import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const musicApi = createApi({
    reducerPath: "musicApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://3000-junminchang-flmc-wt69i20jmeb.ws-us63.gitpod.io/" }),
    endpoints: (builder) => ({
        getMusicByKeyword: builder.query({
            query: (keyword: string) => `/music/${encodeURI(encodeURIComponent(keyword))}`
        })
    })
})


export const { useGetMusicByKeywordQuery } = musicApi