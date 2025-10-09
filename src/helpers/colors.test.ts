import { getColor, getBackgroundColor } from './colors';

describe('getColor', () => {
  test('should return darker shade (900) for colors >= 500', () => {
    expect(getColor('blue-500')).toBe('#0d47a1'); // blue-900
    expect(getColor('red-500')).toBe('#b71c1c'); // red-900
    expect(getColor('green-600')).toBe('#1b5e20'); // green-900
  });

  test('should return shade 800 for colors < 500', () => {
    expect(getColor('blue-400')).toBe('#1565c0'); // blue-800
    expect(getColor('red-300')).toBe('#c62828'); // red-800
    expect(getColor('purple-200')).toBe('#6a1b9a'); // purple-800
  });

  test('should handle edge case shades', () => {
    expect(getColor('gray-100')).toBe('#424242'); // gray-800
    expect(getColor('orange-900')).toBe('#e65100'); // orange-900
  });

  test('should return original color if darker shade not found', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    getColor('custom-500');
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  test('should handle invalid color format', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const result = getColor('invalidcolor');
    expect(result).toBe('invalidcolor');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid color format',
      'invalidcolor'
    );
    consoleErrorSpy.mockRestore();
  });

  test('should handle invalid shade number', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const result = getColor('blue-abc');
    expect(result).toBe('blue-abc');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid shade number',
      'blue-abc'
    );
    consoleErrorSpy.mockRestore();
  });
});

describe('getBackgroundColor', () => {
  test('should return correct hex code for valid colors', () => {
    expect(getBackgroundColor('blue-500')).toBe('#007bff');
    expect(getBackgroundColor('green-500')).toBe('#28a745');
    expect(getBackgroundColor('red-500')).toBe('#dc3545');
    expect(getBackgroundColor('yellow-500')).toBe('#ffc107');
  });

  test('should return hex codes for all shades', () => {
    expect(getBackgroundColor('blue-100')).toBe('#e3f2fd');
    expect(getBackgroundColor('blue-900')).toBe('#0d47a1');
    expect(getBackgroundColor('purple-300')).toBe('#ce93d8');
    expect(getBackgroundColor('teal-600')).toBe('#00bcd4');
  });

  test('should handle all color families', () => {
    expect(getBackgroundColor('lime-500')).toBe('#4ade80');
    expect(getBackgroundColor('pink-500')).toBe('#ec407a');
    expect(getBackgroundColor('orange-500')).toBe('#fd7e14');
    expect(getBackgroundColor('gray-500')).toBe('#6c757d');
  });

  test('should return original color and log error if not found', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const result = getBackgroundColor('unknown-color');
    expect(result).toBe('unknown-color');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'color not found',
      'unknown-color'
    );
    consoleErrorSpy.mockRestore();
  });
});