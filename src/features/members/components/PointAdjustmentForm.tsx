// 'use client';
//
// import { Button } from '@heroui/button';
// import { Input, Textarea } from '@heroui/input';
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
// import { useState } from 'react';
// import { Calculator } from 'lucide-react';
//
// export const PointAdjustmentForm = ({ memberId, isOpen, onClose }: { memberId: string, isOpen: boolean, onClose: () => void }) => {
//   const [form, setForm] = useState({ amount: 0, reason: '' });
//   const { mutate, isPending } = useAdjustPoints();
//
//   const handleAdjust = () => mutate({ memberId, ...form }, { onSuccess: onClose });
//   const updateAmount = (val: string) => setForm({ ...form, amount: Number(val) });
//   const updateReason = (val: string) => setForm({ ...form, reason: val });
//
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" placement="center">
//       <ModalContent>
//         <ModalHeader className="flex gap-2 items-center"><Calculator size={18}/> Adjust Balance</ModalHeader>
//         <ModalBody className="py-6">
//           <Input type="number" label="Point Adjustment" placeholder="e.g. 500 or -200" variant="bordered" onChange={(e) => updateAmount(e.target.value)} />
//           <Textarea label="Adjustment Reason" placeholder="Describe why points are being adjusted" variant="bordered" onChange={(e) => updateReason(e.target.value)} />
//         </ModalBody>
//         <ModalFooter>
//           <Button variant="light" onPress={onClose}>Cancel</Button>
//           {/*<Button color="primary" isLoading={isPending} onPress={handleAdjust}>Confirm Update</Button>*/}
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };
