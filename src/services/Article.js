import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY_AI = import.meta.env.API_KEY_AI;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.ai21.com/studio/v1/summarize',
        prepareHeaders: (headers) => {
            headers.set('Authorization',API_KEY_AI);
            headers.set('Content-Type', 'application/json');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            // encodeURIComponent() function encodes special characters that may be present in the parameter values
            // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    }),
})

export const { useLazyGetSummaryQuery } = articleApi