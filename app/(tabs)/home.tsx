import React, { useEffect, useState, useCallback } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { HStack } from "@/components/ui/hstack";
import { useReviewStore } from "@/stores/reviewStore";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, View, TouchableOpacity } from "react-native";
import { Review } from "@/types/review";

import { Icon } from "@/components/ui/icon";
import { EditIcon } from "@/components/ui/icon";
import { TrashIcon } from "@/components/ui/icon";

import { useModal } from "@/hooks/useModal";
import { DeleteReviewModal } from "@/components/home/DeleteModal";
import { EditReviewModal } from "@/components/home/EditModal";

export default function HomeScreen() {
  const { reviews, fetchReviews, isLoading, deleteReview, updateReview } = useReviewStore();
  const [refreshing, setRefreshing] = useState(false);

  // Use custom hooks for modals
  const deleteModal = useModal();
  const editModal = useModal();

  useEffect(() => {
    fetchReviews();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchReviews();
    setRefreshing(false);
  }, [fetchReviews]);

  const handleDeleteReview = async () => {
    if (deleteModal.selectedItem) {
      await deleteReview(deleteModal.selectedItem.id);
      deleteModal.closeModal();
    }
  };

  const handleEditReview = async (editedReview: {
    itemName: string;
    description: string;
    stars: number;
  }) => {
    if (editModal.selectedItem) {
      await updateReview(editModal.selectedItem.id, editedReview);
      editModal.closeModal();
    }
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View className="px-4 py-2">
      <Card className="w-full h-40 p-4 border-slate-400 border rounded-lg">
        <HStack className="justify-between items-center">
          <Heading className="">{item.itemName}</Heading>
          <StarRatingDisplay rating={item.stars} starSize={14} maxStars={5} />
        </HStack>
        <Text className="mt-2">{item.description}</Text>
        <HStack className="justify-between items-end mt-2 ">
          <Text className="text-xs text-gray-500">
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <HStack className="gap-2 ">
            <TouchableOpacity
              onPress={() => editModal.openModal(item)}
            >
              <Icon as={EditIcon} size="md" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteModal.openModal(item)}
            >
            <Icon as={TrashIcon} size="md" color="red"/>
            </TouchableOpacity>
          </HStack>
        </HStack>
      </Card>
    </View>
  );

  return (
    <Box className="flex-1 bg-white">
      <Text className="text-xl font-bold mb-4 px-4 pt-5">My Reviews</Text>

      {reviews.length === 0 && !isLoading ? (
        <Box className="justify-center items-center flex-1">
          <Text className="text-gray-500">No reviews yet</Text>
        </Box>
      ) : (
        <FlashList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={150}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteReviewModal
        isVisible={deleteModal.isVisible}
        selectedReview={deleteModal.selectedItem}
        onClose={deleteModal.closeModal}
        onDelete={handleDeleteReview}
      />

      {/* Edit Modal */}
      <EditReviewModal
        isVisible={editModal.isVisible}
        selectedReview={editModal.selectedItem}
        onClose={editModal.closeModal}
        onEdit={handleEditReview}
      />
    </Box>
  );
}