"use client"
import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
type Props = {
    location: {
        lat: number
        lng: number
    }
}
export default function Map({ location }: Props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });

    const [center, setCenter] = useState(useMemo(() => (location), []));

    useEffect(() => {
        setCenter(location)
    }, [location]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="w-96 h-96 grid">
            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
                <Marker position={center} />
            </GoogleMap>
        </div>
    );
}

// function Map() {

//     return (
//         <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//             <Marker position={center} />
//         </GoogleMap>
//     );
// }