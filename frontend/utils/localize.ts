export function localize<T extends object>(
  obj: T,
  keyPrefix: string,
  lang: string,
  fallbackLang = "en"
): string {
  const langKey = `${keyPrefix}_${lang}` as keyof T;
  const fallbackKey = `${keyPrefix}_${fallbackLang}` as keyof T;

  return (obj[langKey] as string) || (obj[fallbackKey] as string) || "";
}
