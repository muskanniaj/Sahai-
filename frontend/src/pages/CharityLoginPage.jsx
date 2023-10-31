import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CharityLogin from "../components/Charity/CharityLogin";

const CharityLoginPage = () => {
  const navigate = useNavigate();
  const { isDriver,isLoading } = useSelector((state) => state.driver);

  useEffect(() => {
    if(isDriver === true){
      navigate(`/dashboard`);
    }
  }, [isLoading,isDriver])
  return (
    <div>
        <CharityLogin />
    </div>
  )
}

export default CharityLoginPage