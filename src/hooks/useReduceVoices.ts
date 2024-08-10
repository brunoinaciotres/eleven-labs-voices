import useFormatLabels from "./useFormatLabels"

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


export default function useReduceVoices(voices: Voice[]): FilterOptions {

    const options = voices.reduce((optionsObj, voice) => {

        const { gender, accent, use_case, age } = voice.labels

        const normalizedGender = useFormatLabels(gender)
        const normalizedAccent = useFormatLabels(accent)
        const normalizedUseCase = useFormatLabels(use_case)
        const normalizedAge = useFormatLabels(age)
        const normalizedCategory = useFormatLabels(voice.category)


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