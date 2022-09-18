export interface AddMusicDto {
  songId: string;
  title: string;
  image: string;
  singer: string;
  playlistId?: string;
}

export interface MusicSearchResponseDto {
  album: {
    images: {
      height: number;
      url: string;
      width: number;
    }[];
  };
  name: string;
  artists: {
    name: string;
  }[];
  id: string;
}

export interface ProfileMusicResponseDto {
  title: string;
  image: string;
  id: string;
  singer: string;
  playlist: {
    name: string;
    desc: string;
  };
}
