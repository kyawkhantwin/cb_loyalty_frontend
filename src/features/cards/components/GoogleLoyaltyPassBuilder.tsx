'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { Button, Card, Chip, Input, Label, TextArea, TextField, Separator  } from '@heroui/react';
import {
   QrCode, RefreshCw

} from 'lucide-react';
import { useIssueCardMutation } from '../api/useIssueCardMutation';

type LoyaltyQrData = {
  t: string;
  cid: string;
  uid: string;
  member: { level: string; code: string };
  exp: string;
  sig?: string;
};

type GenerateResponse =
    | { ok: false; error: string }
    | {
  ok: true;
  tokenId: string;
  token: string;
  scanUrl: string;
  data: LoyaltyQrData;
  qrSvg: string | null;
};

type BuilderState = {
  issuerName: string;
  programName: string;
  cardTitle: string;
  cid: string;
  uid: string;
  memberLevel: string;
  memberCode: string;
  pointsBalance: string;
  exp: string;
  heroImageUrl: string;
  logoUrl: string;
  backgroundColor: string;
  foregroundColor: string;
  websiteUrl: string;
  supportEmail: string;
  terms: string;
};

function clampHexColor(value: string, fallback: string): string {
  const v = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;
  return fallback;
}

interface GoogleLoyaltyPassBuilderProps {
  platform?: string;
}

