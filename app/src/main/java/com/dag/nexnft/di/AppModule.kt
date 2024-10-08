package com.dag.nexnft.di


import com.dag.nexnft.BuildConfig
import com.dag.nexnft.base.DataStoreImpl
import com.dag.nexnft.retrofit.ApiServiceImpl
import com.dag.nexnft.retrofit.ApiSource
import com.google.ai.client.generativeai.GenerativeModel
import com.google.ai.client.generativeai.type.BlockThreshold
import com.google.ai.client.generativeai.type.HarmCategory
import com.google.ai.client.generativeai.type.SafetySetting
import com.google.ai.client.generativeai.type.generationConfig
import okhttp3.OkHttpClient
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


val appModule = module {
    single<Retrofit> {
        val httpClient = OkHttpClient.Builder()
            .build()
        Retrofit.Builder()
            .baseUrl("")
            .addConverterFactory(GsonConverterFactory.create())
            .client(httpClient)
            .build()
    }
    single<ApiSource>  {
        ApiServiceImpl(get(Retrofit::class))
    }
    single<DataStoreImpl> {
        DataStoreImpl(context = get())
    }
    single<GenerativeModel> {
        GenerativeModel(
            modelName = "gemini-1.5-flash-001",
            apiKey = BuildConfig.apiKey,
            generationConfig = generationConfig {
                temperature = 0.15f
                topK = 32
                topP = 1f
                maxOutputTokens = 4096
            },
            safetySettings = listOf(
                SafetySetting(HarmCategory.HARASSMENT, BlockThreshold.MEDIUM_AND_ABOVE),
                SafetySetting(HarmCategory.HATE_SPEECH, BlockThreshold.MEDIUM_AND_ABOVE),
                SafetySetting(HarmCategory.SEXUALLY_EXPLICIT, BlockThreshold.MEDIUM_AND_ABOVE),
                SafetySetting(HarmCategory.DANGEROUS_CONTENT, BlockThreshold.MEDIUM_AND_ABOVE),
            )
        )
    }
}
