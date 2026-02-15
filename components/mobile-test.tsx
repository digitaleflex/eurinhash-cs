'use client';

import { useState } from 'react';
import { FeedbackPopup } from './feedback-popup';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

export function MobileTest() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Test de responsivité mobile</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowSuccess(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Smartphone className="w-4 h-4" />
          Test Popup Succès
        </button>

        <button
          onClick={() => setShowError(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Tablet className="w-4 h-4" />
          Test Popup Erreur
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">Mobile</span>
          </div>
          <p className="text-sm text-gray-600">
            &lt; 640px - Layout vertical, popup compact
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Tablet className="w-4 h-4 text-green-500" />
            <span className="font-semibold">Tablet</span>
          </div>
          <p className="text-sm text-gray-600">
            640px - 1024px - Layout adaptatif
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-4 h-4 text-purple-500" />
            <span className="font-semibold">Desktop</span>
          </div>
          <p className="text-sm text-gray-600">&gt; 1024px - Layout complet</p>
        </div>
      </div>

      {/* Popups de test */}
      <FeedbackPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        type="success"
      />

      <FeedbackPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        type="error"
        message="Test d'erreur mobile"
      />
    </div>
  );
}
