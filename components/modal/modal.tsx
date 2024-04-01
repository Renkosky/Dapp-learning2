import React, { ReactNode } from 'react';
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode
}
function Modal({ visible, onClose, children }: ModalProps) {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${visible ? 'transition-opacity duration-300 opacity-100' : 'transition-opacity duration-300 opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50" onClick={onClose} />
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-md z-10 w-11/12 sm:w-2/5 lg:w-1/4">
        {children}
        <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mt-4 self-end">Close</button>
      </div>
    </div>
  );
}

export default Modal;