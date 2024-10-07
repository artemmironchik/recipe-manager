'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { RoutePath } from '@/enums';
import { Profile, Recipe } from '@/types';

import { deleteRecipeAction } from '../actions';

interface RecipeInfoProps {
  recipe: Recipe & {
    profile: Profile;
    userFullName: string;
  };
  isPublic: boolean;
}

export const RecipeInfo: FC<RecipeInfoProps> = ({ recipe, isPublic = false }) => (
  <>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">{recipe.title}</h1>

      {!isPublic && (
        <div className="flex gap-4">
          <Link href={`${RoutePath.Recipes}/${recipe.id}`}>
            <Button>Edit Recipe</Button>
          </Link>

          <Button variant="secondary" onClick={() => deleteRecipeAction({ id: recipe.id })}>
            Delete Recipe
          </Button>
        </div>
      )}
    </div>

    <div className="mb-6 w-full h-64 relative">
      <Image src={recipe.image_url} alt={recipe.title} fill className="object-cover rounded-lg" />
    </div>

    <p className="text-gray-600 mb-2">By {recipe.userFullName}</p>

    <div className="mb-4">
      <span className="font-semibold">Tags: </span>

      {recipe.tags.map((tag: string, index) => (
        <span key={tag} className="badge">
          #{tag}
          {index !== recipe.tags.length - 1 ? ', ' : ''}
        </span>
      ))}
    </div>

    <div className="mb-6">
      <h2 className="font-semibold mb-2">Description:</h2>

      <p>{recipe.description}</p>
    </div>

    <div className="mb-6">
      <h2 className="font-semibold mb-2">Ingredients:</h2>

      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>- {ingredient}</li>
        ))}
      </ul>
    </div>

    {recipe.cook_time && (
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Cook Time:</h2>

        <p>{recipe.cook_time}</p>
      </div>
    )}

    <div className="mb-6">
      <h2 className="font-semibold mb-2">Instructions:</h2>

      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={instruction}>
            {index + 1}. {instruction}
          </li>
        ))}
      </ol>
    </div>
  </>
);
