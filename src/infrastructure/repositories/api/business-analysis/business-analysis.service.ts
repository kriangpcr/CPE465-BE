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
    try {
      const prompt = `
สร้าง Business Model Canvas สำหรับไอเดีย: ${data.idea}

ตอบเป็น JSON เท่านั้น
ห้ามใส่ markdown
ห้ามใส่ \`\`\`
ต้องเป็น JSON object ล้วน:

{
  "customer_segments": [],
  "value_propositions": [],
  "channels": [],
  "customer_relationships": [],
  "revenue_streams": [],
  "key_resources": [],
  "key_activities": [],
  "key_partners": [],
  "cost_structure": [],
  "feasibility_score": 0
}
`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
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
      return {
        statusCode: 500,
        data: null,
        message: 'Failed to generate business analysis',
        error: error?.message || error,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
