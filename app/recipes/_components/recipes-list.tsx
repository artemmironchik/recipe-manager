'use client';

import { useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { ExtendedRecipe } from '@/types';
import { useRouter } from 'next/navigation';

interface RecipesListProps {
  recipes?: ExtendedRecipe[];
}

export const RecipesList: FC<RecipesListProps> = ({ recipes = [] }) => {
  const router = useRouter();

  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    router.refresh();
  };

  if (!recipes.length) {
    return (
      <div className="flex flex-col flex-1 gap-4 justify-center items-center">
        There are no recipes
        <Link href="/create-recipe">
          <Button>Create Recipe</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex gap-4">
        <Input value={search} onChange={handleSearchChange} placeholder="Search by title..." />

        <Button onClick={handleSearch} className="ml-2">
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="max-w-72 w-full">
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{recipe.title}</h2>

              <p className="text-sm text-gray-500 truncate">{recipe.description}</p>

              <p className="text-sm text-gray-600">By {recipe.userFullName}</p>

              <Link href={`/recipes/${recipe.id}`}>
                <Button className="mt-4">Read Recipe</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
