import { api } from '@/lib/axios';
import { PointAdjustmentRequest, PointAdjustmentResponse } from '../types';

const ADJUSTMENT_ENDPOINT = '/members/points/adjust';

const validateAdjustmentAmount = (amount: number) => 
  amount === 0 ? Promise.reject('Adjustment amount cannot be zero') : Promise.resolve();

const postPointAdjustment = (adjustmentData: PointAdjustmentRequest) => 
  api.post<PointAdjustmentResponse>(ADJUSTMENT_ENDPOINT, adjustmentData)
    .then((response: { data: PointAdjustmentResponse }) => response.data);

export const PointAdjustmentService = {
  adjustPoints: (adjustmentData: PointAdjustmentRequest) => 
    validateAdjustmentAmount(adjustmentData.amount).then(() => postPointAdjustment(adjustmentData))
};
