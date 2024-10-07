'use client';

import { FC, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

import { RecipeQuery } from '@/types';

interface RecipesFiltersProps {
  searchParams: RecipeQuery;
  ingredients?: Record<string, number>;
  tags?: Record<string, number>;
}

export const RecipesFilters: FC<RecipesFiltersProps> = ({
  searchParams,
  ingredients = {},
  tags = {},
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    searchParams.ing?.split(',') || [],
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(searchParams.tag?.split(',') || []);

  const router = useRouter();
  const pathname = usePathname();
  const urlParams = useSearchParams();

  const handleIngredientChange = (ingredient: string) => {
    const nextSearchParams = new URLSearchParams(urlParams.toString());

    const newIngredients = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter((item) => item !== ingredient)
      : [...selectedIngredients, ingredient];

    setSelectedIngredients(newIngredients);

    if (newIngredients.length) {
      nextSearchParams.set('ing', `${newIngredients.join(',')}`);
    } else {
      nextSearchParams.delete('ing');
    }

    router.replace(`${pathname}?${nextSearchParams}`, { scroll: false });
  };

  const handleTagChange = (tag: string) => {
    const nextSearchParams = new URLSearchParams(urlParams.toString());

    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((item) => item !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);

    if (newTags.length) {
      nextSearchParams.set('tag', `${newTags.join(',')}`);
    } else {
      nextSearchParams.delete('tag');
    }

    router.replace(`${pathname}?${nextSearchParams}`, { scroll: false });
  };

  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <Accordion type="multiple">
        <AccordionItem value="ingredients">
          <AccordionTrigger>Ingredients</AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2 max-h-60 overflow-y-scroll">
            {Object.values(ingredients).length ? (
              Object.entries(ingredients).map(([ingredient, count]: [string, number]) => (
                <div key={ingredient} className="flex items-center gap-2">
                  <Checkbox
                    id={ingredient}
                    checked={selectedIngredients.includes(ingredient)}
                    onCheckedChange={() => handleIngredientChange(ingredient)}
                  />

                  <label
                    htmlFor={ingredient}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ingredient} ({count})
                  </label>
                </div>
              ))
            ) : (
              <p className="text-center">Nothing here yet</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags">
          <AccordionTrigger>Tags</AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2 max-h-60 overflow-y-scroll">
            {Object.values(tags).length ? (
              Object.entries(tags).map(([tag, count]: [string, number]) => (
                <div key={tag} className="flex items-center gap-2">
                  <Checkbox
                    id={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleTagChange(tag)}
                  />

                  <label
                    htmlFor={tag}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tag} ({count})
                  </label>
                </div>
              ))
            ) : (
              <p className="text-center">Nothing here yet</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
