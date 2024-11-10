import { ReactNode } from 'react';

import { DialogClose } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface SliderDialogProps {
  children: React.ReactNode;
  title?: string;
  open?: boolean;
  onClose?: () => void;
  StatusComponent?: ReactNode;
}

const SliderDialog = ({ children, title, open, onClose, StatusComponent }: SliderDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='absolute right-0 left-auto translate-x-0 h-full p-0 border-none' hideDefaultClose>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: open ? 0 : '100%' }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className='bg-white w-full h-full rounded-lg p-8 flex flex-col gap-4 overflow-hidden'
        >
          <DialogHeader className="flex flex-row justify-between items-end">
            <DialogTitle>{title}</DialogTitle>
            <div className="flex flex-row gap-2">
              {StatusComponent}
              <DialogClose><X /></DialogClose>
            </div>
          </DialogHeader>
          {children}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SliderDialog;
