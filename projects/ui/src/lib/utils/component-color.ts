export const TP_COMPONENT_COLORS = [
  'gray',
  'red',
  'pink',
  'amber',
  'orange',
  'yellow',
  'green',
  'emerald',
  'teal',
  'blue',
  'cyan',
  'purple',
  'violet',
  'indigo',
] as const;

export type TpComponentColor = (typeof TP_COMPONENT_COLORS)[number];

export interface TpComponentColorTokens {
  color: string;
  contrast: string;
  container: string;
}

export const TP_COMPONENT_COLOR_MAP: Record<TpComponentColor, TpComponentColorTokens> = {
  gray: {
    color: 'var(--tp-color-gray-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-gray-50)',
  },
  red: {
    color: 'var(--tp-color-red-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-red-50)',
  },
  pink: {
    color: 'var(--tp-color-pink-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-pink-50)',
  },
  amber: {
    color: 'var(--tp-color-amber-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-amber-50)',
  },
  orange: {
    color: 'var(--tp-color-orange-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-orange-50)',
  },
  yellow: {
    color: 'var(--tp-color-yellow-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-yellow-50)',
  },
  green: {
    color: 'var(--tp-color-green-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-green-50)',
  },
  emerald: {
    color: 'var(--tp-color-emerald-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-emerald-50)',
  },
  teal: {
    color: 'var(--tp-color-teal-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-teal-50)',
  },
  blue: {
    color: 'var(--tp-color-blue-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-blue-50)',
  },
  cyan: {
    color: 'var(--tp-color-cyan-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-cyan-50)',
  },
  purple: {
    color: 'var(--tp-color-purple-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-purple-50)',
  },
  violet: {
    color: 'var(--tp-color-violet-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-violet-50)',
  },
  indigo: {
    color: 'var(--tp-color-indigo-500)',
    contrast: 'var(--tp-color-white)',
    container: 'var(--tp-color-indigo-50)',
  },
};
