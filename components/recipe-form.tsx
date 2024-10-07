'use client';

import pick from 'lodash/pick';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { createRecipeAction } from '@/app/create-recipe/actions';
import { updateRecipeAction } from '@/app/recipes/[id]/actions';

import { createClient } from '@/utils/supabase/client';

import { useToast } from '@/hooks/use-toast';

import {
  CreateRecipeFormParams,
  CreateRecipeParams,
  Recipe,
  UpdateRecipeFormParams,
  UpdateRecipeParams,
} from '@/types';
import { createRecipeFormSchema, updateRecipeFormSchema } from '@/schemas';

import { Input } from './ui/input';
import { ClearableImage } from './clearable-image';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ButtonLoading } from './loading-button';
import { ToastAction } from './ui/toast';

interface RecipeFormProps {
  recipe?: Recipe;
}

export const RecipeForm: FC<RecipeFormProps> = ({ recipe }) => {
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('error')) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: searchParams.get('error'),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 3000,
      });

      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete('error');

      router.replace(`${pathname}?${nextSearchParams}`, { scroll: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipe ? updateRecipeFormSchema : createRecipeFormSchema),
    defaultValues: recipe
      ? {
          ...pick(recipe, ['title', 'description', 'cook_time', 'image_url']),
          tags: recipe.tags.join(', '),
          ingredients: recipe.ingredients.join(', '),
          instructions: recipe.instructions.join('\n'),
          file: null,
        }
      : {
          title: '',
          description: '',
          file: null,
          tags: '',
          ingredients: '',
          cook_time: '',
          instructions: '',
          image_url: '',
        },
  });

  const onSubmit: SubmitHandler<CreateRecipeFormParams | UpdateRecipeFormParams> = async (data) => {
    const { file, ...rest } = data;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const fileName = `${file.name}-${Date.now()}`;

    try {
      setIsLoading(true);

      const { data: imageData, error: uploadError } = await supabase.storage
        .from('recipes')
        .upload(`${user?.id}/${fileName}`, file);

      if (uploadError) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: uploadError.message || 'There was a problem with file uploading.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          duration: 3000,
        });

        setIsLoading(false);

        return;
      }

      if (recipe) {
        await updateRecipeAction({ ...rest, image_url: imageData.fullPath } as UpdateRecipeParams);
      } else {
        await createRecipeAction({ ...rest, image_url: imageData.fullPath } as CreateRecipeParams);
      }

      reset(data);
    } catch (err: unknown) {
      await supabase.storage.from('recipes').remove([`${user?.id}/${fileName}`]);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: (err as Error).message || 'There was a problem with recipe creation.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-sm w-full">
      <h1 className="text-2xl font-semibold mb-4">{recipe ? 'Edit' : 'Create a New'} Recipe</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input {...register('title')} placeholder="Recipe Title" />

          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <ClearableImage
            src={recipe?.image_url}
            onImageChange={(file: any) => {
              reset({ ...watch(), file, image_url: file.name });
            }}
            onClear={() => reset({ ...watch(), file: null, image_url: '' })}
          />

          {errors.file && <p className="text-red-500">{errors.file.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <Textarea {...register('description')} placeholder="Description" />

          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <Textarea {...register('ingredients')} placeholder="Ingredients (comma separated)" />

          {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}
        </div>

        <div className="mb-4">
          <Textarea {...register('tags')} placeholder="Tags (comma separated)" />

          {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
        </div>

        <div className="mb-4">
          <Input {...register('cook_time')} placeholder="Cook Time" />

          {errors.cook_time && <p className="text-red-500">{errors.cook_time.message}</p>}
        </div>

        <div className="mb-4">
          <Textarea
            {...register('instructions')}
            placeholder="Instructions (new line for each step)"
          />

          {errors.instructions && <p className="text-red-500">{errors.instructions.message}</p>}
        </div>

        {isLoading ? (
          <ButtonLoading />
        ) : (
          <Button type="submit">{recipe ? 'Edit recipe' : 'Create recipe'}</Button>
        )}
      </form>
    </div>
  );
};
