import { kv } from '@vercel/kv';

/**
 * Kullanıcının (IP adresine göre) mevcut sorgu sayısını alır.
 * @param userKey - Kullanıcı IP adresi
 * @returns Mevcut sorgu sayısı
 */
export async function getQueryCount(userKey: string): Promise<number> {
  const currentCount = await kv.get(userKey);
  return currentCount ? parseInt(currentCount as string, 10) : 0;
}

/**
 * Kullanıcının (IP adresine göre) sorgu sayısını belirli bir TTL (Time-To-Live) süresi ile ayarlar.
 * @param userKey - Kullanıcı IP adresi
 * @param count - Yeni sorgu sayısı
 * @param ttl - Zaman aşımı süresi (saniye cinsinden)
 */
export async function setQueryCountWithTTL(userKey: string, count: number, ttl: number): Promise<void> {
  await kv.set(userKey, count, { ex: ttl });
}
