import React, { useEffect } from 'react';
import LandingLayout from '../../Layouts/LandingLayout';
import { Content } from '../../Modules';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInterceptor';
let content = new Content();
const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    content
      .getAuthenticationModule()
      .getUserAuth()
      .then((response: any) => {
        let userAuthResponse = response?.userDetail;
        if (userAuthResponse?.auth_info) {
          axios.get('/proxy/countries').then((response: any) => {
            let countryResponse = response?.data;
            if (countryResponse?.header?.response_code == 200) {
              content
                .getStorageModule()
                .setLocalStorageData('countryList', countryResponse?.body)
                .then((res) => {
                  navigate('dashboard');
                });
            }
          });
        } else {
          navigate('/login');
        }
      });
  }, []);
  return <LandingLayout></LandingLayout>;
};

export default Landing;
