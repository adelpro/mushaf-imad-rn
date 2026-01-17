import Realm from 'realm';
import { realmSchema } from '../models/schema';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export class RealmService {
  private static instance: Realm | null = null;

  static async getRealm(): Promise<Realm> {
    if (this.instance && !this.instance.isClosed) {
      return this.instance;
    }

    const realmPath = `${FileSystem.documentDirectory}quran.realm`;
    
    // Check if the file already exists in document directory
    const fileInfo = await FileSystem.getInfoAsync(realmPath);
    
    if (!fileInfo.exists) {
      console.log('Copying bundled Realm file...');
      const asset = Asset.fromModule(require('../../assets/quran.realm'));
      
      // Ensure asset is downloaded (if remote) or accessible
      await asset.downloadAsync();
      
      if (!asset.localUri) {
        throw new Error('Bundled Realm asset not found or failed to load');
      }
      
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: realmPath,
      });
      console.log('Realm file copied successfully.');
    }

    this.instance = await Realm.open({
      path: realmPath,
      schema: realmSchema,
      readOnly: false, // We treat it as read-write but we won't write to it mostly
      schemaVersion: 0, // Assuming 0
    });

    return this.instance;
  }
}
