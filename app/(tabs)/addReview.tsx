import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import StarRating from "react-native-star-rating-widget";
import { InputField } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectBackdrop
} from "@/components/ui/select";
import { useReviewStore } from "@/stores/reviewStore";
import { useNavigation } from "@react-navigation/native";
import {z} from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema
const reviewSchema = z.object({
  itemName: z.string().min(2, { message: "Item name must be at least 2 characters" }),
  description: z.string(),
  stars: z.number().min(1, { message: "Rating is required" }).max(5),
  type: z.string().min(1, { message: "Type is required" })
});

export default function AddReviewScreen() {
  const { addReview } = useReviewStore();
  const navigation = useNavigation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      itemName: "",
      description: "",
      stars: 0,
      type: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    try {
      await addReview({
        itemName: data.itemName,
        stars: data.stars,
        description: data.description,
        type: data.type,
      });
      reset()
      // Navigate back or show success message
      navigation.goBack();
    } catch (error) {
      console.error("Failed to add review", error);
      // Optionally show error to user
    }
  };

  const reviewTypes = [
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Food", value: "food" },
    { label: "Services", value: "services" },
    { label: "Other", value: "other" },
  ];

  return (
    <ScrollView className="flex-1 bg-white" keyboardShouldPersistTaps="handled">
      <Box className="p-4">
        <Heading className="text-2xl mb-6 text-center">Add New Review</Heading>

        {/* Item Name Input */}
        <Box className="mb-4">
          <Text className="mb-2">Item Name</Text>
          <Controller
            control={control}
            name="itemName"
            render={({ field: { onChange, value } }) => (
              <Input>
                <InputField
                  placeholder="Enter item name"
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
            )}
          />
          {errors.itemName && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.itemName.message}
            </Text>
          )}
        </Box>

        {/* Review Type Select */}
        <Box className="mb-4">
          <Text className="mb-2">Review Type</Text>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange}>
                <SelectTrigger>
                  <SelectInput placeholder="Select review type" />
                </SelectTrigger>
                <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                <SelectDragIndicatorWrapper>
        <SelectDragIndicator />
      </SelectDragIndicatorWrapper>
                  {reviewTypes.map((type) => (
                    <SelectItem
                      key={type.value}
                      label={type.label}
                      value={type.value}
                    />
                  ))}
                </SelectContent>
                </SelectPortal>
              </Select>
            )}
          />
          {errors.type && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.type.message}
            </Text>
          )}
        </Box>

        {/* Star Rating */}
        <Box className="mb-4 justify-center items-center">
          <Text className="mb-2">Rating</Text>
          <Controller
            control={control}
            name="stars"
            render={({ field: { onChange, value } }) => (
              <StarRating
                rating={value}
                onChange={onChange}
                maxStars={5}
                starSize={40}
              />
            )}
          />
          {errors.stars && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.stars.message}
            </Text>
          )}
        </Box>

        {/* Description Input */}
        <Box className="mb-6">
          <Text className="mb-2">Description (Optional)</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input>
                <InputField
                  placeholder="Write your review"
                  multiline
                  numberOfLines={4}
                
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
            )}
          />
        </Box>

        {/* Submit Button */}
        <Button onPress={handleSubmit(onSubmit)}>
          <Text className="text-white">Submit Review</Text>
        </Button>
      </Box>
    </ScrollView>
  );
}
