import { Asset } from "expo-asset";
import { File, Paths } from "expo-file-system";
import Realm from "realm";
import { realmSchema } from "../models/schema";

export class RealmService {
  private static instance: Realm | null = null;
  private static initPromise: Promise<Realm> | null = null;

  static async getRealm(): Promise<Realm> {
    if (this.instance && !this.instance.isClosed) {
      return this.instance;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      try {
        const realmFile = new File(Paths.document, "quran.realm");

        if (!realmFile.exists) {
          const asset = Asset.fromModule(require("../../assets/quran.realm"));
          await asset.downloadAsync();

          if (!asset.localUri) {
            throw new Error("Bundled Realm asset not found or failed to load");
          }

          new File(asset.localUri).copy(realmFile);
        }

        const realmPath = realmFile.uri.replace(/^file:\/\//, "");

        this.instance = await Realm.open({
          path: realmPath,
          schema: realmSchema,
          readOnly: false,
          schemaVersion: 0,
        });

        return this.instance;
      } catch (error) {
        this.initPromise = null;
        throw error;
      }
    })();

    return this.initPromise;
  }
}
