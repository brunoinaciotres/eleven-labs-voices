export default function useFormatLabels(value:string): string{
    if (!value) return '';
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, ' ') // Substituir caracteres especiais por espaço
      .trim()
      .replace(/\s+/g, ' ') // Substituir múltiplos espaços por um único espaço
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizar a primeira letra de cada palavra
}