import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listBanners } from "../api/queries";

const BannerContext = React.createContext();

const BannerProvider = ({ children }) => {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      setLoading(true);
      // Switch authMode to API_KEY for public access
      const { data } = await API.graphql({
        query: listBanners,
        authMode: "API_KEY"
      });
      const banner = data.listBanners.items;
      setBanner(banner);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BannerContext.Provider value={{ banner, loading }}>
      {children}
    </BannerContext.Provider>
  );
};

export { BannerContext, BannerProvider };
