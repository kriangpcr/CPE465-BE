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
      const ai_model = [
        'gemini-3.1-flash-lite-preview',
        'gemini-2.5-flash-lite',
      ];
      const prompt = `
คุณคือผู้เชี่ยวชาญด้าน Business Strategy, Food Industry Consultant และ Startup Advisor ที่มีประสบการณ์ในตลาดประเทศไทย

วิเคราะห์ไอเดียธุรกิจอาหารต่อไปนี้อย่างลึกซึ้ง รอบด้าน และสมจริง:
"${data.idea}"

ให้ความสำคัญกับปัจจัยต่อไปนี้ในการวิเคราะห์:
- พฤติกรรมผู้บริโภคไทย (Consumer Behavior)
- Gold Standard Mental ของผู้บริโภคด้านอาหาร เช่น ความสะอาด ความปลอดภัย ความคุ้มค่า รสชาติ ความน่าเชื่อถือของแบรนด์
- บริบททางสังคม (Social Trends) เช่น สังคมเมือง ผู้สูงอายุ เด็ก วัยทำงาน
- บริบททางวัฒนธรรมไทย เช่น รสนิยมอาหาร การกินเป็นครอบครัว เทศกาล ความเชื่อ
- การแข่งขันในตลาดอาหารไทย
- ความเป็นไปได้ด้านต้นทุนและกำไรจริง
- กฎหมายที่เกี่ยวข้อง เช่น อย., มาตรฐานอาหาร, ภาษี, ใบอนุญาตร้านอาหาร
- Supply Chain และแหล่งวัตถุดิบในประเทศไทย
- ความเสี่ยงด้านภาพลักษณ์และความปลอดภัยอาหาร

คุณต้องสร้างผลลัพธ์ตามโครงสร้าง JSON ด้านล่างนี้เท่านั้น

เงื่อนไขสำคัญ:
- ตอบเป็น JSON object เท่านั้น
- ห้ามใส่ markdown
- ห้ามใส่ ห้ามใส่ \`\`\`
- ห้ามอธิบาย
- ห้ามมีข้อความก่อนหรือหลัง JSON
- ต้องเป็น JSON ที่สามารถใช้ JSON.parse() ได้ทันที
- score ต้องเป็นตัวเลข 0-100 (ห้ามเป็น string และห้ามสุ่ม)
- score ต้องประเมินจากความเป็นไปได้จริงของโมเดลธุรกิจอาหารในประเทศไทย
- ทุก field ต้องมีข้อมูลอย่างน้อย 2 รายการ
- ต้องวิเคราะห์ตามบริบทตลาดประเทศไทยเท่านั้น

รูปแบบ JSON ที่ต้องตอบ:

{
  "score": number,
  "canvas": {
    "keyPartners": string[],
    "keyActivities": string[],
    "keyResources": string[],
    "valuePropositions": string[],
    "customerRelationships": string[],
    "channels": string[],
    "customerSegments": string[],
    "costStructure": string[],
    "revenueStreams": string[]
  },
  "strategies": string[]
}

Business Model Canvas ต้องมีเหตุผล สมจริง สอดคล้องกันทุกส่วน และสะท้อนความเป็นธุรกิจอาหารในบริบทประเทศไทยอย่างแท้จริง
strategies ต้องเป็นกลยุทธ์เชิงปฏิบัติที่ทำได้จริง 3 ข้อ โดยคำนึงถึงกฎหมาย มาตรฐานอาหาร และพฤติกรรมผู้บริโภคไทย
`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
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
