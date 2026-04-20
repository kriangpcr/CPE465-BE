import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  ApiResponse,
  BusinessIdeaDto,
  IBusinessAnalysisServiceApi,
} from '@domain/repositories/api/businessanalysis.interface';
import { GoogleGenAI } from '@google/genai';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { GEMINI_PROMPT } from './gemeni.prompt';

@Injectable()
export class BusinessAnalysisService implements IBusinessAnalysisServiceApi {
  private base_url = 'http://localhost:11434';
  private ai: GoogleGenAI;
  constructor(
    private readonly httpService: HttpService,
    private readonly environmentConfig: EnvironmentConfigService,
  ) {
    this.ai = new GoogleGenAI({
      apiKey: this.environmentConfig.getGeminiKey(),
    });
  }
  async business_analysis(data: BusinessIdeaDto): Promise<ApiResponse> {
    try {
      const options: AxiosRequestConfig = {
        url: `${this.base_url}api/generate`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await firstValueFrom(this.httpService.request(options));
      return response.data;
    } catch (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }
  }

  async gemini_analysis(data: BusinessIdeaDto): Promise<ApiResponse> {
    const ai_model = [
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-1.5-flash',
    ];
    const prompt = GEMINI_PROMPT(data);

    let lastError: any;

    for (const model of ai_model) {
      try {
        const response = await this.ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        });

        const rawText = response.text;

        const cleaned = rawText
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();

        const parsedData = JSON.parse(cleaned);


        return {
          statusCode: 200,
          data: parsedData,
          message: 'Business analysis generated successfully',
          error: null,
          timestamp: new Date().toISOString(),
        };
      } catch (error: any) {
        console.error(
          `[Gemini Error] model=${model} `,
          error?.message
        );
        lastError = error;
      }
    }

    return {
      statusCode: 500,
      data: null,
      message: 'Failed to generate business analysis (all models exhausted)',
      error: lastError?.message || lastError,
      timestamp: new Date().toISOString(),
    };
  }
}
