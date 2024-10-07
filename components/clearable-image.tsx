import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

import { IconButton } from '@/components/icon-button';

interface ClearableImageProps {
  src?: string;
  onImageChange: (file: File) => void;
  onClear: () => void;
}

export const ClearableImage: React.FC<ClearableImageProps> = ({ src, onImageChange, onClear }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageSrc(URL.createObjectURL(file));

      onImageChange(file);
    }
  };

  return (
    <div className="relative">
      {imageSrc ? (
        <div className="relative w-full h-64">
          <div className="relative w-full h-full">
            <Image src={imageSrc} alt="Recipe image" fill className="object-cover rounded-lg" />
          </div>

          <IconButton
            icon={<Trash2 className="h-4 w-4" />}
            onClick={() => {
              setImageSrc('');

              onClear();
            }}
            className="absolute top-2 right-2"
          />
        </div>
      ) : (
        <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full" />
      )}
    </div>
  );
};
