import { useEffect, useState } from 'react';
import { RealmService } from '../services/RealmService';
import { Page } from '../models/schema';
import Realm from 'realm';

export const useQuranPage = (pageNumber: number) => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const realm = await RealmService.getRealm();
        const pageObj = realm.objectForPrimaryKey<Page>('Page', pageNumber); // Identifier matches pageNumber?
        // Wait, primaryKey is 'identifier'. Is identifier == number?
        // Let's check Chapter.mock: identifier was not set explicitly but number was.
        // Usually identifier = page number for pages.
        // Let's verify by query.
        
        const result = realm.objects<Page>('Page').filtered('number == $0', pageNumber)[0];
        
        if (result) {
          setPage(result);
        }
      } catch (error) {
        console.error('Error loading page:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageNumber]);

  return { page, loading };
};
