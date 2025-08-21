"use client";

import React, { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import type { Business } from '@/lib/data';
import { Store, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface InteractiveMapProps {
    businesses: Business[];
}

export default function InteractiveMap({ businesses }: InteractiveMapProps) {
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

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
                {businesses.map((business) => (
                    <Marker
                        key={business.id}
                        longitude={business.longitude}
                        latitude={business.latitude}
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedBusiness(business);
                        }}
                    >
                        <button className="p-2 rounded-full bg-primary text-primary-foreground shadow-md">
                            {business.type === 'business' ? <Store size={20} /> : <Briefcase size={20} />}
                        </button>
                    </Marker>
                ))}

                {selectedBusiness && (
                    <Popup
                        longitude={selectedBusiness.longitude}
                        latitude={selectedBusiness.latitude}
                        onClose={() => setSelectedBusiness(null)}
                        closeOnClick={false}
                        anchor="bottom"
                        offset={40}
                    >
                        <div className="p-2">
                            <h3 className="font-bold text-md font-headline">{selectedBusiness.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedBusiness.category}</p>
                            <Link href="/businesses" className="text-sm text-primary hover:underline mt-2 inline-block">
                                Ver mais
                            </Link>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
