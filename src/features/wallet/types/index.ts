export type WalletPlatform = 'Apple' | 'Google' | 'Samsung';

export interface WalletTemplate {
  id: string;
  name: string;
  platform: WalletPlatform;
  backgroundColor: string;
  foregroundColor: string;
  labelColor?: string;
  logoUrl?: string;
  description: string;
  status: 'Published' | 'Draft' | 'Archived';
  lastUpdated: string;
}

export interface WalletTemplateResponse {
  data: WalletTemplate[];
  total: number;
}
