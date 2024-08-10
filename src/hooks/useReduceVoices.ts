type Voice = {
    voice_id: string
    category: string
    labels: Record<string, string>
}

type FilterOptions = {
    genders: string[];
    ages: string[];
    useCases: string[];
    accents: string[];
    categories: string[];
}

const normalizeValue = (value: string): string => {
    if (!value) return '';
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, ' ') // Substituir caracteres especiais por espaço
        .trim()
        .replace(/\s+/g, ' ') // Substituir múltiplos espaços por um único espaço
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizar a primeira letra de cada palavra
}

export default function useReduceVoices(voices: Voice[]): FilterOptions {

    const options = voices.reduce((optionsObj, voice) => {

        const { gender, accent, use_case, age } = voice.labels

        const normalizedGender = normalizeValue(gender)
        const normalizedAccent = normalizeValue(accent)
        const normalizedUseCase = normalizeValue(use_case)
        const normalizedAge = normalizeValue(age)
        const normalizedCategory = normalizeValue(voice.category)


        if (normalizedGender && !optionsObj.genders.includes(normalizedGender)) {
            optionsObj.genders.push(normalizedGender)
        }

        if (normalizedAccent && !optionsObj.accents.includes(normalizedAccent)) {
            optionsObj.accents.push(normalizedAccent)
        }

        if (normalizedUseCase && !optionsObj.useCases.includes(normalizedUseCase)) {
            optionsObj.useCases.push(normalizedUseCase)
        }

        if (normalizedAge && !optionsObj.ages.includes(normalizedAge)) {
            optionsObj.ages.push(normalizedAge)
        }

        if (normalizedCategory&& !optionsObj.categories.includes(normalizedCategory)) {
            optionsObj.categories.push(normalizedCategory)
        }

        return optionsObj


    }, {
        genders: [] as string[],
        ages: [] as string[],
        useCases: [] as string[],
        accents: [] as string[],
        categories: [] as string[]
    })


    return options
}