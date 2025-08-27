
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Bath, BedDouble, Building, Home, LandPlot } from 'lucide-react';
import React, { useState } from 'react';

const propertyTypes = [
  { value: 'all', label: 'Todos', icon: Home },
  { value: 'house', label: 'Casa', icon: Home },
  { value: 'apartment', label: 'Apart.', icon: Building },
  { value: 'lot', label: 'Terreno', icon: LandPlot },
];

const amenities = [
  { id: 'pool', label: 'Piscina' },
  { id: 'garage', label: 'Garagem' },
  { id: 'gym', label: 'Academia' },
  { id: 'balcony', label: 'Varanda' },
  { id: 'garden', label: 'Jardim' },
  { id: 'furnished', label: 'Mobiliado' },
];

interface PropertyFiltersProps {
  onApply: (filters: any) => void;
}

export function PropertyFilters({ onApply }: PropertyFiltersProps) {
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(1);

  const handleApply = () => {
    // In a real app, this would pass the selected filters
    onApply({ priceRange, beds, baths });
  };
  
  const NumberSelector = ({ value, setValue, icon: Icon, label }: { value: number, setValue: (v:number) => void, icon: React.ElementType, label: string }) => (
    <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium w-16">{label}</span>
        <div className="flex items-center gap-2">
             <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setValue(Math.max(1, value - 1))}>-</Button>
             <span className="text-lg font-bold w-6 text-center">{value}</span>
             <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setValue(value + 1)}>+</Button>
        </div>
    </div>
);


  return (
    <div className="flex flex-col space-y-6">
      <div>
        <Label className="text-base font-semibold font-headline">Tipo de Imóvel</Label>
        <RadioGroup defaultValue="all" className="grid grid-cols-4 gap-2 mt-2">
          {propertyTypes.map(({ value, label, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem value={value} id={`type-${value}`} className="peer sr-only" />
              <Label
                htmlFor={`type-${value}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icon className="mb-1 h-6 w-6" />
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold font-headline">Faixa de Preço</Label>
         <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}+</span>
        </div>
        <Slider
          defaultValue={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={10000}
          step={100}
          className="mt-2"
        />
      </div>

       <div className="space-y-4">
        <Label className="text-base font-semibold font-headline">Cômodos</Label>
        <NumberSelector value={beds} setValue={setBeds} icon={BedDouble} label="Quartos" />
        <NumberSelector value={baths} setValue={setBaths} icon={Bath} label="Banheiros" />
      </div>
      
       <div>
        <Label className="text-base font-semibold font-headline">Comodidades</Label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox id={`amenity-${amenity.id}`} />
              <Label htmlFor={`amenity-${amenity.id}`} className="font-normal">{amenity.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t">
        <Button variant="ghost">Limpar Filtros</Button>
        <Button onClick={handleApply}>Aplicar Filtros</Button>
      </div>
    </div>
  );
}
