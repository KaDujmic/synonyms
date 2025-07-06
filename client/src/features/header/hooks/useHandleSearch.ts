import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHandleSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/synonym/${searchTerm.trim()}`);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch
  }
};