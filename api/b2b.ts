// Vercel Function que recibe el form B2B y lo reenvía por email a b2b@trivux.cl.
// Vercel detecta automáticamente cualquier archivo en /api/ a nivel raíz del
// proyecto y lo expone como /api/<nombre>. No requiere adaptador en Astro.

// Variables de entorno necesarias (configurar en Vercel):
//   RESEND_API_KEY  -> API key de https://resend.com
//   B2B_TO_EMAIL    -> destinatario (default: b2b@trivux.cl si no se setea)

type Payload = {
  empresa?: string;
  nombre?: string;
  email?: string;
  mensaje?: string;
  tipo?: string;
  // Honeypot: si los bots lo rellenan, abortamos sin enviar.
  _gotcha?: string;
};

const ALLOWED_TIPOS = new Set(['promotor', 'marca', 'ticketera', 'otro']);

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderHtml(data: Required<Pick<Payload, 'empresa' | 'nombre' | 'email' | 'mensaje'>> & { tipo: string }): string {
  const message = esc(data.mensaje).replace(/\n/g, '<br>');
  return `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0D0D0F;color:#F4F4F5;padding:24px;border-radius:12px">
  <div style="display:inline-block;background:#27272A;color:#A78BFA;border-radius:999px;padding:4px 10px;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:12px">B2B · ${esc(data.tipo)}</div>
  <h2 style="margin:0 0 16px;font-size:18px">Nuevo contacto comercial</h2>
  <table style="font-size:12px;border-collapse:collapse;margin-bottom:16px">
    <tr><td style="color:#A1A1AA;padding:4px 8px 4px 0">Empresa</td><td style="color:#F4F4F5">${esc(data.empresa)}</td></tr>
    <tr><td style="color:#A1A1AA;padding:4px 8px 4px 0">Contacto</td><td style="color:#F4F4F5">${esc(data.nombre)}</td></tr>
    <tr><td style="color:#A1A1AA;padding:4px 8px 4px 0">Email</td><td><a href="mailto:${esc(data.email)}" style="color:#A78BFA">${esc(data.email)}</a></td></tr>
  </table>
  <div style="background:#18181B;border-radius:8px;padding:16px;border:1px solid #27272A">
    <p style="margin:0;color:#E4E4E7;font-size:14px;line-height:1.5">${message}</p>
  </div>
</div>`;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method Not Allowed' }, 405);
  }

  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  // Honeypot: bot tirando spam.
  if (data._gotcha) return json({ ok: true }, 200);

  const empresa = (data.empresa ?? '').trim();
  const nombre  = (data.nombre  ?? '').trim();
  const email   = (data.email   ?? '').trim();
  const mensaje = (data.mensaje ?? '').trim();
  const tipo    = (data.tipo    ?? 'otro').trim();

  if (!empresa || !nombre || !email || !mensaje) {
    return json({ error: 'Faltan campos obligatorios' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Email inválido' }, 400);
  }
  if (mensaje.length < 20 || mensaje.length > 4000) {
    return json({ error: 'El mensaje debe tener entre 20 y 4000 caracteres' }, 400);
  }
  if (!ALLOWED_TIPOS.has(tipo)) {
    return json({ error: 'Tipo inválido' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.B2B_TO_EMAIL || 'b2b@trivux.cl';
  if (!apiKey) {
    return json({ error: 'Email service no configurado' }, 500);
  }

  const subject = `[B2B][${tipo.toUpperCase()}] ${empresa}`;
  const html = renderHtml({ empresa, nombre, email, mensaje, tipo });

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Trivux B2B <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend error:', res.status, detail);
      return json({ error: 'No se pudo enviar' }, 502);
    }
  } catch (err) {
    console.error('Resend fetch failed:', err);
    return json({ error: 'No se pudo enviar' }, 500);
  }

  return json({ ok: true }, 200);
}
