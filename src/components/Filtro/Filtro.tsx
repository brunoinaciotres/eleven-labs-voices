import { Select, Text, Group, Stack, Button, Container } from '@mantine/core';
import { useEffect, useState } from 'react';

type FilterOptions = {
    genders: string[];
    ages: string[];
    useCases: string[];
    accents: string[];
    categories: string[];
}

type FilterPropsList = {
    filterOptions: FilterOptions
    applyFilters: (obj: FilterOptions) => void
}

function Filtro({ filterOptions, applyFilters }: FilterPropsList) {
    const [genderValue, setGenderValue] = useState<string | null>(null)
    const [ageValue, setAgeValue] = useState<string | null>(null)
    const [useCaseValue, setUseCaseValue] = useState<string | null>(null)
    const [accentValue, setAccentValue] = useState<string | null>(null)
    const [categoryValue, setCategoryValue] = useState<string | null>(null)

    const clearFilters = () => {
        setGenderValue(null)
        setAgeValue(null)
        setUseCaseValue(null)
        setAccentValue(null)
        setCategoryValue(null)

    }

    useEffect(() => {
        const filterObj = {
            genders: [] as string[],
            ages: [] as string[],
            useCases: [] as string[],
            accents: [] as string[],
            categories:[] as string[]
        }

        if (genderValue && !filterObj.genders.includes(genderValue)) {
            filterObj.genders.push(genderValue)
        }
        if (useCaseValue && !filterObj.genders.includes(useCaseValue)) {
            filterObj.useCases.push(useCaseValue)
        }
        if (accentValue && !filterObj.genders.includes(accentValue)) {
            filterObj.accents.push(accentValue)
        }

        if (ageValue && !filterObj.genders.includes(ageValue)) {
            filterObj.ages.push(ageValue)
        }

        if (categoryValue && !filterObj.genders.includes(categoryValue)) {
            filterObj.categories.push(categoryValue)
        }

        applyFilters(filterObj)
    }, [genderValue, ageValue, useCaseValue, accentValue, categoryValue])


    return (
        <>
            <Container size="md">
                <Stack>
                    <Group justify='space-between' >
                        <Text mt="2rem" fw="600" m={0}>Filtre as vozes</Text>
                        <Button variant="outline" size="xs" onClick={clearFilters}>Limpar Filtros</Button>
                    </Group>

                    <Group justify='center'>
                        <Select
                            onChange={setGenderValue}
                            label="Gender"
                            placeholder="Filter by Gender"
                            data={filterOptions.genders}
                            clearable
                            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
                            variant="filled"
                            aria-label="Filtrar gênero"
                            w={150}
                            value={genderValue}
                        />
                        <Select
                            onChange={setUseCaseValue}
                            label="Use Case"
                            placeholder="Filter by Use Case"
                            data={filterOptions.useCases}
                            clearable
                            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
                            variant="filled"
                            aria-label="Filtrar Caso de Uso"
                            w={150}
                            value={useCaseValue}
                        />

                        <Select
                            onChange={setAccentValue}
                            label="Accent"
                            placeholder="Filter by Accent"
                            data={filterOptions.accents}
                            clearable
                            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
                            variant="filled"
                            aria-label="Filtrar Sotaque"
                            w={150}
                            value={accentValue}
                        />
                        <Select
                            onChange={setAgeValue}
                            label="Age"
                            placeholder="Filter by Age"
                            data={filterOptions.ages}
                            clearable
                            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
                            variant="filled"
                            aria-label="Filtrar Idade"
                            w={150}
                            value={ageValue}
                        />
                        <Select
                            onChange={setCategoryValue}
                            label="Category"
                            placeholder="Filter by Category"
                            data={filterOptions.categories}
                            clearable
                            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
                            variant="filled"
                            aria-label="Filtrar Categoria"
                            w={150}
                            value={categoryValue}
                        />
                    </Group>
                </Stack>
            </Container>
        </>
    );
}

export default Filtro;