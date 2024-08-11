import React, { useEffect, useState } from "react";
import { AppHeader, CustomerCard } from "../../components";
import "./home.css";
import { ICustomer, IPhotos } from "../../core/models";
import { PhotoService, UserService } from "../../services";
const HomePage = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setCustomer] = useState<ICustomer>();
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [loadingList, setLoadingList] = useState<Boolean>(false);
  const [page, setPage] = useState(1);
  const [loadingPhotos, setLoadingPhotos] = useState<Boolean>(false);
  const [pagePhotos, setPagePhotos] = useState(1);
  const openCustomer = (e: ICustomer) => {
    setCustomer(e);
  };
  const getUsers = async (limit: number = 10) => {
    setLoadingList(true);
    try {
      const res = await UserService.getUsers(page, limit);
      setCustomers([...customers, ...res.data.results]);
      setLoadingList(false);
    } catch (error) {
      alert("Unable to fetch users");
      setLoadingList(false);
    }
  };
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (Math.floor(scrollHeight - scrollTop) === clientHeight) {
      setPage(page + 1);
      getUsers();
    }
  };
  const getPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const res = await PhotoService.getPhotos(pagePhotos, 9);
      setPhotos(res.data.photos);
      setLoadingPhotos(false);
    } catch (error) {
      setPhotos([]);
      alert("Unable to fetch photos");
      setLoadingPhotos(false);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getUsers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let n = pagePhotos;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setPagePhotos(n + 1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      getPhotos();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setPagePhotos(1);
    getPhotos();
  }, [selectedCustomer]);

  return (
    <div className="home-container">
      <AppHeader />
      <div className="layout">
        <div className="sidebar" onScroll={handleScroll}>
          {customers.map((customer, index) => (
            <CustomerCard
              customer={customer}
              key={index}
              onClick={(e) => openCustomer(e)}
              active={
                selectedCustomer?.user.username === customer.user.username
              }
            />
          ))}
          {loadingList && <p className="t1">Loading...</p>}
        </div>
        <div className="main-body">
          {selectedCustomer?.user.username && (
            <div className="customer-details">
              <h2 className="t2">
                {selectedCustomer?.user.name.title}.{" "}
                {selectedCustomer?.user.name.first}{" "}
                {selectedCustomer?.user.name.last}
              </h2>
              <p className="t3 text-center">
                {selectedCustomer?.user.gender} | {selectedCustomer?.user.email}{" "}
                | {selectedCustomer?.user.phone}
              </p>
              <div className="photo-container">
                <div className="photo-grid">
                  {!loadingPhotos &&
                    photos.map((photo, index) => (
                      <div key={index} className="photo-item">
                        <img src={photo.src.small} alt={`${index + 1}`} />
                      </div>
                    ))}
                </div>
              </div>
              {loadingPhotos && <p className="t1">Loading photos...</p>}
              {!loadingPhotos && photos.length === 0 && (
                <p className="t1">Failed to fetch photos</p>
              )}
            </div>
          )}
          {!selectedCustomer?.user.username && (
            <p className="t1">Select a customers</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
