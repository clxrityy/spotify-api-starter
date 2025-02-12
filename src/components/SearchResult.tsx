
import { SpotifyArtistResponse, SpotifyProfileTopTrackItem } from "../util/types";
import { ImageComponent } from "./ui/ImageComponent";


export function SearchArtistResult({ data }: { data: SpotifyArtistResponse }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <ImageComponent
                    image={{
                        src: data.images[0].url || "",
                        alt: data.name,
                        className: "rounded-full",
                        width: 128,
                        height: 128,
                    }}

                />
                <div className="flex flex-col gap-1 justify-end w-full">
                    <h2 className="text-lg font-semibold">{data.name}</h2>
                    <p className="text-sm text-gray-300">{data.followers.total} followers</p>
                </div>
            </div>
            <div className="flex gap-2">
                {data.genres.map((genre, index) => (
                    <span key={index} className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs">
                        {genre}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function SearchTrackResult({ data }: {data: SpotifyProfileTopTrackItem}) {
    return (
        <div className="flex items-center gap-4">
            <ImageComponent
                image={{
                    src: data.album.images[0].url || "",
                    alt: data.name || "",
                    className: "rounded-full",
                    width: 128,
                    height: 128,
                }}
            />
            <div className="flex flex-col gap-1 justify-end w-full">
                <h2 className="text-lg font-semibold">{data.name}</h2>
                <p className="text-sm text-gray-300">{data.artists.map(artist => artist.name).join(", ")}</p>
            </div>
        </div>
    );
}