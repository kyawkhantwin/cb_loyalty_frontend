'use client';

import { useMutation } from '@tanstack/react-query';
import { PointAdjustmentService } from '../services/pointAdjustmentService';
import { useMemberStore } from '../store/useMemberStore';
import { PointAdjustmentRequest } from '../types';

export const useAdjustPointsMutation = () => {
  const updateMemberPointsInStore = useMemberStore((state) => state.updateMemberPoints);

  return useMutation({
    mutationFn: PointAdjustmentService.adjustPoints,
    onSuccess: (response, requestData: PointAdjustmentRequest) => {
      updateMemberPointsInStore(requestData.memberId, response.newBalance);
    },
  });
};
