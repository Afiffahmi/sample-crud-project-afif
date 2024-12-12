import React from "react";
import { Text } from "@/components/ui/text";
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

interface DeleteReviewModalProps {
  isVisible: boolean;
  selectedReview: Review | null;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
  isVisible,
  selectedReview,
  onClose,
  onDelete,
}) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading>Delete Review</Heading>
          <ModalCloseButton></ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>
            Are you sure you want to delete this review for{" "}
            {selectedReview?.itemName}?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            onPress={onClose}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={onDelete}>
            <ButtonText>Delete</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};