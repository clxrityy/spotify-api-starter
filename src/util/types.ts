export interface SpotifyUserData {
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    href: string;
    id: string;
    images: Array<{
        height: number | null;
        url: string;
        width: number | null;
    }>;
    product: string;
    type: string;
    uri: string;
}

export interface SpotifyProfileTopData<T> {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: T[]
}

export interface SpotifyProfileTopArtistItem {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    genres: [];
    href: string;
    id: string;
    images: Array<{
        height: number | null;
        url: string;
        width: number | null;
    }>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface SpotifyProfileTopTrackItem {
    album: {
        album_type: string;
        artists: Array<{
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
        }>;
        available_markets: string[];
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        images: Array<{
            height: number | null;
            url: string;
            width: number | null;
        }>;
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
    };
    artists: Array<{
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }>;
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: {
        isrc?: string;
    };
    external_urls?: {
        spotify?: string;
    };
    href?: string;
    id?: string;
    is_local?: boolean;
    name?: string;
    popularity?: number;
    preview_url?: string | null; // Add this line
    track_number?: number; // Add this line
    type?: string; // Add this line
    uri?: string; // Add this line
}

export interface SpotifyArtistResponse {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: Array<{
        height: number | null;
        url: string;
        width: number | null;
    }>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

