import React from 'react';
import { X, CheckCircle, AlertCircle } from 'react-feather';

const AlertNotification = ({ type, message, onClose }) => {
  const isSuccess = type === 'success';
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`${
        isSuccess 
          ? 'bg-green-50 border-green-500' 
          : 'bg-red-50 border-red-500'
      } border-l-4 rounded-lg shadow-lg p-4 min-w-[320px] max-w-md`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            {isSuccess ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <h3 className={`font-bold text-lg ${
                isSuccess ? 'text-green-800' : 'text-red-800'
              }`}>
                {isSuccess ? 'Success' : 'Error'}
              </h3>
              <p className={`text-sm mt-1 ${
                isSuccess ? 'text-green-700' : 'text-red-700'
              }`}>
                {message}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`${
              isSuccess 
                ? 'text-green-600 hover:text-green-800' 
                : 'text-red-600 hover:text-red-800'
            } transition-colors flex-shrink-0`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;