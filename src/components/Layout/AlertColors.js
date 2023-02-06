import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/vue/20/solid'

export const icons = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
  error: XCircleIcon,
}

export const colors = {
  success: [
    'bg-green-50',
    'border-green-400',
    'text-green-400',
    'text-green-800',
    'text-green-500',
    'hover:bg-green-100',
    'focus:ring-green-600',
    'focus:ring-offset-green-50',
  ],
  warning: [
    'bg-orange-50',
    'border-orange-400',
    'text-orange-400',
    'text-orange-800',
    'text-orange-500',
    'hover:bg-orange-100',
    'focus:ring-orange-600',
    'focus:offset-orange-50',
  ],
  info: [
    'bg-blue-50',
    'border-blue-400',
    'text-blue-400',
    'text-blue-800',
    'text-blue-500',
    'hover:bg-blue-100',
    'focus:ring-blue-600',
    'focus:offset-blue-50',
  ],
  error: [
    'bg-red-50',
    'border-red-400',
    'text-red-400',
    'text-red-800',
    'text-red-500',
    'hover:bg-red-100',
    'focus:ring-red-600',
    'focus:offset-red-50',
  ],
}
