'use client';

import { FC, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface RecipesFiltersProps {
  ingredients?: Record<string, number>;
  tags?: Record<string, number>;
}

export const RecipesFilters: FC<RecipesFiltersProps> = ({ ingredients = {}, tags = {} }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) return prev.filter((item) => item !== ingredient);

      return [...prev, ingredient];
    });
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((item) => item !== tag);

      return [...prev, tag];
    });
  };

  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <Accordion type="multiple">
        <AccordionItem value="ingredients">
          <AccordionTrigger>Ingredients</AccordionTrigger>

          <AccordionContent className="max-h-60 overflow-y-scroll">
            {Object.values(ingredients).length ? (
              Object.entries(ingredients).map(([ingredient, count]: [string, number]) => (
                <div key={ingredient} className="flex items-center justify-between">
                  <Checkbox
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => handleIngredientChange(ingredient)}
                  />

                  <span>
                    {ingredient} ({count})
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center">Nothing here yet</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags">
          <AccordionTrigger>Tags</AccordionTrigger>

          <AccordionContent className="max-h-60 overflow-y-scroll">
            {Object.values(tags).length ? (
              Object.entries(tags).map(([tag, count]: [string, number]) => (
                <div key={tag} className="flex items-center justify-between">
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  <span>
                    {tag} ({count})
                  </span>
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
