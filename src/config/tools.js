import {
  QrCode,
  Link as LinkIcon,
  StickyNote,
  Globe2,
  Network,
  Code2,
  ShieldCheck,
  ScanLine,
  Siren,
  Mail,
} from 'lucide-react';

export const tools = [
  { path: '/', labelKey: 'home', descKey: 'home_desc', icon: ScanLine },
  { path: '/qr', labelKey: 'qr', descKey: 'qr_desc', icon: QrCode },
  { path: '/vietqr', labelKey: 'vietqr', descKey: 'vietqr_desc', icon: ScanLine },
  { path: '/links', labelKey: 'links', descKey: 'links_desc', icon: LinkIcon },
  { path: '/notes', labelKey: 'notes', descKey: 'notes_desc', icon: StickyNote },
  { path: '/whois', labelKey: 'whois', descKey: 'whois_desc', icon: Globe2 },
  { path: '/ip', labelKey: 'ip', descKey: 'ip_desc', icon: Network },
  { path: '/dns', labelKey: 'dns', descKey: 'dns_desc', icon: Globe2 },
  { path: '/http', labelKey: 'http', descKey: 'http_desc', icon: Network },
  { path: '/crypto', labelKey: 'crypto', descKey: 'crypto_desc', icon: ShieldCheck },
  { path: '/data', labelKey: 'data', descKey: 'data_desc', icon: Code2 },
  { path: '/cron', labelKey: 'cron', descKey: 'cron_desc', icon: Code2 },
  { path: '/uuid', labelKey: 'uuid', descKey: 'uuid_desc', icon: Code2 },
  { path: '/tools', labelKey: 'encode', descKey: 'encode_desc', icon: Code2 },
  { path: '/2fa', labelKey: 'twofa', descKey: 'twofa_desc', icon: ShieldCheck },
  { path: '/ua', labelKey: 'ua', descKey: 'ua_desc', icon: Siren },
  { path: '/proxy', labelKey: 'proxy', descKey: 'proxy_desc', icon: Network },
  { path: '/temp-mail', labelKey: 'tempmail', descKey: 'tempmail_desc', icon: Mail },
];

export const donateItem = { path: '/donate', labelKey: 'donate', icon: ScanLine };


