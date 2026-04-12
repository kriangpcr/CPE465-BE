export interface BusinessIdeaDto {
  businessName: string;
  IdeaDetail: string;
  budget: number;
  location: string;
  targetAudience: string;
  salesChannel: string;
}

export interface ApiResponse<T = any> {
  statusCode: number;
  data: T | null;
  message: string;
  error: any;
  timestamp: string;
}

export abstract class IBusinessAnalysisServiceApi {
  abstract business_analysis(data: BusinessIdeaDto): Promise<ApiResponse>;
  abstract gemini_analysis(data: BusinessIdeaDto): Promise<ApiResponse>;
}
  