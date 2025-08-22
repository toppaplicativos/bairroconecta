"use client";

import React, { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import type { Business } from '@/lib/data';
import { Store, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface InteractiveMapProps {
    items: Business[];
}

export default function InteractiveMap({ items }: InteractiveMapProps) {
    const [selectedItem, setSelectedItem] = useState<Business | null>(null);

    const initialViewState = {
        longitude: -46.633308,
        latitude: -23.550520,
        zoom: 13,
    };
    
    return (
        <div className="absolute inset-0">
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ width: '100%', height: '100%' }}
            >
                <NavigationControl position="top-right" />
                {items.map((item) => (
                    <Marker
                        key={item.id}
                        longitude={item.longitude}
                        latitude={item.latitude}
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedItem(item);
                        }}
                    >
                        <button className="p-2 rounded-full bg-primary text-primary-foreground shadow-md">
                            {item.type === 'business' ? <Store size={20} /> : <Briefcase size={20} />}
                        </button>
                    </Marker>
                ))}

                {selectedItem && (
                    <Popup
                        longitude={selectedItem.longitude}
                        latitude={selectedItem.latitude}
                        onClose={() => setSelectedItem(null)}
                        closeOnClick={false}
                        anchor="bottom"
                        offset={40}
                    >
                        <div className="p-1">
                            <h3 className="font-bold text-md font-headline">{selectedItem.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedItem.category}</p>
                            <Link href={selectedItem.type === 'business' ? '/businesses' : '/services'} className="text-sm text-primary hover:underline mt-1 inline-block">
                                Ver mais
                            </Link>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
