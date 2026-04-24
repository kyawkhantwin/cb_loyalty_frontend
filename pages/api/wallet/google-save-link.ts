import type { NextApiRequest, NextApiResponse } from 'next';
import { generateGoogleWalletSaveLink, GoogleWalletPassData } from '@/lib/wallet/google-wallet-utils';
import QRCode from 'qrcode';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const data = req.body as GoogleWalletPassData;

    // Simple validation
    if (!data.issuerId || !data.classId || !data.objectId) {
      return res.status(400).json({ ok: false, error: 'Missing required Google Wallet fields' });
    }

    const saveLink = await generateGoogleWalletSaveLink(data);

    let qrSvg: string | null = null;
    try {
      qrSvg = await QRCode.toString(saveLink, {
        type: 'svg',
        margin: 2,
        width: 200,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    } catch (err) {
      console.error('QR Generation Error:', err);
    }

    return res.status(200).json({
      ok: true,
      saveLink,
      qrSvg
    });
  } catch (err) {
    console.error('Error generating Google Wallet link:', err);
    return res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : 'Internal Server Error'
    });
  }
}
