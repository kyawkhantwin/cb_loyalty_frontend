import { GoogleAuth } from 'google-auth-library';
import { sign } from 'jsonwebtoken';

export interface GoogleWalletPassData {
  issuerId: string;
  classId: string;
  objectId: string;
  programName: string;
  issuerName: string;
  userName: string;
  userId: string;
  points: string;
  tier: string;
  barcodeValue: string;
}

/**
 * Generates a "Save to Google Wallet" link for a loyalty pass.
 * This implementation follows the Google Wallet API JWT requirements.
 */
export async function generateGoogleWalletSaveLink(data: GoogleWalletPassData): Promise<string> {
  const {
    issuerId,
    classId,
    objectId,
    programName,
    issuerName,
    userName,
    userId,
    points,
    tier,
    barcodeValue
  } = data;

  // Environment variables for Google Wallet API
  const serviceAccountEmail = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!serviceAccountEmail || !privateKey) {
    // In demo/development mode without keys, we return a mock link for UI testing
    console.warn('Google Wallet credentials missing. Returning demo link.');
    const demoPayload = Buffer.from(JSON.stringify(data)).toString('base64');
    return `https://pay.google.com/gp/v/save/demo_${demoPayload}`;
  }

  const payload = {
    iss: serviceAccountEmail,
    aud: 'google',
    typ: 'savetowallet',
    iat: Math.floor(Date.now() / 1000),
    payload: {
      loyaltyClasses: [
        {
          id: `${issuerId}.${classId}`,
          issuerName,
          programName,
          reviewStatus: 'UNDER_REVIEW', // Typical for new classes in demo
        }
      ],
      loyaltyObjects: [
        {
          id: `${issuerId}.${objectId}`,
          classId: `${issuerId}.${classId}`,
          state: 'ACTIVE',
          barcode: {
            type: 'QR_CODE',
            value: barcodeValue,
          },
          accountId: userId,
          accountName: userName,
          loyaltyPoints: {
            label: 'Points',
            balance: {
              string: points
            }
          },
          secondaryFields: [
            {
              id: 'tier',
              label: 'TIER',
              value: tier
            }
          ]
        }
      ]
    }
  };

  const token = sign(payload, privateKey, { algorithm: 'RS256' });
  return `https://pay.google.com/gp/v/save/${token}`;
}
