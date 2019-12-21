import { MusicUploadType } from 'src/app/core/enums/musicUploadType.enum';

export class UploadMusicFormFileData {
    file: File;
}

export class UploadMusicFormData {
    selectedUploadType: MusicUploadType;
    name: string;
    fileUploadData: UploadMusicFormFileData;
}