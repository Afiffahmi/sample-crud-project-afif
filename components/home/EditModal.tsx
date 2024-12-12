import React, { useEffect, useState } from "react";
import { Text, TextInput, Platform } from "react-native";
import  StarRating  from "react-native-star-rating-widget";
import { Heading } from "@/components/ui/heading";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { Review } from "@/types/review";

interface EditReviewModalProps {
  isVisible: boolean;
  selectedReview: Review | null;
  onClose: () => void;
  onEdit: (editedReview: {
    itemName: string;
    description: string;
    stars: number;
  }) => void;
}

export const EditReviewModal: React.FC<EditReviewModalProps> = ({
  isVisible,
  selectedReview,
  onClose,
  onEdit,
}) => {
  const [editItemName, setEditItemName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStars, setEditStars] = useState(0);

  useEffect(() => {
    if (selectedReview) {
      setEditItemName(selectedReview.itemName);
      setEditDescription(selectedReview.description ?? '');
      setEditStars(selectedReview.stars);
    }
  }, [selectedReview, isVisible]);

  const handleSave = () => {
    onEdit({
      itemName: editItemName,
      description: editDescription,
      stars: editStars,
    });
    onClose();
  };

  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading>Edit Review</Heading>
          <ModalCloseButton></ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text className="mb-2">Item Name</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-2 mb-4"
            value={editItemName}
            onChangeText={setEditItemName}
            placeholder="Enter item name"
            {...(Platform.OS === 'android' && { 
              numberOfLines: 1,
              returnKeyType: 'done',
              blurOnSubmit: true 
            })}
          />
          
          <Text className="mb-2">Description</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-2 mb-4 h-20"
            value={editDescription}
            onChangeText={setEditDescription}
            placeholder="Enter description"
            multiline
            {...(Platform.OS === 'android' && { 
              textAlignVertical: 'top' 
            })}
          />
          
          <Text className="mb-2">Rating</Text>
          <StarRating
            rating={editStars}
            onChange={setEditStars}
            enableHalfStar={false}
            maxStars={5}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            className="mr-2"
            onPress={onClose}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={handleSave}>
            <ButtonText>Save</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};