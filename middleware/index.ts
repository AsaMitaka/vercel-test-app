import { html } from 'hono/html';

export default function checkCountryMiddleware(c: any) {
  const incomingCountryCode = c.req.header('x-vercel-ip-country') || 'UA';
  const blockedCountriesCodes = ['US', 'RU', 'BG', 'CN'];

  if (blockedCountriesCodes.includes(incomingCountryCode.toUpperCase())) {
    return c.html(
      html`<!DOCTYPE html>
        <h1>Hello! You are from ${incomingCountryCode}! Access is blocked for your country.</h1>`,
    );
  }

  c.next(); // Продолжаем обработку запроса
}
