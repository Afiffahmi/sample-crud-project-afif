import { useState } from 'react';

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openModal = (item?: any) => {
    if (item) {
      setSelectedItem(item);
    }
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setSelectedItem(null);
  };

  return {
    isVisible,
    selectedItem,
    openModal,
    closeModal,
  };
};