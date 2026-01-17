import { useEffect, useState } from "react";
import { RealmService } from "../services/RealmService";
import { Page } from "../models/schema";

export const useQuranPage = (pageNumber: number) => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const realm = await RealmService.getRealm();
        const result = realm
          .objects<Page>("Page")
          .filtered("number == $0", pageNumber)[0];

        if (result) {
          setPage(result);
        } else {
          setPage(null);
        }
      } catch (error) {
        console.error("Error loading page:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageNumber]);

  return { page, loading };
};