export function GoogleLoyaltyPassBuilder({ platform = 'Google' }: GoogleLoyaltyPassBuilderProps) {
  const router = useRouter();
  const issueMutation = useIssueCardMutation();
  const [state, setState] = React.useState<BuilderState>(() => ({
    issuerName: 'LoyaltyOS',
    programName: 'Loyalty Club',
    cardTitle: 'Loyalty Card',
    cid: '100001',
    uid: '88921',
    memberLevel: 'GOLD',
    memberCode: 'G',
    pointsBalance: '1250',
    exp: '20270423',
    heroImageUrl: '',
    logoUrl: '',
    backgroundColor: platform === 'Apple' ? '#000000' : platform === 'Samsung' ? '#060606' : '#0B1220',
    foregroundColor: '#FFFFFF',
    websiteUrl: 'https://example.com',
    supportEmail: 'support@example.com',
    terms: 'Points are non-transferable. Terms apply.',
  }));

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<GenerateResponse | null>(null);
  const [googleWalletLink, setGoogleWalletLink] = React.useState<string | null>(null);
  const [googleWalletQr, setGoogleWalletQr] = React.useState<string | null>(null);
  const [liveQrSvg, setLiveQrSvg] = React.useState<string | null>(null);

  const qrPayload: LoyaltyQrData = React.useMemo(
      () => ({
        t: 'LC',
        cid: state.cid,
        uid: state.uid,
        member: { level: state.memberLevel, code: state.memberCode },
        exp: state.exp,
      }),
      [state.cid, state.uid, state.memberLevel, state.memberCode, state.exp],
  );

  // Live QR Generation for preview
  useEffect(() => {
    const generateLiveQr = async () => {
      try {
        // We use a simplified version for the live preview (unsigned)
        const svg = await QRCode.toString(JSON.stringify(qrPayload), {
          type: 'svg',
          margin: 2,
          width: 256,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
        setLiveQrSvg(svg);
      } catch (err) {
        console.error('Live QR Gen Error:', err);
      }
    };
    generateLiveQr();
  }, [qrPayload]);

  async function onGenerateQr() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/qr/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: qrPayload }),
      });
      const json = (await res.json()) as GenerateResponse;
      setResult(json);

      if (json.ok) {
        issueMutation.mutate({
          memberId: state.uid,
          memberName: `Member ${state.uid}`, // Use the UID for better identification
          templateId: state.cid,
          platform: (platform === 'Apple' || platform === 'Samsung' || platform === 'Google' ? platform : 'Google') as any,
          balance: parseInt(state.pointsBalance),
        });

        // Automatically generate Google Wallet link if on Google platform
        if (platform === 'Google') {
           try {
             const gwRes = await fetch('/api/wallet/google-save-link', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                 issuerId: '3388000000022304918', // Demo Issuer ID
                 classId: state.cid,
                 objectId: `${state.cid}-${state.uid}`,
                 programName: state.programName,
                 issuerName: state.issuerName,
                 userName: `Member ${state.uid}`,
                 userId: state.uid,
                 points: state.pointsBalance,
                 tier: state.memberLevel,
                 barcodeValue: state.uid
               }),
             });
             const gwJson = await gwRes.json();
             if (gwJson.ok) {
               setGoogleWalletLink(gwJson.saveLink);
               setGoogleWalletQr(gwJson.qrSvg);

               setTimeout(() => {
                 if (window.confirm('Card issued successfully! Go to card index?')) {
                   router.push('/cards');
                 }
               }, 500);
             }
           } catch (gwErr) {
             console.error('Failed to auto-generate Google Wallet link', gwErr);
           }
        } else {
           setTimeout(() => {
             if (window.confirm('Card issued successfully! Go to card index?')) {
               router.push('/cards');
             }
           }, 500);
        }
      }
    } catch (err) {
      setResult({ ok: false, error: err instanceof Error ? err.message : 'Failed to generate' });
    } finally {
      setLoading(false);
    }
  }

  const success = result && result.ok ? result : null;
  const bg = clampHexColor(state.backgroundColor, '#0B1220');
  const fg = clampHexColor(state.foregroundColor, '#FFFFFF');

  return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8 max-w-[1600px] mx-auto">

        {/* FORM COLUMN */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">{platform} Pass Designer</h2>
              <p className="text-default-500 mt-1 text-sm">Configure your {platform} loyalty card payload and generate a test QR code.</p>
            </div>
            <Chip variant="primary" color="warning" size="sm" className="uppercase font-bold tracking-wider">
              Test Mode
            </Chip>
          </div>

          <Separator  className="opacity-50" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSection title="Card Details" description="Core identifying information.">
              <TextField value={state.issuerName} onChange={v => setState(s => ({ ...s, issuerName: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Issuer Name</Label>
                <Input placeholder="e.g. LoyaltyOS" />
              </TextField>
              <TextField value={state.programName} onChange={v => setState(s => ({ ...s, programName: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Program Name</Label>
                <Input placeholder="e.g. Loyalty Club" />
              </TextField>
              <TextField className="md:col-span-2" value={state.cardTitle} onChange={v => setState(s => ({ ...s, cardTitle: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Card Title</Label>
                <Input placeholder="e.g. VIP Member Card" />
              </TextField>
            </FormSection>

            <FormSection title="Member Account" description="Unique identifiers and balance.">
              <TextField value={state.cid} onChange={v => setState(s => ({ ...s, cid: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Company ID</Label>
                <Input />
              </TextField>
              <TextField value={state.uid} onChange={v => setState(s => ({ ...s, uid: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">User ID</Label>
                <Input />
              </TextField>
              <TextField value={state.memberLevel} onChange={v => setState(s => ({ ...s, memberLevel: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Tier Level</Label>
                <Input placeholder="e.g. GOLD" />
              </TextField>
              <TextField value={state.pointsBalance} onChange={v => setState(s => ({ ...s, pointsBalance: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Points Balance</Label>
                <Input type="number" />
              </TextField>
              <TextField value={state.memberCode} onChange={v => setState(s => ({ ...s, memberCode: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Tier Code</Label>
                <Input />
              </TextField>
              <TextField value={state.exp} onChange={v => setState(s => ({ ...s, exp: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Expiry Date</Label>
                <Input placeholder="YYYYMMDD" />
              </TextField>
            </FormSection>

            <FormSection title="Theming & Media" description="Visual assets and brand colors.">
              <TextField value={state.backgroundColor} onChange={v => setState(s => ({ ...s, backgroundColor: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Background Color</Label>
                <Input placeholder="#000000" />
              </TextField>
              <TextField value={state.foregroundColor} onChange={v => setState(s => ({ ...s, foregroundColor: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Text Color</Label>
                <Input placeholder="#FFFFFF" />
              </TextField>
              <TextField className="md:col-span-2" value={state.logoUrl} onChange={v => setState(s => ({ ...s, logoUrl: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Logo URL</Label>
                <Input placeholder="https://..." />
              </TextField>
              <TextField className="md:col-span-2" value={state.heroImageUrl} onChange={v => setState(s => ({ ...s, heroImageUrl: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Hero Image URL</Label>
                <Input placeholder="https://..." />
              </TextField>
            </FormSection>

            <FormSection title="Contact & Terms" description="Support and legal info.">
              <TextField value={state.websiteUrl} onChange={v => setState(s => ({ ...s, websiteUrl: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Website</Label>
                <Input placeholder="https://example.com" />
              </TextField>
              <TextField value={state.supportEmail} onChange={v => setState(s => ({ ...s, supportEmail: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Support Email</Label>
                <Input type="email" placeholder="support@example.com" />
              </TextField>
              <TextField className="md:col-span-2" value={state.terms} onChange={v => setState(s => ({ ...s, terms: v }))}>
                <Label className="text-xs font-bold uppercase mb-1 text-default-600">Terms & Conditions</Label>
                <TextArea placeholder="Enter terms here..." />
              </TextField>
            </FormSection>

            {platform === 'Google' && (
              <FormSection title="Google Wallet Integration" description="Automatic asset generation.">
                <div className="md:col-span-2 space-y-2">
                   <p className="text-xs text-default-500 italic">Google Wallet assets (Add to Wallet button and scannable QR) will be automatically generated and displayed in the results area once you click 'Issue & Save Card'.</p>
                </div>
              </FormSection>
            )}
          </div>

          {/* Action Area */}
          <Card className="bg-default-50 border border-default-200 shadow-none p-6 rounded-3xl">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Generate {platform} Pass</h3>
                <p className="text-sm text-default-500">Generates a cryptographically signed pass payload.</p>
              </div>
              <Button
                  variant="primary"
                  size="lg"
                  className="font-bold shadow-lg px-8 rounded-2xl gap-2 h-14"
                  onPress={onGenerateQr}
                  isDisabled={loading}
              >
                {loading ? (
                  <RefreshCw className="animate-spin" size={20} />
                ) : (
                  <>
                    <QrCode size={20} />
                    <span>Issue Card</span>
                  </>
                )}
              </Button>
            </div>

            {result && !success && (
                <div className="mt-4 p-4 rounded-xl bg-danger-50 text-danger text-sm font-medium">
                  Error: {(result as { ok: false; error: string }).error}
                </div>
            )}

            {success && (
                <div className="mt-6 space-y-2">
                  <Label className="text-[10px] font-black text-default-400 uppercase tracking-widest">Generated Scan URL</Label>
                  <div className="break-all font-mono text-xs bg-background border border-default-200 rounded-2xl p-4 shadow-inner">
                    {success.token}
                  </div>
                </div>
            )}

            {googleWalletLink && (
              <div className="mt-8 pt-8 border-t border-default-200 space-y-6">
                <div>
                  <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-default-400">Google Wallet Output</h4>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="space-y-4 shrink-0">
                      <a href={googleWalletLink} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 active:scale-95">
                        <img
                          src="https://developers.google.com/static/wallet/images/add-to-google-wallet-button.png"
                          alt="Add to Google Wallet"
                          className="h-12"
                        />
                      </a>
                      
                      {googleWalletQr && (
                        <div className="p-6 bg-white rounded-[2.5rem] border border-default-200 shadow-xl inline-flex flex-col items-center justify-center w-full max-w-[240px]">
                          <div 
                            className="w-full aspect-square flex items-center justify-center overflow-hidden [&>svg]:w-full [&>svg]:h-full [&>svg]:block" 
                            dangerouslySetInnerHTML={{ __html: googleWalletQr }} 
                          />
                          <div className="w-full h-px bg-default-100 my-4" />
                          <p className="text-[10px] text-center font-black text-default-600 uppercase tracking-[0.15em] leading-tight">
                            Scan to save<br/>on mobile
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 w-full space-y-6">
                       <div>
                         <Label className="text-[10px] font-black text-default-400 uppercase tracking-widest">Secure Save Link</Label>
                         <div className="break-all font-mono text-[10px] bg-background border border-default-200 rounded-xl p-3 shadow-inner mt-1">
                          {googleWalletLink}
                        </div>
                       </div>
                       
                       <div className="p-4 rounded-2xl bg-primary-50 border border-primary-100">
                         <p className="text-xs text-primary-700 leading-relaxed">
                           <strong>Developer Tip:</strong> This link contains a signed JWT. In production, ensure your Service Account has "Developer" or "Admin" access in the Google Pay & Wallet Console.
                         </p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* PREVIEW COLUMN */}
        <div className="lg:col-span-5 xl:col-span-4 relative">
          <div className="sticky top-28 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-px bg-default-200 flex-1" />
              <span className="text-[10px] font-black text-default-400 uppercase tracking-[0.2em]">{platform} Preview</span>
              <div className="h-px bg-default-200 flex-1" />
            </div>

            <div
                className="rounded-[40px] border border-default-200 shadow-2xl overflow-hidden transition-all duration-500 relative bg-white"
                style={{ backgroundColor: bg, color: fg }}
            >
              {/* Realism touch: Phone Notch */}
              <div className="h-7 w-full flex items-center justify-center pt-2">
                <div className="w-20 h-1.5 rounded-full bg-current opacity-10" />
              </div>

              {state.heroImageUrl ? (
                  <img src={state.heroImageUrl} alt="Hero" className="w-full h-44 object-cover mt-2" />
              ) : (
                  <div className="h-16" />
              )}

              <div className="p-8 space-y-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                      {state.logoUrl ? (
                          <img src={state.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                          <div className="text-sm font-bold opacity-80">{state.issuerName.slice(0, 2).toUpperCase()}</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs opacity-70 truncate font-bold uppercase tracking-wider">{state.issuerName}</div>
                      <div className="text-2xl font-black tracking-tight truncate leading-tight">{state.programName}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] opacity-60 uppercase tracking-widest mb-0.5">Tier</div>
                    <div className="font-black text-xl leading-none">{state.memberLevel}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                  <div>
                    <div className="text-[10px] opacity-60 uppercase tracking-widest mb-1.5 font-bold">Member ID</div>
                    <div className="font-bold text-xl leading-none tracking-tight">{state.uid}</div>
                  </div>
                  <div>
                    <div className="text-[10px] opacity-60 uppercase tracking-widest mb-1.5 font-bold">Points</div>
                    <div className="font-bold text-xl leading-none tracking-tight">{state.pointsBalance}</div>
                  </div>
                  <div>
                    <div className="text-[10px] opacity-60 uppercase tracking-widest mb-1.5 font-bold">Company</div>
                    <div className="font-medium text-sm">{state.cid}</div>
                  </div>
                  <div>
                    <div className="text-[10px] opacity-60 uppercase tracking-widest mb-1.5 font-bold">Expires</div>
                    <div className="font-medium text-sm">{state.exp}</div>
                  </div>
                </div>

                <div className="rounded-[32px] bg-white text-black p-6 flex flex-col items-center justify-center min-h-[220px] shadow-2xl">
                  {success?.qrSvg || liveQrSvg ? (
                      <div className="w-62 h-62" dangerouslySetInnerHTML={{ __html: success?.qrSvg || liveQrSvg || '' }} />
                  ) : (
                      <div className="flex flex-col items-center gap-4 opacity-30">
                        <QrCode size={48} strokeWidth={1.5} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-center leading-relaxed">
                      Generating...
                    </span>
                      </div>
                  )}
                </div>

                <div className="text-[11px] opacity-50 text-center pb-4 font-medium">
                  <div>{state.websiteUrl} • {state.supportEmail}</div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-default-400">Preview represents a standard {platform} loyalty pass layout.</p>
          </div>
        </div>
      </div>
  );
}

function FormSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
      <Card className="p-6 border border-default-200 shadow-none bg-background/50 rounded-[2.5rem] md:col-span-2">
        <div className="mb-6 px-1">
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <p className="text-xs text-default-500 font-medium">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {children}
        </div>
      </Card>
  );
}
