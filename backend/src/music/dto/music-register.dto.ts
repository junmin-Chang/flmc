export class MusicRegisterDto {
  title: string;
  image: string;
  songId: string;
  singer: string;
  playlist: {
    name: string;
    desc: string;
  };
}
