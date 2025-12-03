'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Mail, Clock, MessageSquare } from 'lucide-react'

interface FeedbackPopupProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error'
  message?: string
}

export function FeedbackPopup({ isOpen, onClose, type, message }: FeedbackPopupProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setProgress(0)
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (type === 'success') {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mx-2 sm:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress bar */}
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-100 ease-out"
                   style={{ width: `${progress}%` }} />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors touch-manipulation"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Content */}
              <div className="p-4 sm:p-6 lg:p-8 text-center">
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 sm:mb-6"
                >
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  Message envoyé !
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed"
                >
                  Votre message a été transmis avec succès. Je vous répondrai dans les plus brefs délais.
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Confirmation par email</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Réponse sous 24h</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Suivi personnalisé</span>
                  </div>
                </motion.div>

                {/* Action button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={onClose}
                  className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base touch-manipulation"
                >
                  Parfait, merci !
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Error popup
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mx-2 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-400 to-red-500 transition-all duration-100 ease-out"
                 style={{ width: `${progress}%` }} />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors touch-manipulation"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>

            {/* Content */}
            <div className="p-4 sm:p-6 lg:p-8 text-center">
              {/* Error icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 sm:mb-6"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                Erreur d'envoi
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed"
              >
                {message || 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'}
              </motion.p>

              {/* Action button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base touch-manipulation"
              >
                Réessayer
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
