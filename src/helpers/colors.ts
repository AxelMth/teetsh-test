// Generated with AI to get all the colors we get from API
// Functions has also been added by AI

/**
 * Color palette with shades from 100 to 900
 */
const Colors: Record<string, string> = {
  // Blue
  'blue-100': '#e3f2fd',
  'blue-200': '#bbdefb',
  'blue-300': '#90caf9',
  'blue-400': '#64b5f6',
  'blue-500': '#007bff',
  'blue-600': '#0056b3',
  'blue-700': '#1976d2',
  'blue-800': '#1565c0',
  'blue-900': '#0d47a1',

  // Green
  'green-100': '#e8f5e9',
  'green-200': '#c8e6c9',
  'green-300': '#a5d6a7',
  'green-400': '#81c784',
  'green-500': '#28a745',
  'green-600': '#218838',
  'green-700': '#388e3c',
  'green-800': '#2e7d32',
  'green-900': '#1b5e20',

  // Red
  'red-100': '#ffebee',
  'red-200': '#ffcdd2',
  'red-300': '#ef9a9a',
  'red-400': '#e57373',
  'red-500': '#dc3545',
  'red-600': '#c82333',
  'red-700': '#d32f2f',
  'red-800': '#c62828',
  'red-900': '#b71c1c',

  // Yellow
  'yellow-100': '#fffde7',
  'yellow-200': '#fff9c4',
  'yellow-300': '#fff59d',
  'yellow-400': '#fff176',
  'yellow-500': '#ffc107',
  'yellow-600': '#e0a800',
  'yellow-700': '#fbc02d',
  'yellow-800': '#f9a825',
  'yellow-900': '#f57f17',

  // Lime
  'lime-100': '#f0fdf4',
  'lime-200': '#dcfce7',
  'lime-300': '#bbf7d0',
  'lime-400': '#86efac',
  'lime-500': '#4ade80',
  'lime-600': '#22c55e',

  // Purple
  'purple-100': '#f3e5f5',
  'purple-200': '#e1bee7',
  'purple-300': '#ce93d8',
  'purple-400': '#ba68c8',
  'purple-500': '#6f42c1',
  'purple-600': '#8e24aa',
  'purple-700': '#7b1fa2',
  'purple-800': '#6a1b9a',
  'purple-900': '#4a148c',

  // Orange
  'orange-100': '#fff3e0',
  'orange-200': '#ffe0b2',
  'orange-300': '#ffcc80',
  'orange-400': '#ffb74d',
  'orange-500': '#fd7e14',
  'orange-600': '#fb8c00',
  'orange-700': '#f57c00',
  'orange-800': '#ef6c00',
  'orange-900': '#e65100',

  // Pink
  'pink-100': '#fce4ec',
  'pink-200': '#f8bbd0',
  'pink-300': '#f48fb1',
  'pink-400': '#f06292',
  'pink-500': '#ec407a',
  'pink-600': '#e91e63',
  'pink-700': '#d81b60',
  'pink-800': '#c2185b',
  'pink-900': '#ad1457',

  // Gray
  'gray-100': '#f5f5f5',
  'gray-200': '#eeeeee',
  'gray-300': '#e0e0e0',
  'gray-400': '#bdbdbd',
  'gray-500': '#6c757d',
  'gray-600': '#757575',
  'gray-700': '#616161',
  'gray-800': '#424242',
  'gray-900': '#212121',

  // Teal
  'teal-100': '#e0f2f1',
  'teal-200': '#b2ebf2',
  'teal-300': '#80deea',
  'teal-400': '#4dd0e1',
  'teal-500': '#26c6da',
  'teal-600': '#00bcd4',
  'teal-700': '#00acc1',
  'teal-800': '#0097a7',
  'teal-900': '#00838f',
} as const;

/**
 * Get the color hexa code from the color name
 * If the color is not found, return the color name
 *
 * @param color - The color in format 'color-shade' (e.g., 'blue-500', 'red-600')
 * @returns The hexadecimal color code or the original color string if not found
 *
 * @example
 * getColor('blue-500') // returns '#007bff'
 * getColor('red-600') // returns '#c82333'
 * getColor('unknown-color') // returns 'unknown-color'
 */
export const getBackgroundColor = (color: string): string => {
  const foundColor = Colors[color];
  if (!foundColor) {
    console.error('color not found', color);
    return color;
  }
  return foundColor;
};

/**
 * Get a darker shade for text color based on the background color
 * Takes a color and returns a darker variant for better contrast
 *
 * @param color - The background color in format 'color-shade' (e.g., 'blue-500', 'red-600')
 * @returns The hexadecimal color code of a darker shade
 *
 * @example
 * getColor('blue-500') // returns darker blue like '#1565c0' (blue-800)
 * getColor('red-300') // returns darker red like '#c62828' (red-800)
 */
export const getColor = (color: string): string => {
  // Parse the color format: 'colorName-shade'
  const parts = color.split('-');
  if (parts.length !== 2) {
    console.error('Invalid color format', color);
    return color;
  }

  const [colorName, shadeStr] = parts;
  const shade = parseInt(shadeStr, 10);

  if (isNaN(shade)) {
    console.error('Invalid shade number', color);
    return color;
  }

  // Calculate a darker shade for text
  // If shade is < 500, use 800 for good contrast
  // If shade is >= 500, use 900 for maximum contrast
  const darkerShade = shade < 500 ? 800 : 900;
  const darkerColorKey = `${colorName}-${darkerShade}`;

  const foundColor = Colors[darkerColorKey];
  if (!foundColor) {
    console.error(
      'Darker color not found',
      darkerColorKey,
      'falling back to original'
    );
    // Fallback to original color if darker shade doesn't exist
    return Colors[color] || color;
  }

  return foundColor;
};
